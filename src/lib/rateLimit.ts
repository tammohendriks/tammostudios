/**
 * Anfragen pro IP begrenzen — gemeinsam für alle Formular-Routen.
 *
 * WARUM GEMEINSAM: der Zähler stand vorher als modul-lokale Map in
 * kontakt.ts. Eine zweite Route hätte ihre eigene bekommen und damit
 * ihr eigenes Kontingent — ein Bot dürfte dann fünf Kontaktanfragen
 * UND fünf Skizzen-Anfragen pro Stunde stellen, also doppelt so viele
 * Mails auslösen wie gedacht. Eine Grenze, die sich mit jeder neuen
 * Route verdoppelt, ist keine Grenze.
 *
 * WAS DAS NICHT IST: ein verlässlicher Schutz. Die Map lebt im
 * Arbeitsspeicher einer Serverless-Funktion und überlebt keinen
 * Kaltstart; Vercel kann mehrere Instanzen parallel betreiben, jede
 * mit eigener Map. Gegen einen entschlossenen Angreifer hilft das
 * nicht. Gegen den üblichen Spam-Schwall genügt es, und es kostet
 * keine Infrastruktur. Wenn es einmal nicht mehr genügt, gehört der
 * Zähler nach Upstash oder Vercel KV — nicht in eine größere Map.
 */

/** Anfragen pro Fenster und IP, über alle Formulare zusammen. */
const MAX = 5;
const FENSTER_MS = 60 * 60 * 1000;

const zaehler = new Map<string, { anzahl: number; endetUm: number }>();

/**
 * Darf diese IP noch? Zählt bei Erlaubnis gleich mit hoch.
 *
 * @param ip Aus clientAddress. 'unknown' ist erlaubt und teilt sich
 *           dann ein Kontingent — besser als gar keine Grenze.
 */
export const limitPruefen = (ip: string): { erlaubt: boolean; erneutIn?: number } => {
  const jetzt = Date.now();

  // Abgelaufene Einträge wegräumen, sonst wächst die Map über die
  // Lebenszeit der Instanz hinweg mit jeder neuen IP.
  if (zaehler.size > 500) {
    for (const [schluessel, eintrag] of zaehler) {
      if (eintrag.endetUm <= jetzt) zaehler.delete(schluessel);
    }
  }

  const eintrag = zaehler.get(ip);
  if (!eintrag || eintrag.endetUm <= jetzt) {
    zaehler.set(ip, { anzahl: 1, endetUm: jetzt + FENSTER_MS });
    return { erlaubt: true };
  }
  if (eintrag.anzahl >= MAX) {
    return { erlaubt: false, erneutIn: Math.ceil((eintrag.endetUm - jetzt) / 1000) };
  }
  eintrag.anzahl += 1;
  return { erlaubt: true };
};
