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
