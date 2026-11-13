# DDR Log

| DDR | Date | Task | Tool | Net hours | Verified by | Status |
|---|---|---|---|---|---|---|
| [HW5 DDR-001](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/docs/DDR-001.md) | 2026-10-01 | Compare AI builders for renewal-date feature | bolt.new, Google AI Studio | See original DDR | Historical source review and HW5 tests | Historical |
| [HW5 DDR-003](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw5/blob/main/docs/DDR-003.md) | 2026-10-01 | Integrate renewal-date feature, Worker, migration and tests | Claude Code | See original DDR | HW5's documented October 2 tests, **not current test results** | Historical |
| Final port / sourcing audit | 2026-11-11–12 | Transfer HW5 code, assess vendor sourcing and exit plans, resolve npm dependency advisories, fix same-origin deployment configuration, and document tests/deployment | ChatGPT (GPT-6) with GitHub connector; user ran commands in Codespaces | Not measured | User verified: `npm audit` 0; API tests 7/7; local D1 export succeeded; remote `entries` table exists; Wrangler deployed site/API; live save, refresh/persistence and delete worked | Verified for named checks; production security/authentication still outside scope |

**Verification provenance:** The assistant did not itself operate the Codespace or Cloudflare account. The user supplied terminal output showing local test/audit/export results, authenticated D1 table inspection, and a successful production deploy, and confirmed live save/refresh/delete in the browser. Do not mistake the local export for a remote backup/restore or the demonstration app for a private-data-safe production product.
