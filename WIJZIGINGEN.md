# Wijzigingen schoolwebsite v1

Dit is een **kopie** van je site met opruiming, reparaties en kleine verbeteringen. Het origineel (in je eigen mappen) is niet aangepast. Er is niets weggegooid: oude of onbruikbare bestanden staan in de map `_archief`.

Zo kijk je het na: open `index.html` in de map (of de zip), klik door een KB-pagina (vraagknoppen zijn nu donkerblauw) en een MP-pagina.

## 1. Opgeruimd

Verplaatst naar `_archief` (niet verwijderd):

- `indexold.html`, `Sorterenvmbo3Hst2old.html`, `acidbase1MPold.html` (oude versies)
- `Megadropdown.html`, `accoordionanddrops.html`, `dropdropdown.html`, `tabsanddrops.html`, `Footer.html` (menu-/layoutproeven)
- `empty KB.html`, `empty MP.html`, `empty SL.html` (lege sjablonen; handig als je een nieuwe pagina maakt)
- `test KB.html`, `pwcss.css` (test en los CSS-bestand)
- `email.php` (zie punt 5)

## 2. Links

- Menu: er stond geen NaSk-item in de balk; **NaSk** is toegevoegd (springt naar het NaSk-blok op de beginpagina).
- De knoppen "Reload"/"Volgende" waren leeg of werkten niet. Op 9 pagina's zijn het nu echte links (ChemBonds, ChemCalc, Kunststoffen, Matriaalenstof1MP, MolBouw, Sorteren, Uitdeaarde, Zouten, redox). Waar er geen volgende pagina bestaat, staat nu "Opnieuw oefenen".
- Het ontbrekende plaatje `/w3images/map.jpg` is weggehaald.
- Twee woordzoekers die niet gelinkt waren zijn nu bereikbaar vanaf de beginpagina: *woordzoeker koolstofchemie HV4* en *woordzoeker elektriciteit NaSk1*. Alle 20 PDF/docx-spellen in `spelchemie` zijn nu gelinkt.
- Links naar pagina's die niet bestaan (Matriaalenstof2KB, acidbase2MP, Stoffen1KB) stonden al in commentaar en zijn dus niet zichtbaar.
- Controle: alle 20 HTML-bestanden zijn lokaal geserveerd en **276 verwijzingen** gecontroleerd: **0 kapot**.

## 3. Inhoudelijke fouten (pagina: oud → nieuw)

**Matriaalenstof1MP / acidbase1MP**
- "Ammoniak is": juiste antwoord was c (HNO3) → nu **b (NH3)**. (Matriaalenstof1MP.html is een oude kopie van acidbase1MP en staat nergens in het menu.)

**ChemBonds1KB**
- Demo 3 waterstofperoxide: H2O3 → **H2O2**
- Demo 16 salpeterzuur: H2NO3 → **HNO3**
- Demo 35 zuurstof: H2O (g) → **O2 (g)**

**ChemReactions1KB**
- Demo 9 ethanol: C2H5O → **C2H6O**
- Demo 6: Hg (kwik) toegevoegd aan het antwoord

**acidbase1KB**
- Demo 14 Kb ammoniak: 1,8·10^5 → **1,8·10^-5**
- Demo 7: [H+] + [Cl-] → H+ (aq) + Cl- (aq) (haakjes weg)
- Demo 21: CH3H2O- → **CH3CH2O-**
- Demo 29: CO2 2- → **CO3 2-**
- Demo 31: vraag ging over "koolstof", antwoord (NH4+/NH3) is **stikstof** → vraag aangepast
- Demo 36: [OH-] 3,8·10^-3 → **1,34·10^-3 M**
- Demo 37: pH 12,26 → **11,13**
- Demo 46: 0,01 M → **0,10 M**
- Demo 48: Binas 48 → **Binas 49**
- Demo 50: H2 → **H2O**
- Dubbele vraag "Wat is een base?" (Demo 5) verwijderd

**redox1KB** (oxidatie en reductie waren in 6 vragen verwisseld)
- Demo 12 → reductie van H+; Demo 16 → oxidatie van ijzer; Demo 21 → reductie; Demo 22 → oxidatie van H2
- Demo 13 en 17: vraag herschreven naar het koppel H+/H2 en Fe2+/Fe (potentiaal van het koppel)
- Demo 19: Fe(II)SO3 → **Fe(II)SO4**; Demo 20: SO3 2+ → **SO4 2-**
- Demo 30 en 36: Al2+ → **Al3+**
- Demo 47: reactievergelijking Li + F2 hersteld: 2Li (s) + F2 (g) → 2Li+ + 2F-

