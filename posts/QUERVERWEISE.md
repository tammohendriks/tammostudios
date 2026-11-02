# Querverweise im Text

Erzeugt von `npm run querverweise`. **Von Hand bearbeiten lohnt nicht** —
der naechste Lauf ueberschreibt die Datei. Abgehakte Kaestchen gehen
dabei verloren; was eingebaut ist, erkennt das Skript beim naechsten Mal
von selbst am Build und schlaegt es nicht wieder vor.

Diese Liste ist ein Vorschlag, kein Automatismus. Der
Weiterlesen-Block unter jedem Beitrag wird beim Build gerechnet und
braucht nichts von Dir. Hier geht es um die andere Sorte Verweis: einen
Satz *mitten im Text*, der auf einen anderen Beitrag zeigt.

Der Unterschied ist nicht kosmetisch. Ein Verweis im Fliesstext steht in
einem Zusammenhang — er sagt, warum man dort weiterliest. Ein Block am
Ende sagt nur, dass es noch mehr gibt. Fuer Google ist der Linktext im
Satz ausserdem ein Signal, der Block unten kaum.

**Warum das noetig war:** von urspruenglich 46 Verweisen in allen
Beitraegen zeigten 38 auf /kontakt oder /preisrechner — rund einer von
jeder Sorte pro Beitrag. Das ist eine Vorlage, kein Versehen: jeder
Beitrag behandelt den Leser als jemanden, der gleich kaufen will. Wer
nur etwas wissen wollte, hatte keinen naechsten Schritt.

**Wie die Vorschlaege entstehen:** dieselbe Rechnung wie beim
Weiterlesen-Block (`src/lib/journalVerwandt.ts`) — tf-idf ueber alle
Beitraege, Aehnlichkeit als Kosinus, Tags als zusaetzliche Begriffe. Die
»gemeinsamen Begriffe« sind die seltensten Woerter, die in beiden
Beitraegen vorkommen; sie sagen, *worueber* sich die beiden einig sind.
Der zitierte Satz ist eine Stelle im Quell-Beitrag, an der das Thema
schon angesprochen wird — dort faellt ein Verweis nicht als Fremdkoerper
auf.

**Der Satz gehoert Dir.** Vorgeschlagen sind Ziel und Stelle, nicht die
Formulierung. Ein eingebauter Verweis liest sich gut, wenn er wie eine
Randbemerkung klingt (»Warum 1.500 Euro trotzdem normal sind, habe ich
hier aufgeschrieben«) und schlecht, wenn er wie ein Hinweisschild
klingt (»Lesen Sie auch: ...«).

Erzeugt am 02.11.2026 aus 20 Beitraegen.

---

## Zuerst: 1 Verweis auf alte Adressen

Diese Verweise im Text zeigen auf Slugs, die es nicht mehr gibt. Sie
funktionieren nur, weil `vercel.json` sie weiterleitet — ein Umweg bei
jedem Klick, und er faellt weg, sobald die Weiterleitung aufgeraeumt
wird. Im Sanity-Studio auf die heutige Adresse aendern:

- [ ] In *Für welche Betriebe eine Website Zeitverschwendung ist*: `/journal/recruiting-handwerk-website` → `/journal/recruiting-mit-website`

---

## 10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe

`/journal/dsgvo-praxis-website-fehler` · Praxis, Prozess · 02.11.2026

- [ ] **Website für Praxen: Vertrauen, DSGVO und was Patienten wirklich brauchen** → `/journal/website-praxis-was-wichtig`
  Gemeinsame Begriffe: patienten, formular, consent, rechtlich, praxen, datenschutzerklaerung
  Moegliche Stelle: »Nicht Kleinigkeiten, die ein Datenschutzbeauftragter in der nächsten Jahresprüfung meckert — sondern Dinge, die sofort auffallen und die ein geübtes Patientenauge bemerkt.«

- [ ] **Was auf eine Arztpraxis-Website gehört (und was nicht)** → `/journal/praxis-website-inhalte`
  Gemeinsame Begriffe: patienten, nutzer, samedos, praxen, formular, referenzen
  Moegliche Stelle: »Nicht Kleinigkeiten, die ein Datenschutzbeauftragter in der nächsten Jahresprüfung meckert — sondern Dinge, die sofort auffallen und die ein geübtes Patientenauge bemerkt.«

