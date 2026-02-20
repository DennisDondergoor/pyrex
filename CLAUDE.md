# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Quick Reference

- **Local dev**: `python3 -m http.server 8002 -d docs` → http://localhost:8002
- **Production**: https://dennisdondergoor.github.io/pyrex/
- **Git repo**: https://github.com/DennisDondergoor/pyrex
- **No Firebase** — client-side only, localStorage for progress

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
- **challenges.js** — `CHALLENGES` array (global). Each object: `id`, `level`, `title`, `instruction`, `testString`, `solution` (regex pattern string), `explanation`, `python` (code snippet), `hint`.
- **app.js** — IIFE module. Handles view routing, regex matching, live highlights, progress storage.

## Key Flows

**Home → Challenge:** Click a level card → `startLevel(n)` filters challenges by level, sets `currentIndex = 0`, calls `showChallenge()`.

**Challenge → Result:** User types pattern in `/…/g` input, live highlights update on `input` event. Submit compares user's matches (value + index) against solution's matches. Calls `showResult(correct, challenge)`.

**Result → Next:** "Next Challenge" increments `currentIndex` and calls `showChallenge()`. On last challenge, goes back to home.

## Regex Matching Logic

- Both user pattern and solution pattern run with `/g` flag via `new RegExp(pattern, 'g')`
- Match comparison: same count, same `value` and `index` for every match (order-sensitive)
- Invalid regex: input border turns red, error label shown, submit blocked

## localStorage

Single key: `pyrex_progress` — object keyed by challenge `id`, value `{ solved: bool, attempts: number }`.

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
