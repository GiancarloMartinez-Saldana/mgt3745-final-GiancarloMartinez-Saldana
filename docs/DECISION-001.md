# DECISION-001: Keep the final project as a fictional-data prototype until access-control gates pass

**Decision created:** November 14, 2026; **not** represented as a decision committed before the November 12 demonstration. This is a **forward-looking** measurable stop rule for any *new* real-user deployment after this commit.

## Default action, owner, and deadline

**Default: STOP real-user collection; keep the existing public application as a fictional-data classroom demonstration.** The project owner is accountable for enabling any real-user rollout. Review the evidence and decide whether to advance or remain stopped before the **November 19, 2026 deployment-evidence milestone**. If no reliable evidence is available, default remains **STOP**. No external live user is recruited or directed to enter private account details before passing all gates.

The API has no authentication and all records are shared in one D1 table. The app's source and warning are public, but a warning is **not** access control.

## Pre-deployment prediction and measurements (committed before future real-user evidence)

**Prediction Stake (Tight, prospective, November 14):** In the present implementation, an unauthenticated person with the public Worker URL can retrieve the full shared `/entries` list. This prediction is supported by inspection of `worker.js` but **must not be described as a newly performed adversarial test**. Resolution requires a controlled authorization test if authentication is added. An access-control change cannot be claimed retroactive to the November 12 demonstration.

| Test / metric | Baseline and method | Advance threshold | Guardrail / STOP threshold |
|---|---|---|---|
| **Private data in shared unauthenticated D1** | Architecture/code inspection: endpoints have no user auth, shared database; use fictional records | **0 personal or sensitive records**, and permission checks enforced for any later real-user deployment | **1 or more** private records collected without authentication = STOP and respond to exposure |
| **Cross-user read/write access** | Before real-user release, test with two independent synthetic identities. Unauthorized GET/POST/DELETE requests must be blocked at server | **0 unauthorized data access or mutations** in all cross-user negative tests | **Any** unauthorized cross-user read/write/delete = STOP |
| **Core API reliability** | Run `API=http://127.0.0.1:8787 npm test` locally against isolated D1 after each code change | **7/7** tests passing (or all updated equivalent tests) | **Any failing required test** = STOP |
| **Dependency security** | `npm audit` on locked package tree | **0 high/critical** unresolved findings; evaluate moderate/low with documented disposition | **1 or more high/critical** unresolved findings = STOP |
| **Data-recovery rehearsal** | On a disposable/sandbox database, export SQL then restore and check schema/data | Successful read-back of at least **1 synthetic record** after restore | **Any** failed restore, missing row, or unapproved live-database mutation = STOP |
| **Human feedback on narrow cost-tracking job** | Future task observation, count successful uses, not invented interviews. Recommend `n>=3` consenting adults using synthetic data | **3/3** users complete save, refresh, monthly-total reading, delete unaided for initial demo readiness (not proof of product-market fit) | **Any** user asks to use real billing data without adequate isolation = STOP that workflow |

## Evaluation plan

**Automated gate:** the seven API tests in [evals/worker.test.js](../evals/worker.test.js). **Human gate:** in a browser, submit synthetic data; read/list/refresh/delete; inspect authorization behavior if real-user identities are added. **Recovery gate:** on a new isolated D1 instance, export and import and compare row counts. The current known 641-byte local export demonstrates **only a local export**, not restore.

**Evidence retention:** Record the exact command, date, observed test count, outcome, and relevant safe logs in [EVALS.md](../context/EVALS.md) and [DEPLOY.md](DEPLOY.md). Do not commit a real database export or credential.

## Resolution (not yet reached)

- **Known November 12 demo evidence:** seven local API tests passed, `npm audit` returned 0 vulnerabilities, and a live browser save/reload/delete of fictional data worked. These support a classroom demo, **not** authenticated real-user readiness.
- **Unverified:** two-user authorization tests (no auth exists), successful import/restore, independent user task observations, and a rehearsed Worker rollback.
- **Current decision as of November 14: STOP real-user/private-data rollout.** A later decision may change to ship only after dated evidence meets **all** thresholds above. Reversal trigger: any guardrail breach, Cloudflare policy change, or newly discovered data exposure.

See the architecture's [trust boundary](../context/ARCHITECTURE.md), the [DDR boundaries](DDR-LOG.md), and the [deployment runbook](DEPLOY.md).