- [ ] **Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten** → `/journal/manuelle-prozesse-ablosen`
  Gemeinsame Begriffe: daten, formular, rechtlich, mitarbeiter, ihrer, erwartung
  Moegliche Stelle: »Nicht Kleinigkeiten, die ein Datenschutzbeauftragter in der nächsten Jahresprüfung meckert — sondern Dinge, die sofort auffallen und die ein geübtes Patientenauge bemerkt.«

- [ ] **Meine Tools: Astro, Sanity, Vercel — und was dahinter steckt** → `/journal/meine-tools-astro-sanity-vercel`
  Gemeinsame Begriffe: vercel, technisch, hosting, laedt, servern, laedst
  Moegliche Stelle: »Bei unseren Praxen liegt die Rechenleistung in Frankfurt — Vercel mit regions: ["fra1"] in der Konfig festgelegt.«

---

## Was auf eine Arztpraxis-Website gehört (und was nicht)

`/journal/praxis-website-inhalte` · Praxis, Prozess · 30.09.2026

- [ ] **Website für Praxen: Vertrauen, DSGVO und was Patienten wirklich brauchen** → `/journal/website-praxis-was-wichtig`
  Gemeinsame Begriffe: patienten, praxen, pflicht, werbung, formular, sprachen
  Moegliche Stelle: »Aber was den Unterschied macht zwischen einer Website, die nur da ist, und einer, die tatsächlich neue Patienten bringt und Vertrauen aufbaut, sind meistens Elemente, die im Standard-Playbook fehlen.«

- [ ] **Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten** → `/journal/manuelle-prozesse-ablosen`
  Gemeinsame Begriffe: eignungsuntersuchungen, formular, effekt, formulare, vorher, listen
  Moegliche Stelle: »Als Privatperson: Selbstzahler-Pfad für Eignungsuntersuchungen (Führerschein, Sportbootführerschein).«

- [ ] **10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe** → `/journal/dsgvo-praxis-website-fehler`
  Gemeinsame Begriffe: patienten, nutzer, samedos, praxen, formular, referenzen
  Moegliche Stelle: »Aber was den Unterschied macht zwischen einer Website, die nur da ist, und einer, die tatsächlich neue Patienten bringt und Vertrauen aufbaut, sind meistens Elemente, die im Standard-Playbook fehlen.«

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: basics, gemacht, effekt, sehen, abhebt, klassiker
  Moegliche Stelle: »Das ist nicht schlimm — die Basics müssen sein.«

---

## Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt

`/journal/google-business-profile-richtig-nutzen` · SEO, Prozess · 23.09.2026

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: profile, bewertungen, bewertung, antworten, faktor, ranking
  Moegliche Stelle: »Halbfertige Profile, veraltete Öffnungszeiten, keine Fotos, keine Kategorien.«

- [ ] **Warum jede zufriedene Rückmeldung eine Chance ist — die Bewertungs-Strategie für kleine Betriebe** → `/journal/bewertungen-richtig-sammeln`
  Gemeinsame Begriffe: bewertung, bewertungen, bewertungs, antworten, ansprache, wichtigste
  Moegliche Stelle: »Kein Eintrag bei Google Maps, keine Öffnungszeiten sichtbar, keine Bewertungen möglich.«

- [ ] **Die 5 teuersten Website-Fehler die ich immer wieder sehe** → `/journal/5-teuerste-website-fehler`
  Gemeinsame Begriffe: fehler, eintrag, unserer, menue, regelmaessiges, search
  Moegliche Stelle: »Hier meine Erfahrung was wirklich drin gehört, was die häufigsten Fehler sind und wie du dein Profil so aufsetzt dass es Kunden bringt.«

- [ ] **Es gibt nicht die eine Design-Sprache — meine Philosophie beim Bauen** → `/journal/design-philosophie`
  Gemeinsame Begriffe: ranking, faktor, aufgabe, uebersehener, behind, scenes
  Moegliche Stelle: »Setup-Basics — was oft falsch gemacht wird

Falsche oder unvollständige Kategorie 
Die Kategorie ist einer der wichtigsten Ranking-Faktoren im GBP.«

---

## Warum jede zufriedene Rückmeldung eine Chance ist — die Bewertungs-Strategie für kleine Betriebe

