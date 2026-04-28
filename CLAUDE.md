# Tammo Studios — Repo Standing Instructions

## Git-Workflow

Nach JEDER abgeschlossenen Task automatisch committen und pushen —
ABER ausschließlich auf Feature-Branches, NIEMALS auf `main`.

### Vor jeder Task: Branch prüfen

Bevor du Files modifizierst, prüfe den aktuellen Branch:

    git branch --show-current

Wenn der Branch `main`, `master`, `prod` oder `production` ist:
STOPP. Modifiziere keine Files auf geschützten Branches. Sag dem
User, er soll erst auf einen Feature-Branch wechseln:

    git checkout -b feat/<beschreibender-name>

Wenn unsicher welcher Branch der "richtige" Feature-Branch ist:
einmal nachfragen, statt raten.

### Nach jeder Task: Commit + Push

Wenn die User-Task abgeschlossen ist und lokal funktioniert (Build
grün, keine TypeScript-Fehler):

1. Status prüfen:

       git status

2. Staging:

       git add .

3. Commit nach Conventional Commits Format:
   `type(scope): description`

   Erlaubte Types:
   - `feat`     — neue Features
   - `fix`      — Bug-Fixes
   - `style`    — visuelle/CSS-only Änderungen
   - `refactor` — Code-Umbau ohne Verhaltensänderung
   - `chore`    — Tooling, Deps, Config
   - `docs`     — Dokumentation

   Beispiele:
   - `feat(landing): add cinematic splash with grid + pulsing nodes`
   - `fix(nav): center logo on mobile under 768px`
   - `chore(deps): remove unused three.js dependency`

   Subject-Line max ~72 Zeichen. Bei komplexen Änderungen einen
   ausführlichen Body anhängen:

       git commit -m "feat(landing): cinematic splash" \
                  -m "Replaces three.js particles with CSS grid + canvas nodes."

   Sprache: Englisch im Subject, deutsche Begriffe im Body OK wenn
   sie direkt UI-Texte zitieren.

4. Push auf den aktuellen Branch:

       git push

   Falls kein Upstream gesetzt ist:

       git push -u origin "$(git branch --show-current)"

### Wann NICHT committen/pushen

- Branch ist `main`, `master`, `prod` oder `production`
- `npm run build` schlägt fehl
- TypeScript-Errors vorhanden (`npm run check` falls vorhanden)
- Tests schlagen fehl (falls Test-Setup existiert)

In allen diesen Fällen: NICHT committen, NICHT pushen. Stattdessen
das Problem an den User reporten.

### Granularität

- Eine Commit pro logischer Einheit. Wenn eine Task mehrere
  unabhängige Deliverables hat (z.B. "Nav bauen UND Mobile-Bug
  fixen"): zwei separate Commits.
- Falls die Task einen großen Refactor enthält: zuerst den
  Refactor committen, dann das neue Feature — saubere Historie.
- Keine "wip"-, "stuff"- oder "asdf"-Messages.

### Nach dem Push: Report

Nach erfolgreichem Push kurz an den User reporten:
- Auf welchen Branch gepusht wurde
- Den Commit-Hash (Short-Form, 7 Zeichen)
- Hinweis dass Vercel in ~30-60s einen Preview-Deploy bauen wird

Beispiel:

    > Pushed to feat/landing-v1 (a3f2c91). Vercel-Preview-Build
    > startet automatisch, neue URL in ~1 Min unter
    > tammostudios-git-feat-landing-v1-<user>.vercel.app

### Sonderfälle

- **Branch noch nicht auf Remote**: erstmaliger Push mit
  `git push -u origin <branch>` — Claude Code soll das selbst
  erkennen und entsprechend handeln.
- **Conflicts beim Push**: NICHT mit `--force` umgehen. Stattdessen
  `git pull --rebase` versuchen und bei echten Konflikten den User
  fragen.
- **Sensible Files**: niemals `.env`, `.env.local`, oder Files mit
  API-Keys committen. Falls solche Files versehentlich staged sind,
  vor dem Commit aus dem Index nehmen (`git restore --staged`).
