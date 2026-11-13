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
| Wrangler 4.161.0 | dev package | `package.json`, `package-lock.json` | No, deploy/build tool only |
| Cloudflare Workers / static assets | platform | `wrangler.toml`, `worker.js`, `public/` | Yes, serves the API and dashboard |
| Cloudflare D1 | database/platform | `wrangler.toml`, `schema.sql`, `worker.js` | Yes, stores data |
| GitHub Pages (alternative considered, not deployed) | hosting platform | prior plan, README | No; deployed dashboard is on Workers static assets |
| GitHub repository | platform | repository and README | No, source collaboration |
| GitHub Codespaces / Node 22 image | development platform | `.devcontainer/devcontainer.json` | No |
| Live Server VS Code extension | development tool | `.devcontainer/devcontainer.json` | No |
| Markdown Mermaid VS Code extension | optional diagram-preview editor extension | `.devcontainer/devcontainer.json` (`bierner.markdown-mermaid`) | No |
| GitHub Copilot extension | optional AI coding assistant | `.devcontainer/devcontainer.json` | No; installed in editor, usage not established |
| Claude Code | AI builder, historically used | HW5 `docs/DDR-003.md` | No, source changes remain |
| bolt.new | AI builder, historically used | HW5 `docs/DDR-001.md` | No direct runtime service |
| Google AI Studio | AI builder, historically used | HW5 `docs/DDR-001.md` | No direct runtime service |


**Installed package inventory, verified in the final Codespace on 2026-11-12:** The exact command `npm ls --all --parseable 2>/dev/null | sed '1d' | wc -l` returned **38 installed dependency paths** (excluding the root project). The top-level dependency tree showed **1 directly chosen package** (`wrangler@4.161.0`) plus **3 extraneous artifacts** (`@emnapi/runtime`, `@img/sharp-wasm32`, `tslib`), leaving **34 installed transitive package paths** by subtraction. `npm ci` before upgrading had added 40 packages and audited 41; the subsequent security-driven upgrade audited 39 packages with **0 vulnerabilities**. The pre-upgrade `npm ls --all` included platform-specific `UNMET OPTIONAL DEPENDENCY` entries for other operating systems, which are not counted as installed packages. The original HW5 lockfile's 91 package records included optional variants; this is **not** the same as the verified 38 installed package paths. The count command hides diagnostic stderr; source-of-truth package health was checked separately with `npm audit` and `npm ls --depth=0`.

**CDN scripts:** both the root and deployed `public/index.html` load only the first-party `app.js` and `styles.css`; **0 external CDN scripts** were found. Those two files are authored project assets, **not external dependencies**. The devcontainer config was also reviewed: `ritwickdey.LiveServer`, `GitHub.copilot`, and `bierner.markdown-mermaid` are all inventoried.

### Evidence (each fact with its source and the date you read it)

Checked **2026-11-11** unless otherwise noted. “Not applicable” means the vendor does not publish an npm-style version for the service. The exact subscription-specific risk comes from the [HW5 source](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/context/ARCHITECTURE.md), not from a generic vendor claim.

