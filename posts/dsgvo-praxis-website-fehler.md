---
title: '10 DSGVO-Fehler, die ich auf Praxis-Websites ständig sehe'
slug: 'dsgvo-praxis-website-fehler'
excerpt: 'Google Fonts extern geladen, mailto-Links statt Kontaktformular, Analytics ohne Consent, Cookie-Banner mit versteckten Ablehnen-Buttons. Ein Praktiker-Bericht aus der Arbeit mit Praxen in Bremen und Umgebung — plus wie es wirklich DSGVO-konform geht.'
tags: ['Praxis', 'Prozess']
publishedAt: '2026-11-02T09:00:00+01:00'
coverImageAlt: 'Laptop mit geöffneter Praxis-Website auf einem hellen Schreibtisch'
seoTitle: '10 DSGVO-Fehler auf Praxis-Websites 2026 | Tammo Studios'
seoDescription: 'Die häufigsten DSGVO-Fehler auf Arzt-Websites: Google Fonts, mailto-Links, fehlende AVVs. Konkrete Beispiele aus Praxis-Projekten in Bremen.'
---

Wenn ich mir Praxis-Websites in Bremen und Umgebung angucke, sehe ich fast immer dieselben DSGVO-Fehler. Nicht Kleinigkeiten, die ein Datenschutzbeauftragter in der nächsten Jahresprüfung meckert — sondern Dinge, die sofort auffallen und die ein geübtes Patientenauge bemerkt.

Und das ist der eigentliche Punkt. Eine schlecht gebaute Website führt direkt zu dem Eindruck: wenn die den digitalen Außenauftritt nicht sauber hinbekommen, wie läuft dann der Datenschutz hinter den Kulissen? Patienten vertrauen ihrer Praxis sensible Daten an — Vorerkrankungen, Medikamente, Diagnosen. Die Erwartung ist nicht nur rechtlich gefordert, sondern menschlich: dass hier sorgfältig gearbeitet wird.

Hier die zehn Fehler, die ich am häufigsten sehe. Und für jeden: wie wir es bei den Praxen machen, für die ich gebaut habe.

## 1. Google Fonts extern eingebunden

Fast jede Praxis-Website lädt Schriftarten direkt von Googles Servern. Das klingt harmlos — ist aber ein DSGVO-Fallstrick. Beim Abruf einer Google Font wird die IP-Adresse des Nutzers an einen US-Server übermittelt, ohne Einwilligung. Das Landgericht München hat dazu 2022 ein klares Urteil gesprochen: 100 € Schmerzensgeld pro Betroffenem, abmahnfähig.

Die Lösung: Fonts selbst hosten. Du lädst die Font-Dateien einmal auf Deinen Server und bindest sie lokal ein. Technisch ein Zehn-Minuten-Fix, DSGVO-mäßig ein No-Brainer.

## 2. Google Analytics ohne vernünftigen Consent

Analytics-Scripts, die direkt beim Seitenaufruf feuern, bevor der Nutzer dem Cookie-Banner überhaupt begegnet ist. Oder noch schlimmer: Cookie-Banner mit vorangeklickten Checkboxen. Das ist nicht nur DSGVO-widrig, das war seit der ePrivacy-Richtlinie nie legal.

Bei IBI und Samedos nutzen wir aktuell gar kein Analytics. Nicht aus Prinzip, sondern weil die Praxen die Zahlen schlicht nicht brauchen. Die relevante Metrik ist: wie viele Anfragen kommen pro Monat über die Website rein? Das sieht die Praxis direkt am Posteingang.

## 3. Kontaktformulare, die an Gmail-Adressen gehen

Ein Praxis-Kontaktformular, das die Daten an eine `info@praxis.gmail.com`-Adresse schickt. Oder noch häufiger: ein `mailto:`-Link, der den E-Mail-Client des Nutzers öffnet, inklusive aller Metadaten die der Browser mitschickt.

`mailto:` ist aus zwei Gründen schlecht. Erstens kannst Du die Daten nicht validieren — da kommt rein was der User tippt, auch Angriffs-Payloads oder Spam. Zweitens funktioniert `mailto:` auf vielen Smartphones nicht sauber: öffnet mal Gmail, mal die iOS-Mail-App, mal gar nichts. Der Patient klickt und nichts passiert.

Mein Standard: serverseitige Formular-Verarbeitung mit Zod-Validation und Mail-Versand über Resend. Was in das Formular reinkommt, ist strukturiert, geprüft und wird kontrolliert verschickt.

## 4. Cookie-Banner mit versteckter Ablehnen-Option

Der klassische Banner: „Alle akzeptieren" als großer blauer Button, „Einstellungen" oder „Ablehnen" als winziger grauer Textlink. Das ist seit dem Planet49-Urteil des EuGH explizit nicht mehr erlaubt — die Ablehnung muss genauso einfach sein wie die Zustimmung.