`/journal/bewertungen-richtig-sammeln` · Prozess, SEO · 16.09.2026

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: bewertung, bewertungen, bewertungs, antworten, ansprache, wichtigste
  Moegliche Stelle: »Google-Bewertungen sind wahrscheinlich das wichtigste einzelne Trust-Signal für lokale Unternehmen.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: bewertungen, bewertung, antworten, signal, meisten, problem
  Moegliche Stelle: »Google-Bewertungen sind wahrscheinlich das wichtigste einzelne Trust-Signal für lokale Unternehmen.«

- [ ] **Von der Sparkassen-Tochter zur eigenen Bude — meine ersten Monate als Freelancer** → `/journal/von-der-sparkassen-tochter-zur-eigenen-bude`
  Gemeinsame Begriffe: moment, verstehen, meinen, launch, trefferquote, zufrieden
  Moegliche Stelle: »Der beste Moment: kurz nach Launch

Der Zeitpunkt an dem du fragst, entscheidet über die Erfolgsquote.«

- [ ] **Website für Handwerker: 5 Dinge, die wirklich Kunden bringen** → `/journal/website-handwerker-was-wichtig`
  Gemeinsame Begriffe: kurze, echten, zweiten, anrede, dagegen, moment
  Moegliche Stelle: »Kurzer Anruf oder Nachricht, dezent nachhaken.«

---

## Von der Sparkassen-Tochter zur eigenen Bude — meine ersten Monate als Freelancer

`/journal/von-der-sparkassen-tochter-zur-eigenen-bude` · Prozess · 12.09.2026

- [ ] **Neue Preise ab August 2026: Was sich ändert und warum** → `/journal/preiserhoehung-2026`
  Gemeinsame Begriffe: selbstaendigkeit, eigenes, tammo, bestandskunden, studios, langfristig
  Moegliche Stelle: »Der erste Kunde war die Familie

Ein Vorteil den ich hatte: mit dem Sprung in die Selbständigkeit war ich nicht bei Null.«

- [ ] **Warum jede zufriedene Rückmeldung eine Chance ist — die Bewertungs-Strategie für kleine Betriebe** → `/journal/bewertungen-richtig-sammeln`
  Gemeinsame Begriffe: moment, verstehen, meinen, launch, zufrieden, druck
  Moegliche Stelle: »Bei mir war's anders: eine Kombination aus beruflichem Umbruch, privater Neuausrichtung und dem Gefühl, dass jetzt der richtige Moment ist.«

- [ ] **Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten** → `/journal/manuelle-prozesse-ablosen`
  Gemeinsame Begriffe: digital, weiter, eigentlich, laufen, vorher, werkzeugen
  Moegliche Stelle: »Der Ausgangspunkt

Meine Ausbildung habe ich als Kaufmann für Digitalisierungsmanagement bei einer Sparkassen-Tochter gemacht.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: praesenz, gefunden, wirkung, naechste, ausbauen, klassisch
  Moegliche Stelle: »Neue Kunden über verschiedene Wege — Empfehlung, kalte Anfrage, Insta-Präsenz, ein direkter Cold-Outreach-Ansatz mit vorgefertigten Prototypen.«

---

## Meine Tools: Astro, Sanity, Vercel — und was dahinter steckt

`/journal/meine-tools-astro-sanity-vercel` · Prozess, Tools · 09.09.2026

Verweist im Text schon auf: *Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten*

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: dahinter, pflegen, landing, pages, backend, erlebnis
  Moegliche Stelle: »Fazit

Tools sind Werkzeuge — die Substanz kommt vom Menschen dahinter.«

- [ ] **10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe** → `/journal/dsgvo-praxis-website-fehler`
  Gemeinsame Begriffe: vercel, technisch, hosting, liefert, laedt, system
  Moegliche Stelle: »Meine Antwort ist immer dieselbe Kombination aus drei Kern-Tools: Astro als Framework, Sanity als CMS, Vercel als Hosting.«

- [ ] **Es gibt nicht die eine Design-Sprache — meine Philosophie beim Bauen** → `/journal/design-philosophie`
  Gemeinsame Begriffe: modernes, nutzern, meinem, modernen, technische, solide
  Moegliche Stelle: »Es ist ein modernes Framework, das speziell für inhaltsorientierte Websites entwickelt wurde — also genau für das, was kleine Unternehmen brauchen: schnelle Info-Seiten, Blog-Systeme, Landing Pages, Portfolio-Sites.«

- [ ] **Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?** → `/journal/handgemacht-oder-wix-squarespace`
  Gemeinsame Begriffe: debatte, minimalem, vendor, waechst, tools, technische
  Moegliche Stelle: »Das ist mir wichtiger als jede technische Debatte.«

