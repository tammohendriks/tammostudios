// Der Typ, der verhindert, dass die beiden Sprachdateien auseinanderlaufen.
//
// de.ts ist die Quelle der Wahrheit und wird `as const` deklariert.
// en.ts wird als Shape<typeof de> typisiert. Dadurch meldet der
// Typchecker drei Arten von Abweichung, die man sonst erst im Browser
// sieht:
//
//   fehlender Schluessel   → TS2741 Property '…' is missing
//   ueberzaehliger Schluessel → TS2353 '…' does not exist in type
//   andere Listenlaenge    → TS2322 Source has 2 element(s) but
//                            target requires 3
//
// Der letzte Fall ist der wichtige und der Grund fuer diese Datei.
// Ein handgeschriebenes Interface faengt ihn NICHT: dort waere
// `readonly string[]` der Typ, und eine deutsche Checkliste mit sieben
// Punkten neben einer englischen mit sechs waere typkorrekt.
//
// Er funktioniert, weil `as const` Arrays zu Tupeln macht und ein
// Mapped Type ueber ein Tupel dessen Laenge erhaelt.
//
// Literale werden bewusst aufgeweitet: 'Über' in de.ts darf in en.ts
// 'About' heissen, ohne dass der Typ den deutschen Text einfordert.

export type Shape<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : { [K in keyof T]: Shape<T[K]> };

/**
 * Ein Tupel gleicher Laenge wie T, in dem jeder Eintrag E ist.
 *
 * Fuer die Faelle, in denen eine Liste im Komponentencode zu einer
 * Liste im Woerterbuch passen MUSS, weil sie per Index aneinander
 * haengen. Ohne diese Bindung stand die Zusicherung nur im Kommentar,
 * und eine zusaetzliche Zeile im Woerterbuch fiel erst im Browser auf:
 * als Auswahl-Eintrag ohne Beschriftung oder als Verweis, der lautlos
 * verschwindet.
 *
 * T MUSS ein nackter Typ-Parameter sein. Stuende stattdessen direkt
 * `{ [K in keyof X['liste']]: E }` an der Verwendungsstelle, waere der
 * Mapped Type nicht homomorph: TypeScript bildete dann auch length,
 * toString und den Rest des Array-Prototyps mit ab und das Tupel waere
 * verloren.
 */
export type Gleichlang<T, E> = { [K in keyof T]: E };
