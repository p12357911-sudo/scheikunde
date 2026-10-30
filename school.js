/* ==========================================================================
   123 school - gedeeld script voor alle pagina's (v2)
   Bevat: antwoord openklappen (KB), optioneel AI-nakijken van getypte antwoorden (alleen met data-ai), menuknop, toegankelijkheid, meerkeuze-quiz (MP) met
   willekeurige volgorde en pagina's van 15 vragen, zwevende knop "Controleer nu", en
   de scripts van de beginpagina. Alleen frontend, geen server nodig.
   Derde-partijbibliotheken (w3.js, w3data.js, jQuery, Bootstrap) staan nog steeds in de HTML.
   ========================================================================== */

var VRAGEN_PER_PAGINA = 15;

/* Voer een functie uit zodra de pagina geladen is (ook als dat al gebeurd is). */
function klaar(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

/* Schud een lijst willekeurig (Fisher-Yates). Geeft een nieuwe lijst terug. */
function schud(lijst) {
  var a = lijst.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* ---------- Navigatie en antwoorden openklappen ---------- */

/* Antwoord openen of sluiten (KB-pagina's en spelletjesknoppen op de beginpagina).
   Met een tweede argument (this) moet je eerst iets typen voordat het antwoord opengaat (Sorteren-pagina). */
function myFunction(id, knop) {
  var x = document.getElementById(id);
  if (!x) { return; }
  if (knop) {
    var input = knop.nextElementSibling;
    if (input && input.value.length < 1) {
      /* Geen pop-up (alert): een rustige melding naast het invoerveld */
      var melding = input.parentNode.querySelector('.inline-melding');
      if (!melding) {
        melding = document.createElement('p');
        melding.className = 'inline-melding';
        melding.setAttribute('role', 'alert');
        input.parentNode.insertBefore(melding, input.nextSibling);
      }
      melding.textContent = 'Typ eerst je antwoord. Dan kun je het juiste antwoord bekijken.';
      return;
    }
  }
  var voor = x.previousElementSibling;
  if (x.className.indexOf('w3-show') == -1) {
    x.className += ' w3-show';
    if (voor) { voor.className = voor.className.replace('w3-black', 'spel-open'); }
  } else {
    x.className = x.className.replace(' w3-show', '');
    if (voor) { voor.className = voor.className.replace('spel-open', 'w3-black'); }
  }
}

/* Menuknop voor kleine schermen */
function openNav(sluit) {
  var x = document.getElementById('navDemo');
  if (!x) { return; }
  var open = x.className.indexOf('w3-show') != -1;
  if (open) {
    x.className = x.className.replace(' w3-show', '');
  } else if (sluit !== true) {
    x.className += ' w3-show';
    open = false;
  }
  var knop = document.querySelector('[aria-controls="navDemo"]');
  if (knop) { knop.setAttribute('aria-expanded', x.className.indexOf('w3-show') != -1 ? 'true' : 'false'); }
}
/* Het menu sluit zelf als je een onderdeel kiest of op Escape drukt (anders blijft het over de pagina hangen) */
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('#navDemo a') : null;
  if (a) { openNav(true); }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { openNav(true); }
});

/* Zijmenu (beginpagina) */
function w3_open() {
  var x = document.getElementById('mySidebar');
  if (!x) { return; }
  x.style.width = '300px';
  x.style.paddingTop = '10%';
  x.style.display = 'block';
}
function w3_close() {
  var x = document.getElementById('mySidebar');
  if (x) { x.style.display = 'none'; }
}

/* Zet bij elk antwoord ook tekst "Goed" of "Niet goed", zodat de uitkomst niet alleen aan kleur te zien is. */
function markeer(container, goed) {
  var oud = container.querySelector('.uitslag');
  if (oud) { oud.parentNode.removeChild(oud); }
  var el = document.createElement('div');
  el.className = 'uitslag ' + (goed ? 'uitslag-goed' : 'uitslag-fout');
  el.textContent = goed ? '\u2713 Goed' : '\u2717 Niet goed';
  container.appendChild(el);
}

/* Externe pagina's laden (menu) met w3data.js */
if (typeof w3IncludeHTML === 'function') { w3IncludeHTML(); }