---

## Es gibt nicht die eine Design-Sprache — meine Philosophie beim Bauen

`/journal/design-philosophie` · Design, Prozess · 05.09.2026

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: ranking, faktor, uebersehener, indirekt, behind, scenes
  Moegliche Stelle: »Warum modernes Design zu besserer Sichtbarkeit führt

Ein oft übersehener Zusammenhang: modernes Design und Google-Ranking hängen zusammen.«

- [ ] **Meine Tools: Astro, Sanity, Vercel — und was dahinter steckt** → `/journal/meine-tools-astro-sanity-vercel`
  Gemeinsame Begriffe: meinem, modernes, nutzern, modernen, rolle, solide
  Moegliche Stelle: »Nicht weil ich meine Meinung aufgebe, sondern weil das Design deiner Marke dienen muss, nicht meinem Portfolio.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: faktor, ranking, aktualitaet, entscheidend, ideal, starten
  Moegliche Stelle: »Design ist damit kein Selbstzweck sondern ein SEO-Faktor.«

- [ ] **Website für Gastronomie: Atmosphäre, Speisekarte und was Gäste wirklich suchen** → `/journal/website-gastronomie-was-wichtig`
  Gemeinsame Begriffe: signature, atmosphaere, aktuelle, bauen, entscheidend, bonus
  Moegliche Stelle: »Bei mir gibt es keine Tammo-Studios-Signature-Optik.«

---

## Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten

`/journal/manuelle-prozesse-ablosen` · Prozess, Praxis, Handwerk · 02.09.2026

- [ ] **Was auf eine Arztpraxis-Website gehört (und was nicht)** → `/journal/praxis-website-inhalte`
  Gemeinsame Begriffe: eignungsuntersuchungen, formular, effekt, formulare, vorher, anfrageformulare

- [ ] **Website für Handwerker: 5 Dinge, die wirklich Kunden bringen** → `/journal/website-handwerker-was-wichtig`
  Gemeinsame Begriffe: formular, heizung, waermepower, telefon, lemwerder, waermepumpen
  Moegliche Stelle: »Beispiel 1: IBI und die 3 Anfrageformulare

Bei IBI kommen unterschiedliche Kundenanfragen rein, und jede hat andere Anforderungen.«

- [ ] **10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe** → `/journal/dsgvo-praxis-website-fehler`
  Gemeinsame Begriffe: daten, formular, rechtlich, mitarbeiter, projekten, strukturiert
  Moegliche Stelle: »Für den Kunden ist es einfacher (kein PDF-Drucker nötig, kein Scannen), für IBI ist es strukturierter (klare Datenlage von Anfang an), und rechtlich ist es sauberer (DSGVO-konforme Speicherung von der ersten Sekunde).«

- [ ] **Von der Sparkassen-Tochter zur eigenen Bude — meine ersten Monate als Freelancer** → `/journal/von-der-sparkassen-tochter-zur-eigenen-bude`
  Gemeinsame Begriffe: digital, weiter, eigentlich, laufen, vorher, unterschiedliche
  Moegliche Stelle: »Eine Website ist nicht nur digitale Visitenkarte.«

---

## Neue Preise ab August 2026: Was sich ändert und warum

`/journal/preiserhoehung-2026` · Preise, Prozess · 29.08.2026

Verweist im Text schon auf: *Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten*, *Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?*

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: bekommst, kalkuliert, individuelles, eigenes, agentur, baukasten
  Moegliche Stelle: »Baukasten), zahlst du mit Custom mehr — bekommst aber deutlich mehr.«

- [ ] **Wie lange dauert es, eine Website zu bauen? Der ehrliche Zeitplan** → `/journal/wie-lange-dauert-eine-website`
  Gemeinsame Begriffe: tagen, agentur, launch, baukasten, testen, unterseiten
  Moegliche Stelle: »Für ein Projekt das ich in 14 Tagen von Kickoff bis Launch durchziehe, ist das kein Preis der langfristig funktioniert.«

- [ ] **Von der Sparkassen-Tochter zur eigenen Bude — meine ersten Monate als Freelancer** → `/journal/von-der-sparkassen-tochter-zur-eigenen-bude`
  Gemeinsame Begriffe: selbstaendigkeit, eigenes, tammo, bestandskunden, studios, launch
  Moegliche Stelle: »Warum die Erhöhung ehrlich nötig war

