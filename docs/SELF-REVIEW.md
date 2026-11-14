# Self-Review — November 14, 2026

This is a **post-snapshot self-critique** against the final-project records, not a claim that the November 12 milestone snapshot contained these improvements. Original research and stake history were preserved.

| Criterion | Specific evidence | What remains weak / what to improve |
|---|---|---|
| **Specification** | [FEATURES.md](../context/FEATURES.md) includes six Kano hypotheses and EARS statements; F-01/F-05 are implemented and seven local API tests passed | Historic Behavior still describes unbuilt title recommendations; the added scope boundary marks them deferred. Add an independent UI test for renewal-date persistence on the final deployment |
| **Architecture** | [Historical weighted Gate](../context/ARCHITECTURE.md#the-gate-hw4-rerun): Build 97, Buy 73, Delegate 62; [final ADRs](ADR-001.md), [Worker/D1 binding](../wrangler.toml) | Unauthenticated, shared D1 cannot store real subscription/account records; needs verified identities and private per-user storage before expansion |
| **Implementation** | [worker.js](../worker.js), [public/app.js](../public/app.js), [schema.sql](../schema.sql); [deployed URL](https://mgt3745-final-subscriptions.mgt3745-hw4-giancarlo.workers.dev/) | No edit flow or recommendation engine; these are deferred. Root HTML/JS/CSS mirrors the shipped `public/` assets and needs a single-source build plan in a future iteration |
| **Delegation** | [DDR log](DDR-LOG.md) and [original first DDR](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/docs/DDR-001.md); [CLAUDE.md](../context/CLAUDE.md) | HW5 builder runs showed misleading completion claims; final ChatGPT-led changes were committed directly, not all via PR. Hours on current port not measured |
| **Verification** | [7 integration tests](../evals/worker.test.js), user-reported 7/7 local passes, 0 npm audit vulnerabilities, [DEPLOY.md](DEPLOY.md) browser smoke test, 641-byte **local** D1 export | Missing independent UI automation, authorized-user negative tests, remote D1 restore, actual live rollback rehearsal, and real user study |
| **Communication** | [README](../README.md) links the eight milestone artifacts and live URL; [AUDIT.md](AUDIT.md) gives dated verdicts for all context files | Original historical screenshots referenced from HW5 are not copied into final repo; README should not imply a new recording exists |
| **Craft** | Pinned Wrangler 4.161.0, investigated four high-severity dependency findings, replaced separate frontend/Worker ports with a single origin, retired obsolete Mermaid editor extension | Security design is a prototype, not a production service; no CI pipeline verifies tests on every push |

## Homogenization and accountability check

What the AI could **not** supply from general language alone was the actual two-interview evidence (INT-01 and INT-02), the Git commit ordering, the precise Codespaces terminal results, the user's experience of broken forwarded-port authentication, or the authenticated Cloudflare deployment plus manual browser save/reload/delete. These are the strongest project-specific evidence points, though the assistant did help create and edit documentation and code. The user is accountable for confirming that the described work and feedback reflect what actually happened.

## Next reversible improvements

The [forward-looking decision record](DECISION-001.md) sets a numeric rule: no real-user/private-data deployment without verified access controls, 0 unauthorized cross-user operations, passing tests, zero unresolved high/critical npm findings, and tested sandbox recovery. The [deployment guide](DEPLOY.md) contains a rollback **plan**, but no live rollback has been conducted or claimed. Collect dated independent user task results only with fictional records and explicit consent, and log actual rather than estimated hours.
