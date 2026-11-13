# TOOLS.md — Final Project Dependency Ledger

Checked on: 2026-11-11; deployment/test status updated 2026-11-12. For dated vendor links and evidence, see [Sourcing Audit](../docs/SOURCING-AUDIT.md). No credentials belong in this file.

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Wrangler 4.161.0 | Deploy and develop Cloudflare Worker; exact-pinned, npm audit 0 vulnerabilities after upgrade from 4.146.0 | Adopt | 2026-11-12 | npm tool $0; host charged separately | Replace CLI when replacing hosting |
| Cloudflare Workers and static assets | Deployed subscription API and dashboard (same origin) | Adopt | 2026-11-12 | Free: 100,000 requests/day | Move API to Node.js hosting |
| Cloudflare D1 | Stores subscription names, prices and renewal dates; shared unauthenticated data | Trial | 2026-11-12 | Free: 5M rows read/day, 100k written/day, 5 GB | Export SQL and migrate to SQLite |
| GitHub Pages (considered, not used) | Alternate static frontend; not the deployed host | Hold | 2026-11-12 | Free public-repo hosting | No migration needed; already hosted by Cloudflare Workers |
| GitHub | Source repository and history | Adopt | 2026-11-11 | Free plan $0 | Clone repo onto another git host |
| GitHub Codespaces | Node 22 development | Adopt | 2026-11-11 | GitHub Free personal example: 120 core-hours and 15 GB-month | Local VS Code and Node 22 |
| Live Server | Local browser preview | Adopt | 2026-11-11 | No paid API identified | Node/Python static server |
| Markdown Mermaid extension | Optional editor-only Markdown diagram preview in VS Code; not deployed | Hold | 2026-11-12 | Free editor extension; no paid app API | Use built-in/GitHub Markdown preview |
| GitHub Copilot extension | Optional editor assistant | Hold | 2026-11-11 | Plan dependent | Disable/remove extension |
| Claude Code (historical) | AI-assisted HW5 integration | Assess | 2026-11-11 | Not a runtime cost; plan-specific | Manual coding and tests |
| bolt.new (historical) | HW5 page generation | Hold | 2026-11-11 | Not verified | Edit shipped code directly |
| Google AI Studio (historical) | HW5 alternative builder | Hold | 2026-11-11 | Not verified | Edit shipped code directly |

## Trust boundaries
- Users' service names, monthly prices, and renewal dates cross from the browser to Cloudflare Workers and D1. **All entries are in one shared table without authentication.** Do not enter real, private subscription information.
- GitHub hosts public source/history; avoid any passwords, personal tokens, or database backups in commits.
- Codespaces holds authentication for deployment locally, not in the public repository.
- AI builders received code or context during previous homework. The deployed subscription app itself does not call an AI model.

## Revisit triggers
New user authentication requirements, vendor price/limit changes, a new package, a new external service, or a need to store real personal billing data.

## Deployment and demonstrated checks (2026-11-12)
- Final public URL: https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/ (Cloudflare Worker + 3 static assets).
- Local API: 7/7 tests passed; npm audit: 0 vulnerabilities after exact-pinned Wrangler upgrade; remote D1 contains `entries` table.
- User tested the production browser flow: save a fictional entry, reload and observe persistence, delete and observe updated monthly total.
- Exit demonstration: local D1 SQL export `backup.sql` (641 bytes), verified schema includes `CREATE TABLE entries (`. This does **not** verify remote data export or restore.
