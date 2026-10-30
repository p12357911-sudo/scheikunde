/* ==========================================================================
   123 school - AI-nakijken van getypte antwoorden (los onderdeel)
   Gebruik: zet op een KB-pagina (na school.js mag, ervoor ook) deze ene regel:
       <script src="ai-nakijken.js" defer></script>
   Dan krijgt elke KB-vraag op die pagina een knop "Laat AI nakijken". Niets anders is nodig:
   het script voegt zijn eigen stijl toe en leest alleen de bestaande vraagknoppen, invoervelden en antwoordvakken.
   Het adres van de nakijk-Worker staat hieronder in WORKER_URL. Een pagina kan het overschrijven met
       <script src="ai-nakijken.js" data-url="https://..." defer></script>
   Is het adres leeg of nog een plaatshouder (JOUW-SUBDOMEIN), dan doet dit script niets.
   Er gaat alleen {question, modelAnswer, studentAnswer, attempt} naar de Worker (geen namen).
   Krijgt de leerling "goed", "half" of "fout" met een korte tip, dan mag hij het een tweede keer proberen;
   na de tweede poging (of bij "goed") klapt het juiste antwoord vanzelf open.
   Lukt het nakijken niet (Worker niet bereikbaar, limiet bereikt), dan staat het juiste antwoord er gewoon.
   Optionele elementen op de pagina: #ai-melding ("in ontwikkeling", wordt weggehaald), #ai-intro (verborgen uitleg,
   wordt getoond), #ai-vergelijk (oude uitleg, wordt weggehaald). Ontbreken ze, dan zet het script zelf een korte uitleg boven de vragen.
   ========================================================================== */
