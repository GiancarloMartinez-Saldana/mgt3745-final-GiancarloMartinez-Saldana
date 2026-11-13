# Streaming Subscription Cost Tracker — MGT 3745 Final

**One sentence:** A simple streaming subscription dashboard for people who want to list their services, see their combined monthly spending, and track optional renewal dates.

**Application status:** Cloudflare Wrangler successfully deployed the final-project Worker and three static assets on November 12, 2026. Seven local Worker API tests passed and `npm audit` found zero vulnerabilities after updating Wrangler to 4.161.0. **Remote D1 presence verified:** `wrangler d1 execute mgt3745-entries --remote --command="SELECT name FROM sqlite_master WHERE type='table';"` returned the `entries` table, despite `wrangler d1 list` previously displaying zero in its table-count column. **Live browser smoke test passed (user-verified November 12, 2026): create a fictional subscription, refresh to confirm persistence, and delete it with the total updated.**  
**Final-project deployed website:** https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/  
**Final-project API endpoint:** https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/entries  
**Live API from HW5 (historical):** https://mgt3745-hw4.mgt3745-hw4-giancarlo.workers.dev/entries  
**Hours spent on final-project port:** Not tracked yet.

## What the project does

Users can manually enter a streaming service, a monthly price, and optionally a renewal date; see their saved subscriptions and monthly total; and delete an entry. The browser talks to a Cloudflare Worker backed by a Cloudflare D1 SQLite database. This project deliberately does not access bank accounts or automatically cancel subscriptions.

**Privacy warning:** The current prototype has no authentication or per-user data separation. Every record is stored in one shared database, and anyone with the Worker URL could read, create, or delete entries. **Use fictional data only. Do not enter real account or private financial information.**

## Origin and scope

This final project reuses the [HW5 subscription tracker](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5), including its renewal-date feature, worker API, database schema/migration, and test suite. The HW5 README reports 7/7 API tests passing in October 2026. The transferred final repository was **independently retested** on November 12, 2026: **7/7 local API tests passed**.

## See It Work

The [HW5 demonstration](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5#see-it-work) shows the prior prototype. The final-project Worker and frontend were deployed to https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/ (Wrangler confirmed upload of three static files). **The remote `entries` table exists, and user-reported live browser smoke tests passed for create, persistence after refresh, and delete with updated total (November 12, 2026).** The temporary Codespaces preview worked using Wrangler's same-origin static assets on port 8787.

## How to run the transferred project

From a fresh Codespace, in repository root:

```bash
npm ci
npm ls --all
npm audit
npx wrangler login --device
```

The `wrangler.toml` file points to the **existing HW5 D1 database**. Do not run `npm run db:schema` and `npm run db:migrate` blindly against that production database: the renewal-date migration has already been documented as executed for HW5, and attempting it twice can fail. Inspect the current schema first. Use a local D1 database for experiments.

For a local sandbox, run:

```bash
npx wrangler d1 execute mgt3745-entries --local --file=schema.sql
npm run dev
```

The Worker now serves the dashboard and API together from **port 8787** (configured with `[assets] directory = "./public"` in `wrangler.toml`). Open the Codespaces forwarded port 8787 in a browser rather than using Live Server on port 5500. The same-origin setup avoids cross-port browser authorization issues.

Run the API tests only once the local Worker is actually running:

```bash
API=http://127.0.0.1:8787 npm test
```

**Deployment note:** The final-project Worker and static dashboard are **already deployed** to the URL above. The deployed `public/app.js` calls the Worker API on its **same origin**, so it does not use the historical HW5 fallback URL for this public website. Its fallback `deployedApi` constant remains for pages opened from other unrecognized hosts; do not use that URL to verify the final deployment. The remote D1 database is the same database previously configured for HW5; the `entries` table exists. Use fictional data only.

**Exit step verified on November 12, 2026 (Central):** `npx wrangler d1 export mgt3745-entries --local --output=backup.sql` succeeded; the resulting 641-byte file contained `CREATE TABLE entries (`. This proves the **local D1 export step only**, not a remote export or restored database. Do not commit `backup.sql`.

## The Record

| Artifact | Link |
|---|---|
| Problem and measures | [context/PROJECT.md](context/PROJECT.md) |
| Users and jobs | [context/USERS.md](context/USERS.md) |
| Features and EARS rows | [context/FEATURES.md](context/FEATURES.md) |
| Architecture | [context/ARCHITECTURE.md](context/ARCHITECTURE.md) |
| Final project decision | [docs/ADR-001.md](docs/ADR-001.md) |
| **Sourcing Audit** | **[docs/SOURCING-AUDIT.md](docs/SOURCING-AUDIT.md)** |
| **Dependency ledger** | **[context/TOOLS.md](context/TOOLS.md)** |
| Historical HW5 evaluations | [context/EVALS.md](context/EVALS.md) |
| AI delegation log | [docs/DDR-LOG.md](docs/DDR-LOG.md) |
| Historical HW5 delegation | [HW5 DDRs](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/tree/main/docs) |
| **Deployment steps and verification** | [docs/DEPLOY.md](docs/DEPLOY.md) |
| **Deployment decision** | [docs/ADR-002.md](docs/ADR-002.md) |

## AI Use

HW5 records its use of Claude Code, bolt.new, and Google AI Studio in the original DDR files. ChatGPT with a GitHub connection was used on November 11, 2026 to transfer and organize the source files, identify a narrower runtime dependency set, review vendor information and create the sourcing audit. The user subsequently ran the copied tests in Codespaces against the local Worker and reported **7 passed, 0 failed**; npm audit returned **0 vulnerabilities** after the Wrangler update. A local D1 export was also verified.

**Verification summary (Nov 12, 2026):** `npm audit` returned 0 vulnerabilities; local API `npm test` reported 7 passed/0 failed; a local D1 database export succeeded; the remote `entries` table exists; Wrangler deployed the final Worker and 3 static assets; the user manually verified live create, reload/persistence, and delete with the monthly total updating. Not yet independently checked: a live renewal-date round trip, remote database export/restore, and new GIF/video demo.
