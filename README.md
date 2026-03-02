# PyRex

A structured, interactive course for Python programmers learning regular expressions from scratch.

**Live app**: https://dennisdondergoor.github.io/pyrex/
**Local dev**: `python3 -m http.server 8002 -d docs` → http://localhost:8002

---

## About

PyRex teaches regex through hands-on challenges. Each level introduces a new concept, with reinforcement exercises and consolidation challenges that combine skills from earlier levels.

Sign in with GitHub to sync progress across devices. No account required to play — progress is saved locally in your browser.

## Curriculum

| Level | Topic | Challenges |
|-------|-------|------------|
| 1 | Literal Matches | 7 |
| 2 | The Dot | 8 |
| 3 | Character Classes | 10 |
| 4 | Quantifiers | 16 |
| 5 | Anchors | 11 |
| 6 | Shorthand Classes | 11 |
| 7 | Groups | 12 |
| 8 | Alternation | 10 |
| 9 | Named Groups | 8 |
| 10 | Lookaheads | 11 |

## Tech

- Vanilla JavaScript, HTML, CSS — no build tools
- Deployed from `docs/` via GitHub Pages
- Optional GitHub OAuth via Firebase — Firestore cloud sync
- See `CLAUDE.md` for architecture details