Mein Setup bei IBI und Samedos: ein eigener, minimalistischer Consent-Banner. Zwei gleich prominente Buttons, keine Dark Patterns, keine „berechtigtes Interesse"-Tricks. Ohne Einwilligung werden Google Maps und ähnliche Fremddienste nicht geladen — der Nutzer sieht einen Platzhalter mit „Karte anzeigen"-Button, der das iframe erst nach Klick aktiviert.

Kein Cookiebot, kein Usercentrics. Weil ich die Kontrolle über das Verhalten behalten will und keine zusätzlichen Lizenzkosten dem Kunden aufdrücke.

## 5. Google Maps direkt eingebunden

Die Kontakt-Seite mit Google Maps iframe, das sofort beim Laden Google-Cookies setzt und die IP an die USA sendet. Standard-Fehler, weil es so bequem ist: `<iframe src="google.com/maps/...">` reinkopieren, fertig.

Richtig geht das mit einem Platzhalter: statisches Bild der Karte (von Mapbox oder einem anderen EU-Dienst), darüber ein „Karte interaktiv anzeigen"-Button. Wer klickt, lädt das Google-iframe und akzeptiert damit implizit die Google-Cookies. Wer nicht klickt, sieht trotzdem wo die Praxis ist.

## 6. Keine Transparenz zum Hosting-Standort

In der Datenschutzerklärung steht „gehostet bei All-Inkl" oder nichts dazu. Dabei interessiert das moderne Patienten durchaus: wo liegen die Daten?

Bei unseren Praxen liegt die Rechenleistung in Frankfurt — Vercel mit `regions: ["fra1"]` in der Konfig festgelegt. Die statischen Seiten liefert Vercels CDN weltweit, aber die Verarbeitung der Formular-Daten passiert ausschließlich in Frankfurt. In der Datenschutzerklärung steht das explizit, mit Verweis auf das DPA und die EU-Standardvertragsklauseln von Vercel.

Wenn ein Kunde explizit einen EU-eigenen Hoster will — Hetzner Nürnberg zum Beispiel — kein Problem. Dann wird die Developer Experience etwas sperriger (keine Serverless Functions, aufwändigere Deploys), aber machbar. Bisher hat das keiner meiner Kunden gebraucht.

## 7. Keine AVV-Dokumentation für die eingesetzten Dienste

Jede moderne Praxis-Website nutzt mehrere Dienstleister: Hoster, Mail-Versand, vielleicht ein CMS. Jeder dieser Dienste ist Auftragsverarbeiter nach Art. 28 DSGVO und braucht einen AVV. Verantwortlich für den Abschluss ist formal der Praxis-Inhaber, nicht der Webdesigner.

Trotzdem: der Webdesigner muss liefern, welche Dienste eingesetzt werden. Bei meinen Projekten übergebe ich dem Kunden zum Launch eine Liste aller Auftragsverarbeiter mit Links zu den jeweiligen DPAs. Bei einer typischen Praxis sind das: Vercel (Hosting + Functions), Resend (E-Mail), Sanity (CMS), Keyweb (E-Mail-Postfach der Praxis). Der Kunde schließt die AVVs selbst ab — meist Online-Zustimmung beim Service-Account — und ich dokumentiere was eingesetzt wird.

## 8. Formular-Daten in Datenbanken speichern „weil man ja mal nachschauen muss"

Viele Formular-Lösungen speichern die Anfragen automatisch in einer Datenbank — nebenbei, als „Komfort-Feature". Das ist DSGVO-mäßig ein Problem: Du speicherst personenbezogene Daten länger als nötig, musst eine Lösch-Routine einrichten, musst bei Auskunftsanfragen Zugang bieten.

Bei IBI speichern wir Formular-Daten nicht persistent. Der Weg einer Anfrage:

1. Nutzer füllt das Formular aus → serverseitiger Astro-Handler
2. Anti-Spam-Prüfung (verstecktes Honeypot-Feld, Timing-Guard, Format-Validation)
3. Server-Validation via Zod
4. On-the-fly PDF-Generierung via pdf-lib
5. Notification-Mail an `anfrage@ibi-doc.de` mit PDF-Anhang via Resend
6. Bestätigungs-Mail an den Absender via Resend
7. Nutzer-Redirect auf die Erfolg-Seite

Keine Datenbank-Persistierung, keine Zwischenspeicherung. Die PDF liegt nur im Mail-Postfach der Praxis. Die Praxis wendet ihre normale Mail-Retention-Policy an — fertig.

Wenn jemand eine DSGVO-Auskunftsanfrage stellt, ist die Antwort einfach: „Wir speichern keine Daten über Sie außer der Formular-Mail, die bei Löschungs-Wunsch im Postfach gelöscht wird."

## 9. Fehlender Consent-Check im Formular selbst

Das Formular hat eine Textzeile „Wir behandeln Ihre Daten vertraulich" und keinen Pflicht-Checkbox. Oder noch häufiger: eine Checkbox mit „Ich habe die Datenschutzerklärung gelesen" — die niemand liest.