Selbständigkeit in Deutschland ist teurer als gedacht.«

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: agentur, deutlich, teurer, sitzt, stelle, bewusst
  Moegliche Stelle: »Und für Dich als Kunde ist es immer noch deutlich günstiger als bei jeder Agentur.«

---

## Fachkräftemangel: Warum deine Website dein wichtigstes Recruiting-Tool ist

`/journal/recruiting-mit-website` · Recruiting, Prozess · 24.08.2026

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: bewerber, woche, fachkraeftemangel, normalen, abschreckt, unbesetzte
  Moegliche Stelle: »Wenn deine Website das nicht bedient, verlierst du Bewerber, bevor sie überhaupt Kontakt aufnehmen.«

- [ ] **Website für Gastronomie: Atmosphäre, Speisekarte und was Gäste wirklich suchen** → `/journal/website-gastronomie-was-wichtig`
  Gemeinsame Begriffe: gastro, restaurants, suchen, googlen, events, startup
  Moegliche Stelle: »Oder: „Wochenend-Schichten sind Teil der Arbeit, dafür 4-Tage-Woche" (Gastro).«

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: denken, ansprache, suchst, kostenlosen, besuch, restaurants
  Moegliche Stelle: »Wenn deine Website aussieht als sei 2010 im Kopf stehen geblieben, denken sie: „Dann arbeitet der Chef auch so." Zack, weg.«

- [ ] **Es gibt nicht die eine Design-Sprache — meine Philosophie beim Bauen** → `/journal/design-philosophie`
  Gemeinsame Begriffe: niemanden, denken, aussehen, anonyme, ideal, sauberes

---

## Für welche Betriebe eine Website Zeitverschwendung ist

`/journal/betriebe-die-keine-website-brauchen` · Prozess, Preise · 22.08.2026

Verweist im Text schon auf: *Fachkräftemangel: Warum deine Website dein wichtigstes Recruiting-Tool ist*

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: custom, professionell, stunden, produkten, faellen, wachsen
  Moegliche Stelle: »1.500 € Custom-Website ist rausgeworfenes Geld.«

- [ ] **Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?** → `/journal/handgemacht-oder-wix-squarespace`
  Gemeinsame Begriffe: custom, empfehlungs, investieren, planst, temporaere, aufgesetzt
  Moegliche Stelle: »1.500 € Custom-Website ist rausgeworfenes Geld.«

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: sales, umsatz, custom, verfuegbar, haelt, gegenueber
  Moegliche Stelle: »Fall 5: Reine B2B mit direktem Sales-Motion

Du verkaufst an große Unternehmen.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: profile, aktiv, praesenz, bewertungen, potenziellen, linkedin
  Moegliche Stelle: »Google Business Profile (kostenlos), evtl.«

---

## 1.500 € für eine Website ist nicht wenig — es ist normal

`/journal/1500-euro-website-ist-normal` · Preise, Prozess · 19.08.2026

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: agentur, overhead, uebergabe, freelancer, reaktion, selbststaendige
  Moegliche Stelle: »Nicht weil Agenturen unfair sind, sondern weil sie 5 Menschen bezahlen müssen.«

- [ ] **Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?** → `/journal/handgemacht-oder-wix-squarespace`
  Gemeinsame Begriffe: rechnung, freelancer, billig, sobald, schwankst, custom
  Moegliche Stelle: »Der Verlust ist nicht sichtbar in Rechnungen, sondern in nicht-gestellten Anfragen.«

- [ ] **Wie lange dauert es, eine Website zu bauen? Der ehrliche Zeitplan** → `/journal/wie-lange-dauert-eine-website`
  Gemeinsame Begriffe: agentur, tatsaechlich, woche, freelancer, wenig, gesetzt
  Moegliche Stelle: »Nicht weil Agenturen unfair sind, sondern weil sie 5 Menschen bezahlen müssen.«

- [ ] **Neue Preise ab August 2026: Was sich ändert und warum** → `/journal/preiserhoehung-2026`
  Gemeinsame Begriffe: agentur, deutlich, sitzt, teurer, software, bewusst
  Moegliche Stelle: »Nicht weil Agenturen unfair sind, sondern weil sie 5 Menschen bezahlen müssen.«

---

## Die 5 teuersten Website-Fehler die ich immer wieder sehe

`/journal/5-teuerste-website-fehler` · Prozess, SEO · 17.08.2026

