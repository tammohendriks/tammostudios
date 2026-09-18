---
title: 'Meine Tools: Astro, Sanity, Vercel — und was dahinter steckt'
slug: 'meine-tools-astro-sanity-vercel'
excerpt: 'Womit baue ich eigentlich? Kurze Übersicht über meinen technischen Werkzeugkasten — und warum genau diese Kombination für kleine Unternehmen sinnvoll ist.'
tags: ["Tools", "Prozess"]
publishedAt: '2026-09-09T09:00:00+02:00'
coverImageAlt: 'Aufgeräumter Entwickler-Schreibtisch mit Laptop, Notizbuch und Tasse Kaffee'
seoTitle: 'Meine Tools: Astro, Sanity, Vercel für Website-Projekte'
seoDescription: 'Warum Astro als Framework, Sanity als CMS und Vercel als Hosting eine starke Kombination für kleine Unternehmen sind — mit ehrlichen Vor- und Nachteilen.'
---

Eine der Fragen, die im Erstgespräch oft kommt: „Womit baust du das eigentlich?" Meistens interessiert die Antwort weniger für die technische Debatte, sondern für die praktische Frage: **wie gut kann ich später selbst pflegen, wie zuverlässig läuft die Website, und wer ist der Ansprechpartner wenn was klemmt?**

Meine Antwort ist immer dieselbe Kombination aus drei Kern-Tools: Astro als Framework, Sanity als CMS, Vercel als Hosting. Dazu ein paar unterstützende Werkzeuge, die den Alltag effizienter machen. Hier die Übersicht — mit ehrlichen Vor- und Nachteilen, damit du entscheiden kannst ob das Setup zu deinem Vorhaben passt.

## Astro — das Framework

Astro ist das, worauf die Website technisch aufbaut. Es ist ein modernes Framework, das speziell für inhaltsorientierte Websites entwickelt wurde — also genau für das, was kleine Unternehmen brauchen: schnelle Info-Seiten, Blog-Systeme, Landing Pages, Portfolio-Sites.

**Was Astro besonders macht:**

- **Extrem schnelle Ladezeiten.** Astro liefert standardmäßig statisches HTML mit minimalem JavaScript aus. Für Nutzer bedeutet das: Seite lädt sofort, auch auf schlechtem Handynetz.
- **Gute SEO-Basis.** Weil der Content direkt im HTML steht (nicht per JavaScript nachgeladen wird), können Suchmaschinen alles indexieren.
- **Zukunftssicher.** Astro wird aktiv weiterentwickelt, hat eine wachsende Community, wird auch von großen Unternehmen genutzt.

**Warum nicht z.B. WordPress?** Für dynamische Community-Plattformen mit vielen Nutzern und Kommentaren ist WordPress solide. Für die Websites, die ich baue (Unternehmenspräsentation, Landing Pages, kleine Shops), ist es überdimensioniert — mehr Wartungsaufwand, mehr Sicherheitslücken, langsamer.

**Warum nicht z.B. Next.js?** Next.js kann ähnliches wie Astro, ist aber komplexer und stärker auf React-Anwendungen ausgerichtet. Für die Projekte in meinem Portfolio ist Astro einfacher, schneller, direkter.

## Sanity — das CMS

Sanity ist das System, in dem du später deine Inhalte pflegst — Texte ändern, Bilder tauschen, Öffnungszeiten anpassen, neue Blog-Beiträge erstellen. Das eigentliche Rückgrat deiner Autonomie nach der Übergabe.

**Was Sanity besonders macht:**

- **Sehr flexibles Content-Modell.** Ich kann für jedes Projekt genau die Felder definieren, die du brauchst — nicht mehr, nicht weniger. Kein aufgeblähtes Backend mit 500 Optionen, die du nie nutzt.
- **Gutes Editor-Erlebnis.** Wer schonmal mit anderen CMS gearbeitet hat, weiß wie mühsam Content-Pflege sein kann. Sanity ist einer der besten Editor-Erlebnisse am Markt — intuitiv, schnell, ohne Wut-Momente.
- **Bild-Optimierung eingebaut.** Du lädst ein Bild einmal hoch — Sanity generiert automatisch alle nötigen Größen für Desktop, Mobile, Retina. Kein manuelles Rumtricksen.

**Der Nachteil:** Sanity ist ein externes System, für das ein Konto nötig ist. Das ist bei aller Praktikabilität ein zusätzlicher Login. Für die kleinen Betriebe die ich baue, ist das trotzdem der beste Kompromiss zwischen Autonomie und Komplexität.

## Vercel — das Hosting

Vercel ist der Ort, auf dem deine Website läuft. Kein selbstgehostetes Server-Setup, kein Wartungsaufwand für dich, keine Angst vor Ausfällen.

**Was Vercel besonders macht:**