Bei IBI hat jedes Formular eine DSGVO-Checkbox als Pflichtfeld — ohne Haken geht die Anfrage nicht raus. Bei Verbraucher-Kontext (Selbstzahler-Pfad, Privatpersonen) kommen zusätzliche Checkboxen hinzu: Widerrufsrecht nach § 356 BGB, Hinweis auf Verbraucher-Rechte. Alle Consents werden in der PDF-Beilage und in der Notification-Mail dokumentiert, damit die Zustimmung später nachvollziehbar bleibt.

Falls es jemals zu einer Prüfung kommt: wir können jeden Konsens einem konkreten Zeitpunkt und einer konkreten Erklärung zuordnen.

## 10. Mitarbeiterfotos ohne dokumentierte Einwilligung

Team-Seite mit sechs Portraits, zusammengestellt vom Praxisinhaber über die Jahre. Einige der Fotos sind von Mitarbeitenden, die längst nicht mehr da sind. Andere wurden nie offiziell für die Veröffentlichung freigegeben.

Mitarbeiter-Fotos brauchen eine Einwilligung nach Art. 7 DSGVO. Schriftlich, dokumentiert, mit klarem Hinweis dass die Einwilligung jederzeit widerrufen werden kann. Praktisch: ich baue das CMS so, dass Mitarbeiter-Fotos schnell einzeln entfernt werden können — ohne dass die Praxis mich anrufen muss. Wenn jemand das Team verlässt oder seine Einwilligung widerruft, löscht die Praxis das Foto selbst im Studio. Fertig.

## Bonus: Payload-Recovery-Logs mit Gesundheitsdaten

Ein Punkt, der nicht in der Standard-Checkliste steht, aber den ich erwähnen will. Bei IBI haben wir ein Payload-Recovery-System: wenn der Mail-Versand mal fehlschlägt — Resend down, Netzwerk-Hickup — schreiben wir die Formular-Daten temporär in die Vercel-Logs, damit nichts verloren geht. Die Praxis kriegt dann eine Alert-Mail mit den Daten und kann manuell reagieren.

Technisch sauber. Datenschutz-mäßig heikel: die „gewünschten Untersuchungen" in den IBI-Formularen sind Gesundheitsdaten nach Art. 9 DSGVO — besonders schützenswert. Vercel-Log-Retention ist auf 24 Stunden begrenzt, aber das haben wir in der Datenschutzerklärung explizit dokumentieren müssen. Auch Dev-Tooling-Entscheidungen haben rechtliche Dimension.

Für Dich als Praxisinhaber heißt das: Frag Deinen Entwickler, ob und wie Formular-Daten im Fehlerfall temporär gespeichert werden. Wenn die Antwort „weiß nicht" lautet, ist das ein Problem.

## Und noch kurz: Werbeverbot

Nicht DSGVO, aber eng verbunden. Für Ärzte gilt das Heilmittelwerbegesetz (§ 10, 11 HWG): keine Erfolgs-Garantien, keine Vorher-Nachher-Fotos, zurückhaltende Formulierung bei Behandlungs-Beschreibungen. Für Praxis-Websites bedeutet das konkret: keine Marketing-Superlative, kein Vergleich mit Mitbewerbern, keine „beste Praxis Bremens"-Formulierungen.

Bei IBI haben wir das durchgezogen: sachliche Beschreibungen der Leistungen, Fakten zu Qualifikationen, keine Steigerungsformen. Fühlt sich erst wie Einschränkung an — hat aber den Nebeneffekt, dass die Website seriöser wirkt. Patienten wollen keine Werbung, Patienten wollen Vertrauen.

## Was Du jetzt tun kannst

Wenn Deine Praxis-Website mindestens einen der zehn Fehler aufweist, bist Du in guter Gesellschaft. Die Mehrheit der Praxis-Websites hat mehrere davon. Trotzdem lohnt sich der Fix:

Erstens rechtlich. Abmahnrisiken bei Google Fonts, Analytics, mailto-Links — alles dokumentiert in deutscher Rechtsprechung.

Zweitens Vertrauen. Patienten merken intuitiv ob eine Website sauber gebaut ist. Eine Praxis, die beim digitalen Außenauftritt sorgfältig ist, wirkt auch sonst sorgfältig.

Drittens Zukunftssicherheit. DSGVO wird nicht entspannter. KI-Regulierung, Health-Data-Spaces, neue Richtlinien zu Patientendaten — das alles baut auf dem bestehenden Datenschutz-Fundament auf. Wer heute aufräumt, hat es morgen leichter.

Falls Du Deine Praxis-Website prüfen lassen willst oder eine neue brauchst: [30-Minuten-Erstgespräch buchen](/kontakt). Kostenlos, unverbindlich. Ich schaue mir die aktuelle Site an und sag Dir ehrlich, was dran ist und was nicht.

Konkrete Praxis-Referenzen findest Du unter [Referenzen](/referenzen) — die beiden Medizin-Projekte (IBI, Samedos) sind beide mit dem oben beschriebenen DSGVO-Setup gebaut.