- [ ] **Website für Handwerker: 5 Dinge, die wirklich Kunden bringen** → `/journal/website-handwerker-was-wichtig`
  Gemeinsame Begriffe: region, sekunden, kontaktseite, endet, smartphone, zoomen

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: fehler, menue, unserer, eintrag, regelmaessiges, uebersehen
  Moegliche Stelle: »Und in ~80 % der Fälle finde ich die gleichen 5 Fehler.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: stadt, region, findet, lokales, suche, auftauchst

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: findet, schoen, verlust, vertrauensverlust, jahresumsatz, ordentliche
  Moegliche Stelle: »Google findet dich nicht (weil du nicht sagst was du machst)

Basis-SEO wird oft komplett übersehen.«

---

## Website für Praxen: Vertrauen, DSGVO und was Patienten wirklich brauchen

`/journal/website-praxis-was-wichtig` · Praxis, Prozess · 15.08.2026

- [ ] **Was auf eine Arztpraxis-Website gehört (und was nicht)** → `/journal/praxis-website-inhalte`
  Gemeinsame Begriffe: patienten, praxen, pflicht, werbung, formular, regeln
  Moegliche Stelle: »Terminanfrage: einfach und diskret

Patienten wollen einen Termin buchen ohne Anruf-Hürde.«

- [ ] **10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe** → `/journal/dsgvo-praxis-website-fehler`
  Gemeinsame Begriffe: patienten, formular, consent, rechtlich, praxen, datenschutzerklaerung
  Moegliche Stelle: »Terminanfrage: einfach und diskret

Patienten wollen einen Termin buchen ohne Anruf-Hürde.«

- [ ] **Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten** → `/journal/manuelle-prozesse-ablosen`
  Gemeinsame Begriffe: formular, rechtlich, huerde, getrennte, anliegen, fuellt
  Moegliche Stelle: »Ein Terminformular auf einer Praxis-Website behandelt automatisch Gesundheitsdaten — auch wenn der Patient nur „Erstberatung Hautthema" schreibt.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: typische, tippen, verliert, jameda, platz, information
  Moegliche Stelle: »Der typische Praxis-Website-Besucher entscheidet in unter zwei Minuten, ob er anruft oder weitersucht.«

---

## Website für Gastronomie: Atmosphäre, Speisekarte und was Gäste wirklich suchen

`/journal/website-gastronomie-was-wichtig` · Gastronomie, Prozess · 12.08.2026

- [ ] **Website für Handwerker: 5 Dinge, die wirklich Kunden bringen** → `/journal/website-handwerker-was-wichtig`
  Gemeinsame Begriffe: scrollen, funktionieren, anruf, sekunden, prominent, suchen
  Moegliche Stelle: »Deine Website muss klar zeigen:

Reguläre Öffnungszeiten pro Wochentag

Ruhetage deutlich markiert

Aktuelle Sonderregelungen (Betriebsferien, Feiertage)

Prominent im Header oder Footer, sichtbar ohne Scrollen.«

- [ ] **Was auf eine Arztpraxis-Website gehört (und was nicht)** → `/journal/praxis-website-inhalte`
  Gemeinsame Begriffe: weglassen, sonderregelungen, fotografieren, anfahrt, oepnv, video
  Moegliche Stelle: »Das kannst du nutzen:

Instagram-Feed eingebettet zeigt aktuellen Content ohne extra Pflege

Direktlink zum Insta-Profil prominent

Aber:

Facebook-Pixel und Tracking — DSGVO-konform integrieren oder weglassen.«

- [ ] **Es gibt nicht die eine Design-Sprache — meine Philosophie beim Bauen** → `/journal/design-philosophie`
  Gemeinsame Begriffe: atmosphaere, signature, aktuelle, element, scrollen, generischen
  Moegliche Stelle: »Was du in diesen 30 Sekunden vermitteln musst: welche Atmosphäre erwartet mich, was gibt's zu essen, wann seid ihr offen, wie komme ich hin.«

- [ ] **Fachkräftemangel: Warum deine Website dein wichtigstes Recruiting-Tool ist** → `/journal/recruiting-mit-website`
  Gemeinsame Begriffe: gastro, restaurants, suchen, googlen, inszeniert, draussen
  Moegliche Stelle: »Aktuelle Speisekarte, immer erreichbar

Die Speisekarte ist das meistgesuchte Element auf einer Gastro-Website.«

---

## Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?

