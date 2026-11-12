# DDR Log

| DDR | Date | Task | Tool | Net hours | Verified by | Status |
|---|---|---|---|---|---|---|
| [HW5 DDR-001](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/docs/DDR-001.md) | 2026-10-01 | Compare AI builders for renewal-date feature | bolt.new, Google AI Studio | See original DDR | Historical source review and HW5 tests | Historical |
| [HW5 DDR-003](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/docs/DDR-003.md) | 2026-10-01 | Integrate renewal-date feature, Worker, migration and tests | Claude Code | See original DDR | HW5's documented October 2 tests, **not current test results** | Historical |
| Final port / sourcing audit | 2026-11-11 | Review and transfer HW5 source, remove unused template files, record dated vendor evidence, scores, exit plans, and pin Wrangler | ChatGPT (GPT-6) with GitHub connector and web research | Not measured | Human review needed: compare GitHub diffs; run `npm install`, `npm audit`, `npm test` and D1 export; verify app/browser deployment | In progress |

**What the assistant could not verify:** this session had no Cloudflare-authenticated Codespace, so it did not run a real live Worker deployment, a post-port integration test, or the required real export. Do not present historical HW5 screenshots or results as a new passing run.
