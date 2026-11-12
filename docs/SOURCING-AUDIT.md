# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (committed before any evidence)

**Prediction:** At least one external dependency used by the subscription-tracking final project will need a **Trial**, **Assess**, or **Hold** ring rather than **Adopt** when scored on stability, pricing predictability, institutional fit, and ease of exit.

**Resolution type:** Tight. This prediction is true if at least one inventoried dependency is assigned Trial, Assess, or Hold with an evidence-supported reason; it is false if all are Adopt.

**Pre-evidence commit:** `e34bb1294b958c5306ac21068573d3b0bfba52e1`. This commit preceded the inventory, evidence, scores and implementation changes.

### Weights (committed before any evidence and scoring)

Scoring convention: each criterion is scored 1–5, where 5 is better. For **Exit cost**, 5 means low-cost/easy migration, and 1 means costly/difficult migration.

| Criterion | Weight | Why this weight for this project |
|---|---:|---|
| Stability | 35 | A subscription dashboard must reliably retrieve and store entries so its monthly totals are trustworthy. |
| Pricing predictability | 25 | This student project has a $0 deployment target and should not surprise its maintainer with charges. |
| Institutional fit | 20 | The services must fit a small, inspectable classroom project that avoids collecting sensitive financial information. |
| Exit cost | 20 | If a hosting platform, database, or development tool becomes unavailable, the project should remain replaceable without starting over. |
| **Total** | **100** | |

**Weighted formula:** `(35 × stability + 25 × pricing + 20 × institutional fit + 20 × exit ease) / 100`.

### Inventory

Audited code transferred from [HW5](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5). The archived HW5 history records additional builders used during development; they did not become runtime dependencies.

| Dependency | Kind | Where it is recorded | Ships to users? |
|---|---|---|---|
| Wrangler 4.146.0 | dev package | `package.json`, `package-lock.json` | No, deploy/build tool only |
| Cloudflare Workers | platform | `wrangler.toml`, `worker.js`, `app.js` | Yes, serves the API |
| Cloudflare D1 | database/platform | `wrangler.toml`, `schema.sql`, `worker.js` | Yes, stores data |
| GitHub Pages (planned; not verified deployed) | hosting platform | `index.html`, README | Only after deployment |
| GitHub repository | platform | repository and README | No, source collaboration |
| GitHub Codespaces / Node 22 image | development platform | `.devcontainer/devcontainer.json` | No |
| Live Server VS Code extension | development tool | `.devcontainer/devcontainer.json` | No |
| GitHub Copilot extension | optional AI coding assistant | `.devcontainer/devcontainer.json` | No; installed in editor, usage not established |
| Claude Code | AI builder, historically used | HW5 `docs/DDR-003.md` | No, source changes remain |
| bolt.new | AI builder, historically used | HW5 `docs/DDR-001.md` | No direct runtime service |
| Google AI Studio | AI builder, historically used | HW5 `docs/DDR-001.md` | No direct runtime service |
| Local `app.js` | authored script | `index.html` | Yes, but **not** an external CDN dependency |

**Installed package count:** the HW5 committed lockfile lists **91 package records under `node_modules/`** (including optional platform variants) and 1 root project record. It contains one directly chosen npm dependency, `wrangler`. This is a **lockfile count, not a verified installed `npm ls --all` count**. To finish inventory grading, run `npm install` and `npm ls --all` in this final project's Codespace, report the installed total and all warnings, and compare with the lockfile.

**CDN scripts:** the copied `index.html` uses a locally hosted `app.js` and `styles.css`; no external CDN script is listed.

### Evidence (each fact with its source and the date you read it)

Checked **2026-11-11** unless otherwise noted. “Not applicable” means the vendor does not publish an npm-style version for the service. The exact subscription-specific risk comes from the [HW5 source](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/context/ARCHITECTURE.md), not from a generic vendor claim.

