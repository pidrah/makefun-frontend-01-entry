# Fieldnotes for make.fun

A lightweight, read-only frontend for exploring live make.fun competitions, competition details, leaderboards, and public builder profiles. It uses the public JSON API directly and ships as static HTML, CSS, and JavaScript modules with no build step or external code dependencies.

[![make.fun bounty](https://make.fun/badge/makefun-frontend-01.svg)](https://make.fun/bounty/makefun-frontend-01) [![Rank](https://make.fun/badge/makefun-frontend-01/pidrah/makefun-frontend-01-entry/rank.svg)](https://make.fun/bounty/makefun-frontend-01) [![Reward](https://make.fun/badge/makefun-frontend-01/pidrah/makefun-frontend-01-entry/reward.svg)](https://make.fun/bounty/makefun-frontend-01)

## Run locally

Use Node.js 22 or later. Serve the contents of `app/` at the web root:

```sh
node serve.ts
```

Then open [http://localhost:8080](http://localhost:8080). Hash routes work directly and through browser history:

- `#/` — open bounties, search, and category filters
- `#/bounty/<slug>` — competition brief, live prize table, dates, status, and rules
- `#/bounty/<slug>/leaderboard` — live standings
- `#/profile/<handle>` — public builder profile and entries

The dossier hand-in can be checked locally with:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

MIT licensed. Live data comes from `https://make.fun/api`.
