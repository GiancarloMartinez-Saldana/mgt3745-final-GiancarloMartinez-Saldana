# AGENTS.md — Current final-project workflow

Updated November 14, 2026 (after the November 12 snapshot).

## Setup and checks

The actual Worker entry point is root `worker.js`, and the deployed static files are under `public/`. Install locked dependencies with `npm ci`. Initialize local-only D1 with `npx wrangler d1 execute mgt3745-entries --local --file=schema.sql`; run `npm run dev` and open port 8787. With that local Worker running, run `API=http://127.0.0.1:8787 npm test`, then `npm audit`.

## Human responsibility and secrets

The project owner is accountable for accepting generated changes and deployment. No AI collaborator may read secrets, `.dev.vars`, private database records, or access tokens, or run destructive remote D1 commands. This publicly reachable API has no authentication; **fictional demo data only**. Do not run schema migrations against remote D1 without checking existing columns. User-supplied values must use SQL `bind()` and display with `textContent`.

## Source of truth and reviews

[STANDARDS.md](STANDARDS.md) controls code conventions, [STYLE.md](STYLE.md) is the canonical UI design system, [FEATURES.md](FEATURES.md) distinguishes historical proposals from shipped F-01/F-05, and [DEPLOY.md](../docs/DEPLOY.md) describes release. For future substantive work prefer branch → PR → human review; record AI assistance in the [DDR](../docs/DDR-LOG.md). Historical November 11–14 direct commits are not misrepresented as PR-reviewed. Rerun tests after code changes and report results honestly.

## Release and reversal

Verify the authenticated Cloudflare account and existing D1 database before deploying. `wrangler rollback` can revert a Worker version but **does not reverse D1 data changes**. Any actual rollback needs owner approval and a dated test record.
