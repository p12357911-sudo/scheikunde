/* Kleine hulpfunctie voor de meerkeuzepagina's (MP): zet bij elk antwoord ook tekst "Goed" of "Niet goed",
   zodat de uitkomst niet alleen aan kleur te zien is. */
function markeer(container, goed) {
  var oud = container.querySelector('.uitslag');
  if (oud) { oud.parentNode.removeChild(oud); }
  var el = document.createElement('div');
  el.className = 'uitslag ' + (goed ? 'uitslag-goed' : 'uitslag-fout');
  el.textContent = goed ? '\u2713 Goed' : '\u2717 Niet goed';
  container.appendChild(el);
}

/* Toegankelijkheid voor de vraag-antwoordpagina's (KB): vertel hulpsoftware of een antwoord open of dicht is. */
document.addEventListener('DOMContentLoaded', function () {
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

/* Menuknop voor kleine schermen (stond eerst alleen in index.html, daardoor werkte het menu op de andere pagina's niet) */
if (typeof openNav === 'undefined') {
  function openNav() {
    var x = document.getElementById("navDemo");
    if (!x) { return; }
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
}

/* Zwevende knop "Controleer nu" voor de meerkeuzepagina's (MP).
   Werkt op elke pagina met een quiz (#quiz) en een controleknop (#submit): de zwevende knop klikt gewoon
   op de bestaande knop, dus het nakijken blijft precies hetzelfde. De pagina blijft daarbij op dezelfde plek staan.
   Zodra de gewone knop zelf in beeld is, verdwijnt de zwevende knop (zodat er geen twee naast elkaar staan). */
document.addEventListener('DOMContentLoaded', function () {
  var origineel = document.getElementById('submit');
  var uitslag = document.getElementById('results');
  if (!origineel || !uitslag || !document.getElementById('quiz')) { return; }

  /* Na het controleren blijft de pagina op dezelfde plek staan (wens Peter, 29 okt 2026). */

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