`/journal/handgemacht-oder-wix-squarespace` · Preise, Prozess · 10.08.2026

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: custom, baukaesten, features, echtes, freelancer, baukasten
  Moegliche Stelle: »Custom"-Debatte ist meistens ideologisch: Freelancer bashen Baukästen, Baukasten-Anbieter bashen Freelancer.«

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: rechnung, freelancer, billig, sobald, schwankst, custom
  Moegliche Stelle: »Wann Baukasten dich hinhält

Sobald aus dem Hobby oder Test ein echtes Business wird, kippt die Rechnung.«

- [ ] **Für welche Betriebe eine Website Zeitverschwendung ist** → `/journal/betriebe-die-keine-website-brauchen`
  Gemeinsame Begriffe: custom, investieren, empfehlungs, temporaere, planst, aufgesetzt
  Moegliche Stelle: »Custom"-Debatte ist meistens ideologisch: Freelancer bashen Baukästen, Baukasten-Anbieter bashen Freelancer.«

- [ ] **Neue Preise ab August 2026: Was sich ändert und warum** → `/journal/preiserhoehung-2026`
  Gemeinsame Begriffe: baukasten, integration, paket, sowieso, ehrliche, buchungssystem
  Moegliche Stelle: »Custom"-Debatte ist meistens ideologisch: Freelancer bashen Baukästen, Baukasten-Anbieter bashen Freelancer.«

---

## SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden

`/journal/seo-2026-google-und-ki` · SEO, Prozess · 08.08.2026

- [ ] **Google Business Profile richtig nutzen — die kostenlose SEO-Waffe die kaum jemand richtig einsetzt** → `/journal/google-business-profile-richtig-nutzen`
  Gemeinsame Begriffe: profile, bewertungen, bewertung, antworten, faktor, lokale
  Moegliche Stelle: »Die wichtigsten Hebel sind ehrlich gesagt seit Jahren dieselben — nur werden sie von den meisten kleinen Unternehmen immer noch nicht konsequent umgesetzt:

Google Business Profile — der wichtigste einzelne Faktor.«

- [ ] **Warum jede zufriedene Rückmeldung eine Chance ist — die Bewertungs-Strategie für kleine Betriebe** → `/journal/bewertungen-richtig-sammeln`
  Gemeinsame Begriffe: bewertungen, bewertung, antworten, signal, problem, meisten
  Moegliche Stelle: »Bewertungen — Google gewichtet Anzahl, Aktualität und Bewertung selbst.«

- [ ] **Website für Handwerker: 5 Dinge, die wirklich Kunden bringen** → `/journal/website-handwerker-was-wichtig`
  Gemeinsame Begriffe: heizungsbauer, region, suchen, oldenburg, aufgebaut, desto
  Moegliche Stelle: »„Heizungsbauer" reicht nicht; „Heizungsbauer in Bremen und Umgebung" ist der Unterschied zwischen Platz 20 und Platz 3.«

- [ ] **Die 5 teuersten Website-Fehler die ich immer wieder sehe** → `/journal/5-teuerste-website-fehler`
  Gemeinsame Begriffe: stadt, region, findet, auftauchst, lokales, suche
  Moegliche Stelle: »Regionale Signale auf der Website — Stadt und Region müssen in Titeln, Meta-Descriptions und Haupttexten stehen.«

---

## Wie lange dauert es, eine Website zu bauen? Der ehrliche Zeitplan

`/journal/wie-lange-dauert-eine-website` · Prozess, Preise · 05.08.2026

- [ ] **Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen** → `/journal/was-kostet-eine-website-2026`
  Gemeinsame Begriffe: agentur, freelancer, custom, baukasten, texte, haengt
  Moegliche Stelle: »Baukasten-Anbieter sagen „30 Minuten", Agenturen kalkulieren „3–6 Monate", Freelancer landen irgendwo dazwischen.«

- [ ] **Neue Preise ab August 2026: Was sich ändert und warum** → `/journal/preiserhoehung-2026`
  Gemeinsame Begriffe: agentur, tagen, baukasten, launch, kickoff, testen
  Moegliche Stelle: »Baukasten-Anbieter sagen „30 Minuten", Agenturen kalkulieren „3–6 Monate", Freelancer landen irgendwo dazwischen.«

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: agentur, tatsaechlich, woche, freelancer, runden, wenig
  Moegliche Stelle: »Baukasten-Anbieter sagen „30 Minuten", Agenturen kalkulieren „3–6 Monate", Freelancer landen irgendwo dazwischen.«