| Dependency | Latest version / date | Maintainers or vendor | License / terms | Limits or price | Other notes | Checked on |
|---|---|---|---|---|---|---|
| Wrangler | **4.161.0**, confirmed as both the installed exact-pin and current `latest` using `npm view wrangler@4.161.0 version ... --json` and `npm view wrangler version`. **Exact npm publication time verified:** `npm view wrangler time --json | grep '"4.161.0"'` returned `2026-11-12T13:40:34.590Z` (**November 12, 2026, 7:40:34 AM CST**). [npm package page](https://www.npmjs.com/package/wrangler?activeTab=readme) | **Cloudflare**; `npm view wrangler@4.161.0 ... maintainers ... --json` returned **one listed publisher/maintainer:** `wrangler-publisher <workers-devprod@cloudflare.com>`. [Cloudflare workers-sdk repository](https://github.com/cloudflare/workers-sdk) | **MIT OR Apache-2.0**, confirmed by `npm view wrangler@4.161.0 ... license ... --json` and [npm package](https://www.npmjs.com/package/wrangler?activeTab=readme) | npm CLI package $0; hosted Workers/D1 usage billed separately | The initial 4.146.0 pin produced **4 high-severity findings** in `npm audit`, from `sharp` and `undici` via Miniflare. Upgrading to 4.161.0 produced **0 vulnerabilities**. One listed npm maintainer account concentrates release privileges; verify the source and use an exact version pin. The `npm view` output returned **no `deprecated` field**, so npm did not report a deprecation notice for this release | 2026-11-12 |
| Cloudflare Workers and static assets | Managed hosting service; no project-pinned server version | Cloudflare | [Cloudflare service terms](https://www.cloudflare.com/website-terms/) | **Free: 100,000 requests/day, 10 ms CPU/request, 128 MB memory**, [official limits](https://developers.cloudflare.com/workers/platform/limits/) | Deployed final app's API and 3 static dashboard files on **2026-11-12**. Cloudflare is an infrastructure concentration risk; the API is currently unauthenticated | 2026-11-12 |
| Cloudflare D1 | Managed SQLite service; no project-pinned version | Cloudflare | [Cloudflare service terms](https://www.cloudflare.com/website-terms/) | **Free: 5M rows read/day, 100K rows written/day, 5 GB per account**; [pricing](https://developers.cloudflare.com/d1/platform/pricing/); free **500 MB per database** [limit](https://developers.cloudflare.com/d1/platform/limits/) | Existing `mgt3745-entries` database; direct remote SQL verified `entries` table. All API records are in one **shared unauthenticated** table. Local SQL export tested, remote export/restore untested | 2026-11-12 |
| GitHub Pages (considered, not deployed) | Static hosting service; no runtime version in use | GitHub | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | GitHub Free plan **$0**; [plan details](https://github.com/pricing); public-repository Pages usage subject to [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) | **Not a current dependency:** the final frontend is served as Cloudflare Worker static assets instead. Retained here to document a considered alternate host | 2026-11-12 |
| GitHub repository | Hosted Git/source management service; no project-pinned service release | GitHub | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | GitHub Free **$0** with public/private repos; [pricing](https://github.com/pricing) | Source code and evidence live in Git history; clone/mirror to another Git host if necessary. No secrets or `backup.sql` should be committed | 2026-11-12 |
| GitHub Codespaces / Node 22 devcontainer | Cloud development environment; Node 22 configured in `.devcontainer/devcontainer.json` | GitHub / Microsoft | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Personal GitHub Free example: **120 core-hours and 15 GB-month** included; [official allowance](https://docs.github.com/en/billing/reference/product-usage-included). Account-specific plan/charges not checked | Codespace may stop after allowance; repository and Node/VS Code environment remain portable | 2026-11-12 |
| Live Server VS Code extension | Optional **development-only** editor server; no package pinned in `package.json` | Ritwick Dey (`ritwickdey.LiveServer`) | **MIT**, [extension license](https://marketplace.visualstudio.com/items/ritwickdey.LiveServer/license) | Extension/source use **$0** under MIT; no third-party API fees in app | No longer needed to preview the final same-origin Worker on port 8787; can be replaced by Wrangler static asset serving or a simple local HTTP server | 2026-11-12 |
| Markdown Mermaid VS Code extension | Optional Markdown diagram-preview extension, no runtime dependency | bierner (`bierner.markdown-mermaid`) | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) and [extension repository](https://github.com/mjbvz/vscode-markdown-mermaid) | Editor extension, no paid app API in this project | Optional editor convenience; can preview diagrams in VS Code, but final Worker does not use it | 2026-11-12 |
| GitHub Copilot extension | Optional AI assistant in devcontainer, **not an app runtime model** | GitHub | [GitHub terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) | Copilot Free **$0**, **2,000 code completions/month**; Pro **$10/month**, [official plans](https://docs.github.com/en/copilot/get-started/plans). User's plan/usage not verified | Extension presence does not prove use or a particular chosen LLM. No Copilot model calls are made by the deployed application | 2026-11-12 |
| Claude Code (historical) | AI code-development assistant, documented in HW5 DDR; not called by deployed app | Anthropic | [Anthropic terms](https://www.anthropic.com/legal/consumer-terms) | Claude Pro **$20/month** monthly or **$200/year**, includes Claude Code; Max starts **$100/month**, [official pricing](https://claude.com/pricing). No account expenditure inferred | Historic integration help; its output needs human code review and tests, but the app no longer requires the builder. No project-level Claude model is shipped | 2026-11-12 |
| bolt.new (historical) | AI app builder documented in HW5 DDR; not serving final app | StackBlitz / Bolt | [Bolt terms](https://bolt.new/terms) and [pricing](https://bolt.new/pricing) | Free **$0**, **1M tokens/month** (300K/day); Pro **$25/month** monthly, **10M starting tokens/month**, [pricing](https://bolt.new/pricing) | Historic code generation only; source is editable independently of Bolt. Account/plan actually used during HW5 not established | 2026-11-12 |
| Google AI Studio (historical) | Google generative-AI prototyping/builder; **no runtime Gemini model** chosen by app | Google | [Google AI terms](https://ai.google.dev/gemini-api/terms) | AI Studio access on Free tier **$0**; paid model use is token-based and depends on chosen model, [official pricing](https://ai.google.dev/gemini-api/docs/pricing) | Used for historical comparison work only; no chosen model/API key or requests in final Worker, so model-specific numeric billing does not apply. Free-tier data-use terms require care for sensitive content | 2026-11-12 |

**Version/coverage notes:** Service rows have no meaningful npm release date. There is **no** external CDN script, and the deployed app calls **no** generative AI model. Historic AI builders are inventoried for provenance, not described as active runtime requirements. Wrangler's exact npm publisher account, license, installed version, current dist-tag, and **exact publication timestamp (2026-11-12T13:40:34.590Z)** were verified in the user's Codespace on 2026-11-12. The precise timestamp was retrieved by `npm view wrangler time --json | grep '"4.161.0"'`. Scores below are **project-specific judgments**, not vendor ratings.


### Scores and Rings

These are project-specific judgments (not third-party risk ratings). **Adopt** = retain; **Trial** = use temporarily with backup; **Assess** = verify more before relying on it; **Hold** = do not add reliance or plan removal.

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|---|---:|---:|---:|---:|---:|---|---|
| Wrangler 4.161.0 | 4 | 5 | 5 | 4 | **4.45** | Adopt | Found 4 high-severity advisories on 4.146.0, then exact-upgraded and verified 0 remaining |
| Workers | 4 | 5 | 4 | 3 | **4.05** | Adopt | Fits deployed API and static website; vendor migration requires rewriting deployment |
| D1 | 4 | 5 | 2 | 2 | **3.45** | Trial | Shared publicly accessible records make real personal data inappropriate |
| GitHub Pages (not deployed) | 4 | 5 | 4 | 5 | **4.45** | Hold | Considered alternative, but the app already serves its UI from Cloudflare Workers; no reason to adopt another frontend host |
| GitHub repo | 5 | 5 | 5 | 5 | **5.00** | Adopt | Git history can be cloned to other hosts |
| Codespaces | 4 | 3 | 4 | 5 | **3.95** | Adopt | Portable dev setup; free quota can run out |
| Live Server | 4 | 5 | 4 | 5 | **4.45** | Adopt | Only a local convenience; easy to replace |
| Markdown Mermaid extension | 3 | 5 | 4 | 5 | **4.10** | Hold | Optional preview-only extension; despite low switching cost and free use, it adds no value to the deployed app; do not treat its high numeric score as a reason to rely on it |
| Copilot | 3 | 3 | 2 | 5 | **3.20** | Hold | Not required for product; unnecessary source exposure if not being used |
| Claude Code (historic) | 3 | 3 | 4 | 5 | **3.60** | Assess | Important to verify authored changes, but app does not depend on the service |
| bolt.new (historic) | 3 | 3 | 3 | 5 | **3.40** | Hold | Generated source already integrated; no current hosting dependency |
| Google AI Studio (historic) | 3 | 3 | 3 | 5 | **3.40** | Hold | Generated comparison artifact, not a runtime dependency |

### Exit Plans (all user-serving/data services and all Trial/Assess)

Hours are estimates for a simple prototype, **not time already spent**.

| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|---|---|---|---:|---|
| Workers | Free limits become insufficient or API unavailable for a day | Node.js API deployed to another host such as Render | 6–10 | **Not tested** |
| D1 | Must support real/private users, data export needed, or free terms change | SQLite hosted with a Node backend | 8–14 (more with authentication) | **Export step tested successfully, 2026-11-12 Central / Nov 13 UTC:** `npx wrangler d1 export mgt3745-entries --local --output=backup.sql` returned `Done!`; `ls -lh backup.sql` reported a 641-byte file; `grep -m 1 "CREATE TABLE" backup.sql` returned `CREATE TABLE entries (`. This tests **local export and SQL schema presence**, not remote export or restore. |
| GitHub Pages (not deployed) | Only adopt if Cloudflare Worker static hosting becomes unsuitable | Cloudflare Pages or another static host | 1–3 | **Not applicable: no GitHub Pages dependency deployed** |
| Codespaces | Monthly free quota exhausted | Local Node 22 + VS Code | 1–2 | **Not tested** |
| Markdown Mermaid extension | No longer previewing documentation diagrams | VS Code built-in Markdown viewer or GitHub Markdown rendering | 0.25 | **Not tested; editor-only and not required for app** |
| Copilot | Unused editor extension creates unnecessary data exposure | Disable extension/use normal VS Code | 0.25 | **Not tested** |
| Claude Code | Service unavailable or outputs fail review | Manual editing + tests in Codespaces | 0.5 setup, variable development | **Not tested** |
| bolt.new | Builder no longer available | Direct editing of current HTML/CSS/JS | 0.5 setup | **Not tested**; app does not require bolt at runtime |
| Google AI Studio | Builder unavailable | Direct editing of existing app | 0.5 setup | **Not tested**; app does not require it at runtime |

**Hands-on exit step completed:** On 2026-11-12 (Central; terminal recorded Nov 13 UTC), the local D1 export succeeded and the resulting `backup.sql` file was verified to exist and contain the `entries` table definition. This provides a real tested export step, but does **not** demonstrate a successful import, restored records, or a remote D1 backup. The backup must stay out of GitHub; `backup.sql` is already in `.gitignore`.

### Changes Caused by This Audit

- **Security-driven exact-version replacement (verified 2026-11-12):** initial Wrangler 4.146.0 produced **4 high-severity vulnerabilities** in npm audit, involving `sharp` and `undici` through `miniflare`. Updated to **Wrangler 4.161.0** with `npm install --save-dev --save-exact wrangler@4.161.0`. The next `npm audit` returned **0 vulnerabilities**, and `npm ls --depth=0` confirmed the new version. The version remains exact-pinned. GitHub commit [`7070160`](https://github.com/GiancarloMartinez-Saldana/mgt3745-final-GiancarloMartinez-Saldana/commit/7070160) records the upgrade to 4.161.0. Initial pin commit: `5cf5fc1ad5adc887b5c5870b677435acbbc16c86`.
- **Remove unused scaffold:** removed the unused starter Gemini/AI-Gateway Worker and its template test; the product uses the HW5 subscription Worker instead. This reduces unnecessary dependency surface.
- **Architecture:** see `docs/ADR-001.md` for adopted HW5 architecture and safety limitations.
- **Delegation:** see `docs/DDR-LOG.md` for AI assistance and necessary human verification.
- **Tests (verified 2026-11-12):** the final project's Codespace ran `API=http://127.0.0.1:8787 npm test` against a **local** running Worker/D1 environment. Node's test runner reported **7 tests, 7 passed, 0 failed**, duration **485.454614 ms**, covering GET entries, rejection of invalid requests, save/read, optional renewal dates, and invalid-date rejection. `npm audit` independently reported **found 0 vulnerabilities** after the upgrade. These results verify the local API, **not** a new production deployment.

### Prediction Stake Resolution

**Supported.** D1 received **Trial** due to the shared unauthenticated database; optional development/builder services were also assessed conservatively. GitHub Pages was **not deployed** because the Worker now serves both API and frontend assets. The original falsifiable prediction is therefore met, independent of whether all follow-up work is finished.

**Final deployed verification (2026-11-12):** Cloudflare uploaded three assets (`/index.html`, `/styles.css`, `/app.js`) and deployed `mgt3745-final-subscriptions` at https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/. A remote database query confirmed that the D1 `entries` table exists. The user manually confirmed **create → refresh/persistence → delete**, including monthly total updating, in the public website. Remaining limitations: the API is unauthenticated and all entries are shared, remote export/restore was not tested, the live renewal-date round-trip was not independently checked, and the live renewal-date round-trip was not independently checked. The installed package-path total, exact release timestamp, release publisher and license are now documented.
