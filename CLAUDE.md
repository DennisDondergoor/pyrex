# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

- **Local dev**: `python3 -m http.server 8002 -d docs` → http://localhost:8002
- **Production**: https://dennisdondergoor.github.io/pyrex/
- **Git repo**: https://github.com/DennisDondergoor/pyrex
- **Firebase project**: `pyrex-cee7c` — GitHub OAuth, Firestore cloud sync

## Development

```bash
python3 -m http.server 8002 -d docs
# Open http://localhost:8002
```

No build step, no package manager, no tests. Static site served from `docs/`.

## Architecture

Single-page app with view toggling (`active` class on `<section>` elements). All source in `docs/`:

- **index.html** — Views: home (level grid), challenge, result. Confirmation modal for reset.
- **style.css** — All styles. Same CSS variables as PyLens: `#000` bg, `#111` cards, `#333` borders, `#4a9eff` accent, Source Code Pro font.
- **challenges.js** — `LEVEL_CONCEPTS` object (keyed 1–10, multi-paragraph strings shown on the concept intro screen). `CHALLENGES` array (global). Each object: `id`, `level`, `title`, `instruction`, `testString`, `solution` (regex pattern string), `explanation`, `hint`.
- **app.js** — IIFE module. Handles view routing, regex matching, live highlights, progress storage, Firebase auth/sync.
- **firebase.js** — `FirebaseSync` class. GitHub OAuth via popup, Firestore flat path `users/{uid}`, debounced save (2s), keepalive flush on page hide.

## Key Flows

**Home → Challenge:** Click a level card → `startLevel(n)` filters challenges by level. On first visit (no progress) sets `currentIndex = -1` and shows the concept intro screen (`showConceptScreen()`). On return visits, jumps to the first unsolved challenge (or last if all solved).

**Challenge → Result:** User types pattern in `/…/g` input, live highlights update on `input` event. Submit compares user's matches (value + index) against solution's matches. Calls `showResult(correct, challenge)`.

**Result → Next:** "Next Challenge" increments `currentIndex` and calls `showChallenge()`. On last challenge, goes back to home.

## Keyboard Shortcuts

| Key | Context | Action |
|-----|---------|--------|
| `Enter` | Challenge input | Submit answer |
| `Enter` | Result (wrong) | Try Again |
| `Enter` | Result (correct) | Next Challenge / Back to Levels |
| `Escape` | Challenge | Back to home |
| `Escape` | Result | Back to challenge |
| `Escape` | Reset modal | Close modal |

## Regex Matching Logic

- Both user pattern and solution pattern run with `/g` flag via `new RegExp(pattern, 'g')`
- Match comparison: same count, same `value` and `index` for every match (order-sensitive)
- Invalid regex while typing: silently shows no matches. On submit: treated as a wrong answer (shows result screen with "Not quite.")
- Zero-length match guard: `lastIndex` is incremented and a safety cap of 500 iterations prevents infinite loops

## Storage

**localStorage**: single key `pyrex_progress` — object keyed by challenge `id`, value `{ solved: bool, attempts: number }`.

**Firestore**: `users/{uid}` document, field `progress` with the same shape. Merge on sign-in: `solved: local || cloud`, `attempts: max(local, cloud)`.

## Challenge Data Format

```js
{
    id: 'lit-1',           // unique, format: '{topic-abbr}-{n}'
    level: 1,              // 1-10
    title: 'Match a word',
    instruction: "Match every occurrence of the word 'cat'.",
    testString: 'The cat sat on the mat. That fat cat!',
    solution: 'cat',       // regex pattern string (no slashes, no flags)
    explanation: "...",    // shown in result view
    hint: "Type the word exactly as it appears."
}
```

**Important**: In `solution`, write `\\d`, `\\b`, `\\w`, `\\s` etc. (double-backslash) so the JS string contains a literal backslash — the regex engine then interprets it correctly.

## Mobile Focus Rule

`app.js` exposes `isTouchDevice()` (`window.matchMedia('(pointer: coarse)')`). Any navigation-triggered `input.focus()` call must be guarded with `!isTouchDevice()` to prevent iOS Safari from auto-zooming when the user moves between challenges. Focus calls that are direct responses to user interaction (e.g. char picker insertion, empty-submit feedback) are exempt.

## Adding New Challenges

1. Open `docs/challenges.js`
2. Add a new object to the `CHALLENGES` array at the correct level position
3. Verify the `solution` pattern actually produces the expected matches against `testString`
4. Test locally: start a server, open that level, check the live highlighting and submit

**Important**: challenge `id` values are localStorage keys — never rename them or existing user progress will break. The array order (not the id numbers) determines presentation order within a level.

## Levels

| Level | Topic |
|-------|-------|
| 1 | Literal Matches |
| 2 | The Dot |
| 3 | Character Classes |
| 4 | Quantifiers |
| 5 | Anchors |
| 6 | Shorthand Classes |
| 7 | Groups |
| 8 | Alternation |
| 9 | Named Groups |
| 10 | Lookaheads |
