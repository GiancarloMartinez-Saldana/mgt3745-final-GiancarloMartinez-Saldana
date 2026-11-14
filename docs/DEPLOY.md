# Final Project Deployment and Verification

**Date:** November 12, 2026  
**Status:** Cloudflare Worker and static website deployed; user tested live CRUD behavior with fictional data.

## Public URLs

- Website: https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/
- API: https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/entries
- Repo: https://github.com/GiancarloMartinez-Saldana/mgt3745-final-GiancarloMartinez-Saldana

The site and API share the same origin. Wrangler reads the root `wrangler.toml`, bundles `worker.js`, and serves `public/index.html`, `public/styles.css`, and `public/app.js` via `[assets]`.

## From a clean checkout

1. `npm ci`; verify `npx wrangler --version` and `npm audit`.
2. Authenticate via `npx wrangler login --device`; confirm the intended account with `npx wrangler whoami`.
3. Inspect the *existing* D1 database first: `npx wrangler d1 list` and `npx wrangler d1 execute mgt3745-entries --remote --command="SELECT name FROM sqlite_master WHERE type='table';"`. **Do not re-run schema or migrations when the table already exists.**
4. For local development: `npx wrangler d1 execute mgt3745-entries --local --file=schema.sql`, then `npm run dev`; browse the forwarded Codespaces port 8787.
5. In a second terminal, `API=http://127.0.0.1:8787 npm test`.
6. Deploy with `npm run deploy` after checking the correct Cloudflare account and remote D1 binding.
7. Verify the deployed page using **fictional demo entries only**. Create an entry, reload to confirm persistence, and delete it to confirm the monthly total updates.

## Results observed

- `npm audit` after Wrangler upgrade to **4.161.0**: **0 vulnerabilities**.
- Local Worker integration tests: **7 passed, 0 failed**.
- Local D1 export: `npx wrangler d1 export mgt3745-entries --local --output=backup.sql` succeeded; backup was 641 bytes and contained `CREATE TABLE entries (`. Do **not** commit the backup.
- Wrangler production deploy: uploaded **3 static files** and deployed `mgt3745-final-subscriptions`.
- Remote D1 query returned `entries`, along with `_cf_KV` and `sqlite_sequence`. This direct query clarified a misleading `0` table count shown earlier in `d1 list`.
- **User-confirmed production browser smoke test:** save fictional subscription, refresh and see it retained, delete it and see monthly total update.

## Limits and security

The existing Worker is **not authenticated**. Anyone who can reach the API can view, create, or delete shared records. Do not use real personal subscription or payment data. CORS is **not** user authentication.

Remote D1 export and restore have **not** been verified. The live renewal-date round-trip was not separately checked during the final smoke test. See [the sourcing audit](SOURCING-AUDIT.md) for vendor, exit, and risk evidence.

## Fresh post-documentation API verification — November 14, 2026

The owner reran `API=http://127.0.0.1:8787 npm test` against the running **local** Worker and shared the complete terminal output: **7 tests, 7 passed, 0 failed, 0 skipped**, total duration **713.171047 ms**. The reported cases cover creation-order GET; missing-text rejection; valid POST/GET persistence; nonpositive-price rejection; optional renewal-date storage/read-back; no-date save; and invalid-calendar-date rejection. This is a **new local test run**, not a production test or deployment. No rollback or remote D1 restoration was run. An updated `npm audit` result has not been supplied in this new check; the earlier November 12 result was 0 vulnerabilities.

## Rollback runbook — prepared November 14, 2026; NOT YET REHEARSED

**Decision boundary:** The currently deployed Worker is a fictional-data demo using the **same Cloudflare D1 database as HW5**. Rolling back Worker code changes neither persisted rows nor D1 schema. Never test rollback on the production URL merely to complete a checkbox; use a disposable Worker and test database, or obtain explicit owner approval with a safe maintenance window.

### Before any deployment

1. Check the correct account with `npx wrangler whoami`, the active project with `cat wrangler.toml`, and the available deployment history with `npx wrangler deployments list`.
2. Record a **known-good Worker version ID** and test the public `/` and `/entries` endpoints. The original successful production deployment was version `9b27aa21-31b1-4acb-b9a5-93b896dc4e1a`; do **not** assume that is still the most recent known-good state without checking.
3. Examine compatibility: does the target version have the same static assets, D1 binding, and columns? An older Worker might not understand newer data. Do not run remote schema/migration/restore as part of a blind rollback.
4. Keep `backup.sql` and any data export outside Git, outside AI tools, and away from a public URL. The previous 641-byte **local** export was a test artifact, not a verified remote recovery point.

### When rollback would be needed

Trigger a rollback if the latest Worker deployment causes **any required critical user operation to fail** after repeat verification: for example, GET `/entries` returns a 500, the page fails to load, or fictional test entries cannot be saved/retrieved. For a privacy incident or unauthorized access, **stop real-user use immediately**; reverting code alone cannot undo exposure.

### Approved rollback procedure (do not execute without approval)

1. Confirm a target version ID using `npx wrangler deployments list` and consult the Cloudflare dashboard's Workers & Pages → the Worker → Deployments history.
2. With explicit authorization, invoke `npx wrangler rollback <KNOWN_GOOD_VERSION_ID>` from the correct project/account, then confirm the version selection. **Do not run unqualified `wrangler rollback`** because it may choose a predecessor that does not include the same-origin site assets.
3. After completion, inspect `npx wrangler deployments status`; open the public Worker URL; GET `/entries`; manually exercise a **fictional** entry create/read/delete flow. Confirm the same origin still serves `index.html`, `app.js` and `styles.css`.
4. If the rollback fails, do **not** experiment with D1 migrations or overwrite customer data. Escalate/retain the demo-only stop condition and write down the exact error and time.

### Safe rehearsal plan (not executed)

Deploy two versions to a separate **disposable Worker + D1**, using synthetic records only. Verify first version, deploy a reversible UI-only change, roll back explicitly to the known-good version, verify the static site and API, and log elapsed time, version IDs, screenshots/logs and post-rollback behavior in [AUDIT.md](AUDIT.md). Only mark the rollback step **TESTED** after actually observing these results. The same procedure does **not** establish successful database restore.

**External documentation:** [Cloudflare rollback guidance](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) and [Wrangler deployment commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/).

## Pre-real-user guardrails and authorization

The [prospective DECISION-001](DECISION-001.md) was created **November 14, after the prior demo**. It freezes real/private-data rollout until all of these are demonstrated: **0** sensitive records before access controls; **0** unauthorized cross-user accesses or modifications; local API tests **7/7** (or complete replacement suite); **0** high/critical unresolved npm findings; and a successful disposable D1 restore with at least **1 synthetic record**. Treat the classroom deployment as a public fictional-data demonstration, **not** a real-user release. For future user tests, use synthetic data, count actual completions, and record consent and outcomes without names.

## Operations evidence log

| Date | Operation | Observed result | Evidence limits |
|---|---|---|---|
| 2026-11-12 | Local D1 export | Success; 641-byte SQL export contained `CREATE TABLE entries (` | Does **not** establish remote restore |
| 2026-11-12 | Live Worker and static assets | Deployment success; 3 assets; user verified create/reload/delete | Shared, unauthenticated D1; fictional data only |
| 2026-11-14 | Prepared rollback runbook | Commands and stop criteria documented | **No rollback or recovery rehearsal performed yet** |

