# Streaming Subscription Cost Tracker — MGT 3745 Final

**One sentence:** A simple streaming subscription dashboard for people who want to list their services, see their combined monthly spending, and track optional renewal dates.

**Application status:** HW5 prototype source and tests imported on November 11, 2026. **Final-repo deployment, database migration status, and new test run are not yet verified.**  
**Live API from HW5 (historical, not a verified final-project deployment):** https://mgt3745-hw4.mgt3745-hw4-giancarlo.workers.dev/entries  
**Hours spent on final-project port:** Not tracked yet.

## What the project does

Users can manually enter a streaming service, a monthly price, and optionally a renewal date; see their saved subscriptions and monthly total; and delete an entry. The browser talks to a Cloudflare Worker backed by a Cloudflare D1 SQLite database. This project deliberately does not access bank accounts or automatically cancel subscriptions.

**Privacy warning:** The current prototype has no authentication or per-user data separation. Every record is stored in one shared database, and anyone with the Worker URL could read, create, or delete entries. **Use fictional data only. Do not enter real account or private financial information.**

## Origin and scope

This final project reuses the [HW5 subscription tracker](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5), including its renewal-date feature, worker API, database schema/migration, and test suite. The HW5 README reports 7/7 API tests passing in October 2026; those historical results **do not** confirm the new repository passes after the port.

## See It Work

The [HW5 demonstration](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5#see-it-work) shows the prior prototype. Final-project GIF and live deployment URL have **not yet been produced**.

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

Serve `index.html` with VS Code Live Server on port 5500. The page points to `http://127.0.0.1:8787` when opened from localhost/127.0.0.1.

Run the API tests only once the local Worker is actually running:

```bash
API=http://127.0.0.1:8787 npm test
```

**Important:** The browser's non-local API URL in `app.js` still references the HW5 Worker. Before publishing the final site, deploy the new Worker with `npm run deploy`, replace `deployedApi` in `app.js` with the actual new deployed URL, confirm CORS allows the frontend origin, and run tests. No new Worker URL is claimed until the deployment has happened. The root `wrangler.toml` names the intended new Worker `mgt3745-final-subscriptions`.

For the sourcing audit's mandatory exit test, from a Cloudflare-authenticated Codespace run `npm run db:export`; inspect the backup locally, **never commit it**, and record the observed date and result in the audit. A schema/data backup can contain user data.

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
| Deployment notes (starter) | [docs/DEPLOY.md](docs/DEPLOY.md) |

## AI Use

HW5 records its use of Claude Code, bolt.new, and Google AI Studio in the original DDR files. ChatGPT with a GitHub connection was used on November 11, 2026 to transfer and organize the source files, identify a narrower runtime dependency set, review vendor information and create the sourcing audit. The copied tests have not been rerun in this session; human verification in Codespaces remains necessary.

**Milestone follow-up:** confirm package installation and warnings, audit packages, run the live tests, complete one exit test, deploy the new Worker and frontend, and record actual results before final grading.