/* ---------- Toegankelijkheid voor de vraag-antwoordpagina's (KB) ---------- */
klaar(function () {
  var knoppen = document.querySelectorAll('button[onclick^="myFunction"]');
  knoppen.forEach(function (knop) {
    var m = knop.getAttribute('onclick').match(/myFunction\(["']([^"']+)["']/);
    if (!m) { return; }
    knop.setAttribute('aria-controls', m[1]);
    knop.setAttribute('aria-expanded', 'false');
    knop.addEventListener('click', function () {
      var doel = document.getElementById(m[1]);
      var open = doel && doel.className.indexOf('w3-show') !== -1;
      knop.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
});

/* ---------- Pagina's van 15 vragen met knop "Meer vragen (nog X)" ----------
   blokken: lijst met elementen (een per vraag), allemaal in dezelfde ouder; de knop komt in ouder vlak voor anker (of aan het eind).
   Alles na de eerste 15 wordt verborgen (hidden). Geeft een functie terug die het aantal getoonde vragen levert. */
function maakPaginering(blokken, ouder, anker, focusDoel) {
  var totaal = blokken.length;
  var getoond = Math.min(VRAGEN_PER_PAGINA, totaal);
  for (var i = getoond; i < totaal; i++) { blokken[i].hidden = true; }
  var info = { getoond: function () { return getoond; }, totaal: totaal };
  if (totaal <= VRAGEN_PER_PAGINA) { return info; }

  var wrap = document.createElement('div');
  wrap.className = 'meer-vragen w3-center';
  var knop = document.createElement('button');
  knop.type = 'button';
  knop.className = 'w3-button knop-blauw';
  wrap.appendChild(knop);
  ouder.insertBefore(wrap, anker);

  function label() { knop.textContent = 'Meer vragen (nog ' + (totaal - getoond) + ')'; }
  label();
  knop.addEventListener('click', function () {
    var eerste = getoond;
    getoond = Math.min(getoond + VRAGEN_PER_PAGINA, totaal);
    for (var i = eerste; i < getoond; i++) { blokken[i].hidden = false; }
    var doel = focusDoel(blokken[eerste]);
    if (getoond >= totaal) { wrap.parentNode.removeChild(wrap); } else { label(); }
    /* Focus naar de eerste nieuwe vraag, zonder dat de pagina verspringt */
    if (doel && doel.focus) { doel.focus({ preventScroll: true }); }
  });
  return info;
}

/* ---------- KB-pagina's: vragen in willekeurige volgorde, eerst 15 tonen ---------- */
klaar(function () {
  var knoppen = document.querySelectorAll('button.vraag-knop');
  if (!knoppen.length) { return; }
  var ouder = knoppen[0].parentNode.parentNode;
  var blokken = [];
  knoppen.forEach(function (k) {
    if (k.parentNode.parentNode === ouder) { blokken.push(k.parentNode); }
  });
  if (blokken.length < 2) { return; }

  /* Browsers onthouden getypte antwoorden op positie; na het husselen zou dat verkeerd gaan. */
  document.querySelectorAll('input[type=text]').forEach(function (inp) { inp.setAttribute('autocomplete', 'off'); });

  var anker = blokken[blokken.length - 1].nextSibling;
  var gehusseld = schud(blokken);
  gehusseld.forEach(function (b) { ouder.removeChild(b); });
  gehusseld.forEach(function (b) { ouder.insertBefore(b, anker); });
  maakPaginering(gehusseld, ouder, anker, function (blok) { return blok.querySelector('button.vraag-knop'); });
});

/* ---------- AI-nakijken van getypte antwoorden (KB-pagina's met data-ai op de body) ----------
   Opt-in: alleen als <body data-ai> en de pagina een echte AI_URL instelt (var AI_URL = 'https://...').
   Is AI_URL leeg of nog een plaatshouder (JOUW-SUBDOMEIN), dan doet dit niets en werkt de pagina als gewone KB-pagina.
   Per vraag komt er een knop "Laat AI nakijken". De pagina stuurt alleen {question, modelAnswer, studentAnswer, attempt}
   naar de Worker (geen namen). Krijgt de leerling "goed", "half" of "fout" met een korte tip, dan mag hij het een tweede keer proberen;
   na de tweede poging (of bij "goed") klapt het juiste antwoord vanzelf open. Lukt het nakijken niet, dan staat het juiste antwoord er gewoon. */
klaar(function () {
  if (!document.body.hasAttribute('data-ai')) { return; }
  if (typeof AI_URL !== 'string' || !/^https?:\/\//.test(AI_URL) || AI_URL.indexOf('JOUW-') !== -1) { return; }

  /* Pagina is actief: de melding "in ontwikkeling" maakt plaats voor de uitleg */
  var melding = document.getElementById('ai-melding');
  if (melding) { melding.parentNode.removeChild(melding); }
  var intro = document.getElementById('ai-intro');
  if (intro) { intro.hidden = false; }
  var vergelijk = document.getElementById('ai-vergelijk');
  if (vergelijk) { vergelijk.parentNode.removeChild(vergelijk); }

  var TITELS = { goed: '\u2713 Goed', half: '\u25CB Bijna goed', fout: '\u2717 Nog niet goed' };

  function toonAntwoord(blok) {
    var knop = blok.querySelector('button.vraag-knop');
    var doel = blok.querySelector('.antwoord-box');
    if (knop && doel && doel.className.indexOf('w3-show') === -1) { knop.click(); }
  }

  document.querySelectorAll('button.vraag-knop').forEach(function (vraagKnop) {
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

/* ---------- Meerkeuzepagina's (MP): willekeurige volgorde, pagina's van 15, nakijken ----------
   De pagina levert alleen de vragen: var myQuestions = [{question, answers:{a:..,b:..}, correctAnswer:'a', fixed:true?}].
   fixed:true = de volgorde van de antwoorden blijft zoals in de lijst (bijv. kleuren). */
klaar(function () {
  var quiz = document.getElementById('quiz');
  var uitslag = document.getElementById('results');
  var knopNakijken = document.getElementById('submit');
  if (!quiz || !uitslag || !knopNakijken || typeof myQuestions === 'undefined') { return; }

  var letters = 'abcdefgh';
  var vragen = schud(myQuestions.map(function (q, i) { return { q: q, nr: i }; })).map(function (v) {
    var sleutels = Object.keys(v.q.answers);
    var opties = sleutels.map(function (s) { return { tekst: v.q.answers[s], goed: s === v.q.correctAnswer }; });
    if (!v.q.fixed) { opties = schud(opties); }
    return { q: v.q, nr: v.nr, opties: opties };
  });

  var html = vragen.map(function (v) {
    var antw = v.opties.map(function (o, k) {
      return '<label><input type="radio" name="question' + v.nr + '" value="' + letters[k] + '">' + letters[k] + ': ' + o.tekst + '</label>';
    }).join('');
    return '<div class="vraag-blok"><div class="question" tabindex="-1">' + v.q.question + '</div><div class="answers">' + antw + '</div></div>';
  });
  quiz.innerHTML = html.join('');
  var blokken = Array.prototype.slice.call(quiz.querySelectorAll('.vraag-blok'));

  var pag = maakPaginering(blokken, knopNakijken.parentNode, knopNakijken, function (blok) { return blok.querySelector('.question'); });

  knopNakijken.onclick = function () {
    var aantal = pag.getoond();
    var goed = 0;
    for (var i = 0; i < aantal; i++) {
      var antwoorden = blokken[i].querySelector('.answers');
      var gekozen = antwoorden.querySelector('input:checked');
      var juist = gekozen && vragen[i].opties[letters.indexOf(gekozen.value)].goed;
      if (juist) {
        goed++;
        antwoorden.style.color = '#14532d';
      } else {
        antwoorden.style.color = '#7f1d1d';
      }
      markeer(antwoorden, !!juist);
    }
    uitslag.innerHTML = goed + ' van de ' + aantal + ' goed';
  };
});

/* ---------- Zwevende knop "Controleer nu" voor de meerkeuzepagina's (MP) ----------
   Klikt op de gewone knop, dus het nakijken blijft precies hetzelfde en de pagina blijft op dezelfde plek staan.
   Zodra de gewone knop zelf in beeld is, verdwijnt de zwevende knop. */
klaar(function () {
  var origineel = document.getElementById('submit');
  var uitslag = document.getElementById('results');
  if (!origineel || !uitslag || !document.getElementById('quiz')) { return; }

  var zweef = document.createElement('button');
  zweef.type = 'button';
  zweef.id = 'zweefknop';
  zweef.className = 'zweefknop';
  zweef.textContent = 'Controleer nu';
  zweef.setAttribute('aria-label', 'Controleer nu: kijk je antwoorden na en toon je score');
  zweef.addEventListener('click', function () { origineel.click(); });
  document.body.appendChild(zweef);
  document.body.classList.add('heeft-zweefknop');

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (items) {
      zweef.hidden = items[0].isIntersecting;
    }).observe(origineel);
  }
});

/* ---------- Beginpagina (index.html, met jQuery) ---------- */
if (window.jQuery) {
  jQuery(function ($) {
    /* Soepel scrollen naar een onderdeel via het menu en de knop "Naar Top" */
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({ scrollTop: $(hash).offset().top }, 900, function () {
          window.location.hash = hash;
        });
      }
    });
    /* Blokjes verschijnen tijdens het scrollen (klasse .slide) */
    $(window).scroll(function () {
      $(".slideanim").each(function () {
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) { $(this).addClass("slide"); }
      });
    });
  });
}