**ChemCalcPeriodSys1KB**
- Demo 20: F met subscript min → **F-** (superscript)
- Demo 28/29: "etheen" → **ethaan** (het gaat om C2H6)
- Demo 30: decimale punt → komma

**Matriaalenstof1KB**
- Demo 24: "kookpunt van water" met antwoord 0 °C → **smeltpunt** (Demo 23 blijft kookpunt, 100 °C)
- Demo 43: "Noem 6" → "Noem minstens 6" (antwoord noemt er 7)

**Zoutenvmbo4Hst10**
- Demo 20: Cl--(aq) → Cl- (aq)

**kunststoffenMP**
- 2 exact dubbele vragen verwijderd (nu 16 vragen i.p.v. 18)

## 4. Spelling

- Ongeveer 230 woorden verbeterd, o.a. kennis (11 pagina's), titratie, destillatie/destilleren, kookpunt, dichtheid, deeltjes, "base constante", zuurstof, ontstaan, bijvoorbeeld, elektrisch, bevat/geeft/betekent (werkwoordsvormen), enzovoort.
- Per pagina (aantal verbeteringen): Sorteren 47, Matriaalenstof1KB 32, Uitdeaarde 28, Zouten 26, acidbase1KB 26, MolBouw 22, redox 20, Kunststoffen 13, ChemCalc 6, ChemReactions 5, ChemBonds 1, duurzaamheidMP 1; Matriaalenstof1MP en acidbase1MP ook enkele.
- 35 HTML-tekens zonder puntkomma (bijv. `&#8729` → `&#8729;`) gerepareerd (acidbase1KB 27, Matriaalenstof1KB 3, Sorteren 3, Uitdeaarde 2).
- Taalcode van de pagina's: `lang="en"` → `lang="nl"` op 15 pagina's (voorleessoftware en spellingscontrole).

## 5. Leesbaarheid en toegankelijkheid

- Grijze tekst (#818181) is nu bijna zwart (#111111).
- Felrode vraagknoppen zijn vervangen door rustig donkerblauw met witte letters (ca. 467 knoppen op 12 pagina's). Antwoordvakken kregen een lichtblauwe achtergrond met een lijn links.
- Het automatisch doorschuiven van de carrousel op de beginpagina is uitgezet.
- Alle 472 invulvelden hebben nu een label voor schermlezers ("Jouw antwoord op: …").
- MP-uitslag staat in het Nederlands, met een melding op de pagina in plaats van een pop-up; goed/fout wordt niet alleen met kleur getoond.
- Menu op mobiel (`openNav`) werkt nu.
- Contactformulier: het formulier stuurde via `email.php`. Vervangen door "Contactformulier volgt" met alleen het publieke adres info@betermetpeter.nl. `email.php` staat in `_archief` en zit **niet** in de zip of in deze Drive-map. Er zijn geen wachtwoorden of sleutels in het bestand gevonden, maar het bevat wel privé-mailadressen; publiceer het niet.
- KBAI-pagina (Matriaalenstof1KBAI): blijft staan met een duidelijke melding "In ontwikkeling" en maakt geen verbinding met een lokale server meer.

## 6. Nog te checken door Peter

Dit heb ik niet zelf durven veranderen of ik ben er niet zeker van:

**Binas (7e druk)**
- Tabelnummers in de vragen (o.a. 99, 25A, 52A, 48, 40, 35, 49). Alleen "48 → 49" bij acidbase1KB Demo 48 is aangepast. Zouten Demo 30/48 noemen "tabel 35" voor oplosbaarheid (mogelijk 45A). acidbase1KB lakmoes "pH lager dan 5,5": Binas 52A zegt 5,0?
- Kz azijnzuur 1,7 of 1,8·10^-5 (en de Kb 5,8·10^-10 die daaruit volgt) op acidbase1KB.

**Inhoud**
- ChemCalc Demo 8 (Rutherford "1 wolk") en Demo 22 ("massagetal" of atoommassa?).
- Matriaalenstof1KB Demo 22 ("specifieke maximale waarde"); Demo 43 Absorberen of Adsorberen (nog niet aangepast).
- MolBouw1KB Demo 3 (Li en S in de octetlijst, komma aan het eind); Demo 19 (SO2: "driehoekstructuur" of gebogen?).
- Uitdeaarde Demo 43 (zink als giftig), Demo 10 (gasolie "300-150"), Demo 23 (onduidelijke zin "iit zout kristelen"), Demo 36 ("patbakjes").
- Sorteren Demo 7 ("Suspensies hebben altijd een kleur").
- Zouten Demo 12 ("de meeste metaalionen 2+").
- redox Demo 38 (F- als reductor?), Demo 51 ("roest gaat bladeren").
- De herschreven redox-vragen Demo 13 en 17: klopt de nieuwe formulering?
- chemrekenenVMBO3MP: veel bijna-dubbele vragen (1/21, 3/23, 9/33, 10/34, 12/37). Vraag 9 ("massaverhouding") en 12 ("overmaat … gezuiverd") zijn twijfelachtig; vraag 11 (eerst reactievergelijking) spreekt vraag 13/36 (eerst gegevens verzamelen) tegen.
- kunststoffenMP: vraag 15 lijkt op 5, vraag 18 op 13.
- NL1: nummering heeft gaten (13 → 16, geen 14/15, geen 30); vraag 30 "Het tij keren" heeft twee bijna goede opties; vraag 56 "Klinisch" is dubbelzinnig.

**Overig**
- De drie shorturl.at-links (Google Forms) en de Thema/klimaatlink kon ik niet controleren.
- `Matriaalenstof1MP.html` is een oude kopie van `acidbase1MP.html` zonder link: kan naar `_archief`.
- Inhoud van de vragen is alleen aangepast waar ik zeker was; twijfelgevallen staan hierboven.

## Zwevende knop "Controleer nu" (meerkeuzepagina's)
- Op alle MP-pagina's zweeft rechtsonder een knop "Controleer nu" die dezelfde controle doet als de knop onderaan; daarna scrolt de pagina naar de score. De gewone knop heet nu ook "Controleer nu".

## Meerkeuzevragen (MP) opgeschoond (29 okt 2026)
- Alle MP-pagina's hebben nu 4 antwoordopties (a t/m d) in plaats van 5; de antwoordsleutel is opnieuw gezet en getest (alles goed = volle score).
- Vragen eenvoudiger geformuleerd (korte zinnen, één idee per vraag, geen dubbele ontkenningen).
- Dubbelzinnige antwoorden herschreven, onder andere reactiesnelheid en reactietijd (nu losse vragen met duidelijk verschillende antwoorden).
- Dubbele vragen verwijderd: kunststoffenMP 16 → 11 vragen, chemrekenenVMBO3MP 37 → 21 vragen. Zuur-base blijft 17, duurzaamheid 13.
- Fenolrood-vraag bij pH 8 is pH 9 geworden (pH 8 is de grens van het omslaggebied).
- Het goede antwoord staat nu verspreid over a, b, c en d.
- Zie `mp_wijzigingen.md` (in de werkmap) voor voorbeelden en twijfelgevallen.

## Willekeurige volgorde, 15 vragen per keer, één script en één stijlbestand (29 okt 2026)

**Willekeurige volgorde**
- Bij elke keer openen staan de vragen in een andere volgorde: op alle KB-pagina's en alle MP-pagina's (ook NL1).
- Op MP-pagina's worden ook de antwoordopties door elkaar gezet. De letters a t/m d blijven netjes op volgorde staan. Het nakijken gaat op inhoud van het antwoord, niet op de plek, dus de score klopt altijd.
- Uitzondering: de kleurvragen (ZB-set, 5 vragen op acidbase1MP en Matriaalenstof1MP) houden hun vaste volgorde van antwoorden, omdat de opties daar bij elkaar horen.
- In NL1 stonden vraagnummers ("1. ", "2. " ...) in de vragen. Die zijn weggehaald, anders klopt de nummering niet meer bij een willekeurige volgorde.

**15 vragen per keer**
- Pagina's met meer dan 15 vragen tonen er eerst 15. Onderaan staat een knop "Meer vragen (nog X)" die de volgende 15 laat zien (de laatste keer de rest). Pagina's met 15 of minder vragen hebben de knop niet.
- Vragen die nog niet getoond zijn tellen niet mee als fout. Op MP-pagina's staat de score als "8 van de 15 goed" (alleen de getoonde vragen).
- De zwevende knop "Controleer nu" werkt nog steeds. De pagina verspringt niet bij "Meer vragen" en niet bij "Controleer nu" (de pagina scrolt niet meer automatisch naar de score).
- Dit geldt voor: ChemBonds1KB, ChemCalcPeriodSys1KB, ChemReactions1KB (18), Kunststoffen1KB, Matriaalenstof1KB, MolBouw1KB, Sorterenvmbo3Hst2, Uitdeaardevmbo4Hst9, Zoutenvmbo4Hst10, acidbase1KB, redox1KB, acidbase1MP (17), Matriaalenstof1MP (17), chemrekenenVMBO3MP (21), NL1 (59). Niet nodig bij kunststoffenMP, duurzaamheidMP, Matriaalenstof1KBAI.

**Eén script, één stijlbestand**
- Alle losse `<script>`- en `<style>`-blokken in de pagina's zijn samengevoegd in `school.js` en `123school.css`. Dubbele en nooit gebruikte code is verwijderd (o.a. dubbele `myFunction`, drie verschillende `submitAnswer`, dubbele stijlregels voor links, oude uitgecommentarieerde knoppen).
- De stijlen van de beginpagina staan nu in `123school.css` onder `body.home`, zodat ze andere pagina's niet beïnvloeden. De beginpagina is vergeleken met de oude versie: alle stijlen en posities zijn gelijk, ook op mobiel.
- Bewust niet samengevoegd: de bibliotheken (w3.css, font-awesome, jQuery, Bootstrap, w3.js, w3data.js) en de vragenlijst van de MP-pagina's (`var myQuestions = [...]` staat per pagina in de HTML, zodat `mp/build.py` die lijst kan blijven vervangen). Losse `style="..."`-attributen in de HTML staan er nog.
- `mp/build.py` is aangepast: de kleurvragen krijgen `fixed: true`, en de speler zelf staat in `school.js`.

**Stappenplan reactievergelijking (op verzoek van Peter)**
- ChemCalcPeriodSys1KB, "Stel de reactievergelijking op" (Demo27): het antwoord volgt nu precies jouw vier stappen: Stap 1 reactieschema in woorden, Stap 2 reactieschema in molecuulformules, Stap 3 atoombalans - kloppend maken, Stap 4 reactievergelijking vereenvoudigen. De vraag verwijst naar "het stappenplan".
- De MP-vraag "Je gaat rekenen aan een reactie. Wat doe je als eerste?" (De reactievergelijking opstellen) is ongewijzigd. Andere MP- of KB-vragen over het opstellen van een reactievergelijking met stappen zijn er niet.

**Getest** (Playwright, Chrome, 1280×800 en 390×780): geen JavaScript-fouten op alle 20 pagina's; volgorde verschilt tussen twee keer openen; alles goed = volle score op de getoonde vragen, alles fout = 0; "Meer vragen" en de zwevende knop werken zonder dat de pagina verspringt; ingetypte antwoorden op de KB-pagina's blijven na verversen niet in een verkeerd vak staan; alle interne links en plaatjes bestaan.

## Kleine schermen en tablets nagelopen (29 okt 2026)

Alle 19 pagina's bekeken op 360×640, 390×844, 414×896 en 768×1024 (met aanraking). Wat er goed was: viewport-meta overal aanwezig, nergens horizontaal scrollen, geen tabellen of te grote plaatjes, tekst op de KB- en MP-pagina's al groot genoeg, de PDF-spellen (20 links) bereikbaar. Wat is verbeterd (alles in `123school.css`, `school.js` en `navbar.html`; geen losse pagina's aangepast; op een scherm van 1280 breed is elke pagina pixel-gelijk gebleven):

- **Menu**: de menubalk ging op een tablet (768) over twee regels en schoof over de inhoud heen. Het hamburgermenu verschijnt nu onder 1200 px (beginpagina: onder 1000 px). Het menu sluit na een tik op een onderdeel en met Escape, en heeft `aria-expanded`. Alle menu-items zijn minimaal 48 px hoog.
- **MP-antwoorden**: de rijen waren 30 px hoog met kleine bolletjes. Nu 48 px hoog met bolletjes van 24 px; de hele rij is aantikbaar.
- **Knoppen** ("Controleer", "Meer vragen", "Opnieuw oefenen", "Vergelijk antwoord", vraagknoppen): minimaal 44-48 px hoog.
- **Invoervelden**: minimaal 16 px, zodat iOS niet inzoomt; typevragen over de volle breedte.
- **Beginpagina**: tekst op telefoon 16 px in plaats van 15 px; bolletjes van de carrousel iets groter; links in de voettekst en het e-mailadres hebben een grotere aanraakzone.
- **Voettekst**: op KB- en MP-pagina's stond een zwart blok met rand ernaast; nu over de volle breedte op telefoon.
- **Zwevende knop**: onder in de pagina is 96 px ruimte, zodat de laatste vraag en de knop "Meer vragen" bereikbaar blijven.

Bewust gelaten: de zwevende knop ligt tijdens het scrollen over de tekst (zo ontworpen, hij verdwijnt zodra de gewone knop in beeld is); de onderindices/bovenindices (H₂O) blijven 15 px; de dropdown op de beginpagina legt zich over het volgende blok (standaard w3.css-gedrag); de docx-spellen worden op een telefoon gedownload in plaats van geopend.

Voor/na-schermafbeeldingen: `screens/mobiel_voor_*.png` en `screens/mobiel_na_*.png`.