- [ ] **Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?** → `/journal/handgemacht-oder-wix-squarespace`
  Gemeinsame Begriffe: freelancer, custom, baukasten, dazwischen, hinhaelt, domain
  Moegliche Stelle: »Baukasten-Anbieter sagen „30 Minuten", Agenturen kalkulieren „3–6 Monate", Freelancer landen irgendwo dazwischen.«

---

## Website für Handwerker: 5 Dinge, die wirklich Kunden bringen

`/journal/website-handwerker-was-wichtig` · Handwerk, Prozess · 03.08.2026

- [ ] **Die 5 teuersten Website-Fehler die ich immer wieder sehe** → `/journal/5-teuerste-website-fehler`
  Gemeinsame Begriffe: region, sekunden, smartphone, kontaktseite, erneuerung, zoomen
  Moegliche Stelle: »Stadtteil)

Städte und Regionen die du regulär bedienst

Ob du auch außerhalb kommst und unter welchen Bedingungen

Beispiel: „Ansässig in Lemwerder, tätig in Bremen, Delmenhorst, Oldenburg und Bremerhaven.«

- [ ] **Website für Gastronomie: Atmosphäre, Speisekarte und was Gäste wirklich suchen** → `/journal/website-gastronomie-was-wichtig`
  Gemeinsame Begriffe: scrollen, funktionieren, anruf, sekunden, prominent, suchen
  Moegliche Stelle: »Sie scrollen nicht durch schöne Portfolios, lesen keine langen Über-Uns-Geschichten und vergleichen selten drei Angebote nebeneinander.«

- [ ] **Wie Websites manuelle Prozesse ablösen — Praxis-Beispiele aus meinen Projekten** → `/journal/manuelle-prozesse-ablosen`
  Gemeinsame Begriffe: formular, heizung, waermepower, telefon, lemwerder, meister
  Moegliche Stelle: »Kein „Kontaktseite → Formular → warten auf Antwort" — im Notfall ruft der Kunde jemand anderen an.«

- [ ] **SEO 2026: Wie kleine Unternehmen bei Google und ChatGPT gefunden werden** → `/journal/seo-2026-google-und-ki`
  Gemeinsame Begriffe: heizungsbauer, region, suchen, staedte, oldenburg, empfehlungen
  Moegliche Stelle: »Für Projekte außerhalb — kurze Anfrage, wir schauen."

Das spart dir und deinen Kunden nutzlose Anrufe („Kommen Sie auch nach XY?") und positioniert dich in Google-Suchen wie „heizungsbauer bremen" statt „heizungsbauer deutschland".«

---

## Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen

`/journal/was-kostet-eine-website-2026` · Preise, Prozess · 31.07.2026

- [ ] **Handgemachte Website oder Wix/Squarespace: Wann rechnet sich was?** → `/journal/handgemacht-oder-wix-squarespace`
  Gemeinsame Begriffe: custom, features, baukaesten, echtes, freelancer, baukasten
  Moegliche Stelle: »2.500 – 5.000 €: Website mit Online-Shop, Buchungsfunktion oder anderen Custom-Features.«

- [ ] **1.500 € für eine Website ist nicht wenig — es ist normal** → `/journal/1500-euro-website-ist-normal`
  Gemeinsame Begriffe: agentur, overhead, uebergabe, freelancer, selbststaendige, projektmanager
  Moegliche Stelle: »Was Agenturen kosten

Agenturen bieten Prozesssicherheit, aber sie kosten.«

- [ ] **Neue Preise ab August 2026: Was sich ändert und warum** → `/journal/preiserhoehung-2026`
  Gemeinsame Begriffe: bekommst, kalkuliert, individuelles, eigenes, agentur, baukasten
  Moegliche Stelle: »Frag zehn Anbieter, was eine Website kostet, und du bekommst zehn verschiedene Antworten.«

- [ ] **Wie lange dauert es, eine Website zu bauen? Der ehrliche Zeitplan** → `/journal/wie-lange-dauert-eine-website`
  Gemeinsame Begriffe: agentur, freelancer, custom, baukasten, texte, serioese
  Moegliche Stelle: »Was Agenturen kosten

Agenturen bieten Prozesssicherheit, aber sie kosten.«

---


80 offene Vorschlaege. Keiner davon ist Pflicht — ein erzwungener
Verweis ist schlechter als keiner.
