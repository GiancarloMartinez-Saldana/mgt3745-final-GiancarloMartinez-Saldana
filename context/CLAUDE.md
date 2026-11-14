# CLAUDE.md — Boundaries for future AI collaboration

Updated November 14, 2026, replacing an unfilled instruction template. Historical delegated work and actual checks appear in [DDR-LOG.md](../docs/DDR-LOG.md).

## Allowed scope

AI may read public project context, recommend changes, draft code/tests/docs for an explicitly delegated feature, identify requirement conflicts, and propose additional EARS cases. AI should not expand the project into recommendation features merely because F-02/F-03/F-06 appear in historical specifications. New scope requires the owner's approval and a documented decision.

## Trust boundary

Only public source and synthetic examples may cross into AI tools. Do not send tokens, `.dev.vars`, credentials, private exports, user financial records, or identifiable interview notes. AI tools may **draft** and **review**; the project owner is **Accountable** and must authorize accepted code, remote deployment, production database changes, and rollback. Outputs are untrusted until diff-reviewed, source-checked, and tested. Never invent actual execution, time savings, interviews, test passes or approvals.

## Instructions versus structures

These are instructions, not a security mechanism. The enforceable and verifiable structures are permissions, `.gitignore`, locked dependencies, tested server-side validation, SQL `bind()`, version history and review. [STANDARDS.md](STANDARDS.md) and [STYLE.md](STYLE.md) define coding and UI rules. The deployed Worker has no authentication: **zero private-user records are permitted** until authentication and isolation are implemented and verified.

## Delegation record

Each material AI contribution needs task scope, tool/model when known, why delegated, trust boundary, human verification performed, estimated versus measured hours identified correctly, and resulting commit. Prefer a branch/PR review for future changes. See [the deployment decision](../docs/DECISION-001.md).
