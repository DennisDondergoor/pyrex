# PyRex

A structured, interactive course for Python programmers learning regular expressions from scratch.

**Live app**: https://dennisdondergoor.github.io/pyrex/
**Local dev**: `python3 -m http.server 8002 -d docs` → http://localhost:8002

---

## About

PyRex teaches regex through hands-on challenges. Each level introduces a new concept, with reinforcement exercises and consolidation challenges that combine skills from earlier levels.

Sign in with GitHub to sync progress across devices. No account required to play — progress is saved locally in your browser.

## Curriculum

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

## Tech

- Vanilla JavaScript, HTML, CSS — no build tools
- Deployed from `docs/` via GitHub Pages
- Optional GitHub OAuth via Firebase — Firestore cloud sync
- See `CLAUDE.md` for architecture details
