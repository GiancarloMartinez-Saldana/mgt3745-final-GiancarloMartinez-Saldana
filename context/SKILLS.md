# SKILLS.md — Demonstrated skills and evidence

Updated November 14, 2026, from repository artifacts and user-reported verification. AI-assisted drafting is disclosed; this is not a claim that the owner personally authored all code.

| Skill | Situation where it mattered | Evidence |
|---|---|---|
| User research and scope selection | Two September interviewees underestimated subscription counts, while recommendation features were larger than the chosen deliverable | [USERS.md](USERS.md), [FEATURES.md](FEATURES.md), [PROJECT.md](PROJECT.md) |
| Weighted architectural comparison | Choose an inspectable Worker/D1 backend rather than buying or delegating all hosting | [ARCHITECTURE.md](ARCHITECTURE.md#the-gate-hw4-rerun), [ADR-001](../docs/ADR-001.md) |
| API and database verification | Demonstrate that save, refresh and delete work instead of trusting code alone | [worker.test.js](../evals/worker.test.js), [DEPLOY.md](../docs/DEPLOY.md); user reported 7/7 local tests |
| Supply-chain risk analysis | Respond to four high-severity npm findings through a deliberate Wrangler upgrade | [SOURCING-AUDIT.md](../docs/SOURCING-AUDIT.md) |
| Same-origin deployment debugging | Codespaces port forwarding caused browser API failure despite passing API tests | [ADR-002](../docs/ADR-002.md), [wrangler.toml](../wrangler.toml) |

No real-user adoption experiment, remote database recovery, or live rollback is claimed.