(function () {
  'use strict';

  var WORKER_URL = 'https://school-nakijken.scheikunde-oefenen.workers.dev/';

  var script = document.currentScript || document.querySelector('script[src*="ai-nakijken"]');
  var AI_URL = (script && script.getAttribute('data-url')) || WORKER_URL;
  if (typeof AI_URL !== 'string' || !/^https?:\/\//.test(AI_URL) || AI_URL.indexOf('JOUW-') !== -1) { return; }

  var CSS =
    '.ai-regel { margin: 8px 0 4px 0; }' +
    '.ai-knop[disabled] { opacity: 0.7; cursor: wait; }' +
    '.ai-uitslag { margin: 6px 0 8px 0; padding: 10px 16px; border-left: 5px solid #003A5C; background-color: #EAF2F8; color: #111111; border-radius: 0 4px 4px 0; }' +
    '.ai-uitslag p { margin: 4px 0 0 0; }' +
    '.ai-uitslag[hidden] { display: none; }' +
    '.ai-goed { background-color: #E6F4EA; border-left-color: #14532d; }' +
    '.ai-half { background-color: #FFF4CE; border-left-color: #B26A00; }' +
    '.ai-fout { background-color: #F7ECEC; border-left-color: #7f1d1d; }' +
    '.ai-info { background-color: #EAF2F8; border-left-color: #003A5C; }' +
    '@media (max-width: 600px) { .ai-knop { display: block; width: 100%; } }';

  function klaar(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  klaar(function () {
    var vraagKnoppen = document.querySelectorAll('button.vraag-knop');
    if (!vraagKnoppen.length) { return; }

    var stijl = document.createElement('style');
    stijl.id = 'ai-nakijken-stijl';
    stijl.appendChild(document.createTextNode(CSS));
    document.head.appendChild(stijl);

    /* Pagina is actief: de melding "in ontwikkeling" maakt plaats voor de uitleg */
    var meldingBox = document.getElementById('ai-melding');
    if (meldingBox) { meldingBox.parentNode.removeChild(meldingBox); }
    var intro = document.getElementById('ai-intro');
    if (intro) {
      intro.hidden = false;
    } else {
      intro = document.createElement('p');
      intro.id = 'ai-intro';
      intro.textContent = 'Typ je antwoord en klik op "Laat AI nakijken". Je krijgt een tip en mag het daarna nog een keer proberen. Klik op de blauwe vraag om het juiste antwoord te zien. Typ nooit je naam of andere persoonlijke gegevens: je antwoord wordt door Google Gemini nagekeken.';
      var eerste = vraagKnoppen[0].parentNode;
      eerste.parentNode.insertBefore(intro, eerste);
    }
    var vergelijk = document.getElementById('ai-vergelijk');
    if (vergelijk) { vergelijk.parentNode.removeChild(vergelijk); }

    var TITELS = { goed: '\u2713 Goed', half: '\u25CB Bijna goed', fout: '\u2717 Nog niet goed' };

    function toonAntwoord(blok) {
      var knop = blok.querySelector('button.vraag-knop');
      var doel = blok.querySelector('.antwoord-box');
      if (knop && doel && doel.className.indexOf('w3-show') === -1) { knop.click(); }
    }

    vraagKnoppen.forEach(function (vraagKnop) {
      var blok = vraagKnop.parentNode;
      var invoer = blok.querySelector('input[type=text]');
      var antwoordBox = blok.querySelector('.antwoord-box');
      if (!invoer || !antwoordBox) { return; }

      var rij = document.createElement('div');
      rij.className = 'ai-regel';
      var knop = document.createElement('button');
      knop.type = 'button';
      knop.className = 'w3-button knop-blauw w3-round ai-knop';
      knop.textContent = 'Laat AI nakijken';
      rij.appendChild(knop);
      var uitslag = document.createElement('div');
      uitslag.className = 'ai-uitslag';
      uitslag.setAttribute('role', 'status');
      uitslag.setAttribute('aria-live', 'polite');
      uitslag.hidden = true;
      invoer.parentNode.insertBefore(rij, antwoordBox);
      invoer.parentNode.insertBefore(uitslag, antwoordBox);

      var pogingen = 0;
      var bezig = false;

      function melding(tekst, klasse) {
        uitslag.className = 'ai-uitslag ' + (klasse || '');
        uitslag.textContent = '';
        var p = document.createElement('p');
        p.textContent = tekst;
        uitslag.appendChild(p);
        uitslag.hidden = false;
      }

      function uitkomstTonen(u) {
        uitslag.className = 'ai-uitslag ai-' + u.verdict;
        uitslag.textContent = '';
        var kop = document.createElement('strong');
        kop.textContent = TITELS[u.verdict];
        uitslag.appendChild(kop);
        if (u.tip) {
          var tip = document.createElement('p');
          tip.textContent = u.tip;
          uitslag.appendChild(tip);
        }
        uitslag.hidden = false;
      }

      function nakijken() {
        if (bezig) { return; }
        var antwoord = invoer.value.trim();
        if (!antwoord) { melding('Typ eerst je antwoord. Dan kan de AI het nakijken.', 'ai-info'); return; }
        bezig = true;
        knop.disabled = true;
        knop.textContent = 'Bezig met nakijken...';
        melding('Even geduld, je antwoord wordt nagekeken.', 'ai-info');

        var poging = Math.min(pogingen + 1, 2);
        var stop = typeof AbortController === 'function' ? new AbortController() : null;
        var timer = setTimeout(function () { if (stop) { stop.abort(); } }, 22000);

        fetch(AI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: vraagKnop.textContent.trim(),
            modelAnswer: antwoordBox.textContent.replace(/\s+/g, ' ').trim(),
            studentAnswer: antwoord,
            attempt: poging
          }),
          signal: stop ? stop.signal : undefined
        }).then(function (r) {
          if (!r.ok) { throw new Error('status ' + r.status); }
          return r.json();
        }).then(function (u) {
          if (!u || ['goed', 'half', 'fout'].indexOf(u.verdict) === -1) { throw new Error('antwoord onbekend'); }
          u.tip = typeof u.tip === 'string' ? u.tip.slice(0, 240) : '';
          pogingen++;
          uitkomstTonen(u);
          if (u.verdict === 'goed' || pogingen >= 2) {
            toonAntwoord(blok);
          } else {
            var extra = document.createElement('p');
            extra.textContent = 'Pas je antwoord aan en laat het opnieuw nakijken.';
            uitslag.appendChild(extra);
          }
        }).catch(function () {
          /* Terugvallen op het oude gedrag: het juiste antwoord tonen, zodat de leerling zelf kan vergelijken */
          melding('Nakijken met AI lukt nu niet. Vergelijk je antwoord zelf met het juiste antwoord hieronder.', 'ai-info');
          toonAntwoord(blok);
        }).then(function () {
          clearTimeout(timer);
          bezig = false;
          knop.disabled = false;
          knop.textContent = pogingen > 0 ? 'Opnieuw nakijken' : 'Laat AI nakijken';
        });
      }

      knop.addEventListener('click', nakijken);
      invoer.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); nakijken(); }
      });
    });
  });
})();