| Dependency | Latest version / date | Maintainers or vendor | License / terms | Limits or price | Other notes | Checked on |
|---|---|---|---|---|---|---|
| Wrangler | **4.160.0 listed as latest** on [npm versions](https://www.npmjs.com/package/wrangler?activeTab=versions); package **pinned to 4.146.0** in this repo | Cloudflare | [npm package](https://www.npmjs.com/package/wrangler); check installed package license with `npm view wrangler@4.146.0 license` | npm package installation $0; Cloudflare account usage separately billed by product | The former `^4` range could resolve a later version; [Cloudflare recommends local project installs](https://developers.cloudflare.com/workers/wrangler/install-and-update/). Exact publication date for 4.146.0 not yet verified | 2026-11-11 |
| Workers | Platform, no pinned service release | Cloudflare | [Cloudflare terms](https://www.cloudflare.com/website-terms/) | Free: **100,000 requests/day**, **10 ms CPU/request**, **128 MB memory**; [official limits](https://developers.cloudflare.com/workers/platform/limits/) | Exceeding free request limits interrupts access | 2026-11-11 |
| D1 | Managed service, no pinned release | Cloudflare | [Cloudflare terms](https://www.cloudflare.com/website-terms/) | Free: **5 million rows read/day**, **100,000 written/day**, **5 GB storage**; [official pricing](https://developers.cloudflare.com/d1/platform/pricing/) | This prototype has one **shared table without user authentication**. CORS does not make its data private. This is a serious institutional-fit limitation. | 2026-11-11 |
| GitHub Pages | Hosting service, no npm release | GitHub | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Available for public repositories under [GitHub Free](https://github.com/pricing) ($0 plan) | Proposed frontend host, not yet verified live or allowed by Worker CORS | 2026-11-11 |
| GitHub repo | Hosted version control | GitHub | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | [Free](https://github.com/pricing) $0 with unlimited public/private repositories | Public commits are durable: keep secrets out of all commits | 2026-11-11 |
| Codespaces / Node 22 devcontainer | Development environment | GitHub and Microsoft | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Personal Free accounts: **120 core-hours and 15 GB-month**, [official documentation](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) | This is a GitHub Free example; actual user's plan and quota are **not verified** | 2026-11-11 |
| Live Server | VS Code extension (development only) | ritwickdey (extension id in devcontainer) | Verify extension Marketplace license before final submission | Local editor extension; no paid API in project | Replacement: Python's or Node's local static server | 2026-11-11 |
| Copilot | Optional editor AI service | GitHub | [GitHub pricing](https://github.com/features/copilot/plans) | Plan-specific; no paid use verified | Installed by devcontainer, but not needed by running project; consider removing it | 2026-11-11 |
| Claude Code | Historic AI builder | Anthropic | [Anthropic terms](https://www.anthropic.com/legal/consumer-terms) | Subscription/usage varies by plan; not a runtime charge | HW5 DDR reports use for code integration; **not** proof of current active subscription | 2026-11-11 |
| bolt.new | Historic AI builder | StackBlitz | [bolt.new](https://bolt.new/) terms apply | Plan/usage not verified numerically | HW5 documents its code generation and subsequent fixes, but not current reliance | 2026-11-11 |
| Google AI Studio | Historic AI builder | Google | [AI Studio](https://aistudio.google.com/) terms apply | Plan/quotas change by model and tier, not verified here | HW5 session generated comparison artifact; no model call in shipped subscription app | 2026-11-11 |

**Evidence still to collect for full credit:** precise package release date, maintainer publishing accounts and license via `npm view`; `npm audit` results; numerical limits and current terms for any builder you intend to keep using. Where details have not been checked, the table says so instead of inventing them.

### Scores and Rings

These are project-specific judgments (not third-party risk ratings). **Adopt** = retain; **Trial** = use temporarily with backup; **Assess** = verify more before relying on it; **Hold** = do not add reliance or plan removal.

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|---|---:|---:|---:|---:|---:|---|---|
| Wrangler 4.146.0 | 4 | 5 | 5 | 4 | **4.40** | Adopt | Official tool, exact-pinned for controlled upgrades |
| Workers | 4 | 5 | 4 | 3 | **4.20** | Adopt | Fits the small API; vendor migration requires rewriting deployment |
| D1 | 4 | 5 | 2 | 2 | **3.40** | Trial | Shared publicly accessible records make real personal data inappropriate |
| GitHub Pages | 4 | 5 | 4 | 5 | **4.40** | Trial | Good static host, but new app deployment/CORS is still unverified |
| GitHub repo | 5 | 5 | 5 | 5 | **5.00** | Adopt | Git history can be cloned to other hosts |
| Codespaces | 4 | 3 | 4 | 5 | **3.90** | Adopt | Portable dev setup; free quota can run out |
| Live Server | 4 | 5 | 4 | 5 | **4.40** | Adopt | Only a local convenience; easy to replace |
| Copilot | 3 | 3 | 2 | 5 | **3.50** | Hold | Not required for product; unnecessary source exposure if not being used |
| Claude Code (historic) | 3 | 3 | 4 | 5 | **3.90** | Assess | Important to verify authored changes, but app does not depend on the service |
| bolt.new (historic) | 3 | 3 | 3 | 5 | **3.70** | Hold | Generated source already integrated; no current hosting dependency |
| Google AI Studio (historic) | 3 | 3 | 3 | 5 | **3.70** | Hold | Generated comparison artifact, not a runtime dependency |

### Exit Plans (all user-serving/data services and all Trial/Assess)

Hours are estimates for a simple prototype, **not time already spent**.

| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|---|---|---|---:|---|
| Workers | Free limits become insufficient or API unavailable for a day | Node.js API deployed to another host such as Render | 6–10 | **Not tested** |
| D1 | Must support real/private users, data export needed, or free terms change | SQLite hosted with a Node backend | 8–14 (more with authentication) | **Not tested**; `npm run db:export` exists, but no export has been verified |
| GitHub Pages | Public static hosting fails or needs server logic | Cloudflare Pages static hosting | 1–3 | **Not tested** |
| Codespaces | Monthly free quota exhausted | Local Node 22 + VS Code | 1–2 | **Not tested** |
| Copilot | Unused editor extension creates unnecessary data exposure | Disable extension/use normal VS Code | 0.25 | **Not tested** |
| Claude Code | Service unavailable or outputs fail review | Manual editing + tests in Codespaces | 0.5 setup, variable development | **Not tested** |
| bolt.new | Builder no longer available | Direct editing of current HTML/CSS/JS | 0.5 setup | **Not tested**; app does not require bolt at runtime |
| Google AI Studio | Builder unavailable | Direct editing of existing app | 0.5 setup | **Not tested**; app does not require it at runtime |

**Required hands-on exit test is outstanding.** Recommended low-risk test: export D1 to a local `backup.sql` using `npm run db:export` from an authenticated Codespace, inspect the output file, and verify it includes the table definition. **Do not commit real backup data.** Record the observed result and date here once done.

### Changes Caused by This Audit

- **Pin Wrangler exactly:** updated `package.json` to `4.146.0`, matching the existing HW5 lockfile version. Package change commit: `5cf5fc1ad5adc887b5c5870b677435acbbc16c86`; lockfile import/pin commit: `3e3423fa880af3a553e699281c09dc0cfaab7e3e`. This makes upgrades deliberate instead of accepting any v4 release.
- **Remove unused scaffold:** removed the unused starter Gemini/AI-Gateway Worker and its template test; the product uses the HW5 subscription Worker instead. This reduces unnecessary dependency surface.
- **Architecture:** see `docs/ADR-001.md` for adopted HW5 architecture and safety limitations.
- **Delegation:** see `docs/DDR-LOG.md` for AI assistance and necessary human verification.
- **Tests:** HW5's README documents 7/7 tests in **October 2026**; that is **historical**, not a post-transfer pass. **Post-port `npm install`, `npm audit`, API integration tests and deployment remain unverified** because the Cloudflare-authenticated Codespace was not available in this session.

### Prediction Stake Resolution

**Supported.** D1 received **Trial** due to the shared unauthenticated database; GitHub Pages also received Trial because deployment is still unverified. The original falsifiable prediction is therefore met, independent of whether all follow-up work is finished.

**Remaining milestone tasks:** verify `npm install` warnings and installed count, `npm audit`, run a real exit test, test the transferred API against a Cloudflare environment, and deploy/verify a live frontend before marking this audit complete.