- **99,99 % Uptime.** Vercel gehört zu den zuverlässigsten Hosting-Anbietern weltweit. Ausfälle sind extrem selten.
- **Sehr schnelle Auslieferung durch CDN.** Deine Website wird von Servern rund um die Welt ausgeliefert — für Besucher aus Deutschland bedeutet das minimale Ladezeit.
- **Automatische SSL-Zertifikate.** Sicherheit ist standardmäßig eingebaut, nichts zu konfigurieren.
- **Skaliert automatisch.** Wenn plötzlich viel Traffic kommt (weil dein Post viral geht, weil du in der Zeitung warst, wegen einer Marketing-Aktion), skaliert Vercel automatisch. Kein Absturz.

**Der Nachteil:** Vercel ist ein US-Unternehmen. Für DSGVO-sensible Projekte (Praxen, medizinische Kontexte) baue ich die Datenerfassung so, dass keine personenbezogenen Daten bei Vercel landen — die Formulardaten gehen direkt in DSGVO-konforme EU-Ablage (siehe [Prozesse ablösen](/journal/manuelle-prozesse-ablosen) am IBI-Beispiel).

## Warum die Kombination zusammen so gut funktioniert

Die drei Tools sind nicht zufällig meine Wahl — sie ergänzen sich sehr gut:

- **Astro** liefert schnelles, SEO-taugliches HTML aus
- **Sanity** liefert die Inhalte an Astro zur Build-Zeit
- **Vercel** hostet das Ergebnis mit maximaler Zuverlässigkeit

Wenn du im CMS etwas änderst, bekommt Vercel automatisch Bescheid, baut die Website neu, und deine Änderung ist innerhalb von 60 Sekunden live. Kein manueller Deploy, keine Wartezeit.

Für Handwerksbetriebe, Praxen und Gastronomie — die Kern-Zielgruppen die ich bediene — ist diese Kombi optimal. Schnell, zuverlässig, einfach zu pflegen, DSGVO-fähig, günstig im Betrieb.

## Modern Toolchain: Ja, auch KI

Zur Ehrlichkeit gehört: ja, ich arbeite auch mit KI-Assistenten. Ohne moderne Werkzeuge wären meine Umsetzungszeiten (14 Tage für eine Website, 30 Tage für einen Shop) nicht machbar — jedenfalls nicht zu diesen Preisen.

Wer nicht mit der Zeit geht, geht mit der Zeit. Wer heute noch jede Zeile Code komplett handschriftlich tippt, kann in dieser Preisliga schlicht nicht liefern. Meine Rolle ist: Konzept, Architektur, Design-Entscheidungen, Kunden-Kommunikation, letzte Handschrift, Qualitätskontrolle. Meine Verantwortung ist am Ende trotzdem meine — der Code läuft auf meinen Namen, die Ergebnisse verantworte ich, und was ausgeliefert wird, prüfe ich manuell durch.

Das ist nicht anders als bei jedem anderen modernen Handwerk. Ein Tischler nutzt heute auch elektrische Werkzeuge und nicht mehr nur Handhobel — die Handschrift und Qualitätskontrolle bleibt trotzdem seine. So ist es bei mir.

## Was die Wahl für dich bedeutet

Praktisch relevant für dich als Kunde:

- **Du kannst überall selbst pflegen.** CMS-Zugang, mobil bearbeitbar, keine Programmier-Kenntnisse nötig
- **Deine Site läuft schnell und zuverlässig.** Vercel-Hosting mit 99,99 % Uptime, keine Wartungsanfälligkeit
- **Du bist nicht abhängig.** Alle Zugänge sind bei dir, kein Vendor-Lock-in
- **Skalierbar, wenn dein Business wächst.** Von 10 Besuchern pro Monat bis 10.000 pro Tag — dasselbe Setup hält mit
- **DSGVO-fähig.** Auch für medizinische und andere sensible Kontexte

Und für die technisch Interessierten unter meinen Kunden: der Code ist modern, sauber, wartungsfähig. Falls du später mit einem anderen Entwickler weitermachen willst, findet er sich schnell zurecht. Kein proprietäres Klumpensystem.

## Fazit

Tools sind Werkzeuge — die Substanz kommt vom Menschen dahinter. Ich könnte dieselbe Kombination anders einsetzen, ich könnte andere Kombinationen wählen — was am Ende zählt, ist ob das Ergebnis dein Geschäft weiter bringt.

Meine Kombination aus Astro, Sanity und Vercel ist bewährt, für kleine Unternehmen gut geeignet, und macht deine spätere Autonomie zum Standard. Das ist mir wichtiger als jede technische Debatte.

Wenn du überlegst, ob so eine Website für dich Sinn macht: [Preisrechner öffnen](/preisrechner) für eine schnelle Kalkulation oder direkt [30 Minuten Erstgespräch buchen](/kontakt). Wir sprechen konkret über dein Vorhaben — und ich sag dir ehrlich, ob mein Setup zu deinem Projekt passt oder ob was anderes besser wäre.
