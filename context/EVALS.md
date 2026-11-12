# EVALS.md

The verification table from HW3, grown up. Five sections, in this order.
The first two are written and committed BEFORE any tool sees the spec.

## 1. RAT statement
<!-- One sentence. The assumption that, if false, makes this build pointless,
     and what would show it is false. -->
The riskiest assumption in delegating the renewal-date feature (F-05, FEATURES.md
rows marked [HW5 DELEGATE]) is that a builder handed only my three page files will
send the date through my Worker instead of inventing its own storage, because the
Worker and the D1 table it needs are not in the paste; it is shown false if the
tool's `app.js` keeps renewal dates in `localStorage` or in memory, so they vanish
on a cleared cache (checklist question 5).

## 2. Prediction Stake (before build, October 1, 2026, committed before any tool saw the spec)
<!-- At least one of each. Never edit the prediction text; add resolutions below it. -->
- **Tight:** At least 2 of the 4 [HW5 DELEGATE] EARS rows will pass on each tool's first output, and S-HW5-4 (stored on the server) will not pass on either.
  - Resolved October 2, 2026: **missed.** bolt 1 of 4, AI Studio 2 of 4, both against the HW4 Worker they were given. AI Studio met the bar; bolt did not. The S-HW5-4 half **held**: neither tool built storage. (AI Studio reaches 4 of 4 against the HW5 Worker only because it sent the date under two guessed names, `renewalDate` and `renewal_date`, and one happened to match.)
- **Loose:** bolt will follow STYLE.md tokens better than AI Studio.
  - Resolved October 2, 2026: **missed, the other way round.** AI Studio added no colors or font sizes of its own; its only CSS change was label spacing. bolt added `color: #526578` as raw hex and a `0.9rem` (14.4px) date line, under font-size-min 16px.
- **Open:** At least one tool will introduce a dependency or a framework (React, a date library, Tailwind) I did not ask for. Resolves when I read each zip's package.json and `<script>`/`<link>` tags.
  - Resolved October 2, 2026: **held.** AI Studio's zip adds a `package.json` with 10 dependencies and 9 devDependencies: React 19, Vite, Tailwind, the Gemini SDK (`@google/genai`), Express, dotenv, motion and lucide-react, plus a `.env.example` asking for a `GEMINI_API_KEY`. None of it is used by the three page files (`src/App.tsx` renders an empty `<div>` into a `#root` that does not exist). bolt added an empty `package-lock.json` with no packages.
- **Tight (integration):** Integrating the feature into the real app will need a change outside the three page files (`worker.js` and `schema.sql` at least), which the delegation instruction forbade the tool from touching.
  - Resolved October 1, 2026: **held.** The shipped feature needed `worker.js`, `schema.sql` and `migrations/0001_add_renewal_date.sql` (DDR-003).

## 3. Success criteria
| EARS row (feature) | Checked by | Where |
|---|---|---|
| WHERE an entry includes a renewal date, THE SYSTEM SHALL display that date alongside the service (O-HW5-1) | test + human | evals/worker.test.js #5 (stored and returned); README See It Work, docs/renewal-date.png (displayed) |
| WHEN a valid subscription is submitted without a renewal date, THE SYSTEM SHALL store it and show it with no date (E-HW5-2) | test | evals/worker.test.js #6 |
| IF a submitted renewal date is not a real calendar date in YYYY-MM-DD form, THEN THE SYSTEM SHALL reject the entry and say why (U-HW5-3) | test + judgment | evals/worker.test.js #7; docs/JUDGMENT.md #8 (the reason reaches the page) |
| THE SYSTEM SHALL store the renewal date on the server with the rest of the entry (S-HW5-4) | test + judgment | evals/worker.test.js #5; docs/JUDGMENT.md #7 |
| The HW4 rows keep passing (order, store, price rule, missing name) | test | evals/worker.test.js #1–#4 |
| The page follows STYLE.md and STANDARDS.md | judgment | docs/JUDGMENT.md #2–#6, #9–#10 |

## 4. Error-analysis log
<!-- Every failure observed, a few words each, counted, sorted by count. -->
From bolt-001.zip, aistudio-001.zip (both walked in Chromium against the HW4
and HW5 Workers, in New York and Berlin time), the integration (DDR-003) and
the HW5 template. Sorted by count, then by source.

| Failure (a few words) | Count | Source | Category |
|---|---|---|---|
| Did not store the date on the server (S-HW5-4 fails against the Worker it was given) and did not ask, though the instruction said to | 2 | bolt, AI Studio | architecture |
| Date field is a text box with a placeholder, not `type="date"` | 2 | bolt, AI Studio | STYLE |
| Summary claimed S-HW5-4 was met because the date is in the POST body (bolt: "persists server-side") | 2 | bolt, AI Studio | cannot verify |
| Touched files outside the three named (bolt: empty package-lock.json; AI Studio: 10 files) | 2 | bolt, AI Studio | scope |
| AI Studio: React/Vite/Tailwind/Gemini/Express project added, 19 packages, none used | 1 | AI Studio | dependency |
| AI Studio: summary says "across the three files" and never mentions the 10 extra files | 1 | AI Studio | scope |
| AI Studio: `.env.example` asks for a `GEMINI_API_KEY` the feature never needs (a credential slot) | 1 | AI Studio | STANDARDS |
| AI Studio: guessed the field name, sends both `renewalDate` and `renewal_date`, reads either | 1 | AI Studio | architecture |
| AI Studio: against the HW4 Worker the date is silently dropped and the page still says "Subscription saved." | 1 | AI Studio | EARS |
| bolt: date check rejects every valid date east of UTC (local midnight compared to UTC) | 1 | bolt | EARS |
| bolt: `2026-13-45` throws "Invalid time value" in the console instead of showing a message | 1 | bolt | STANDARDS |
| bolt: date text 0.9rem (below font-size-min 16px) and raw hex, not a token | 1 | bolt | STYLE |
| bolt: help text not updated to mention the date | 1 | bolt | STYLE |
| bolt: preview would not run ("No preview available") | 1 | bolt | cannot verify |
| Grader 2 (Claude) gave the right answer on JUDGMENT #3 with a false citation ("all three prepare() calls use ? + bind()") | 1 | JUDGMENT.md | cannot verify |
| Rubric questions a human could not answer as written (#3 SQL with no user value, #12 how to check 44px) | 2 | JUDGMENT.md | rubric |
| Feature needed files outside the three allowed (worker.js, schema.sql, a migration) | 1 | integration (Claude Code) | scope |
| Deployed table has no renewal_date column; deploying first would 500 every save | 1 | integration (Claude Code) | architecture |
| Starter test posted `{ text }`; this table stores `service` + `price` | 1 | HW5 template | EARS |
| `node --test evals/` loads the folder as a module and runs 0 tests on Node 22 | 1 | HW5 template | dependency |
| Focus ring covered the label below an input (worse with a third field) | 1 | HW4 page, found in HW5 screenshot | STYLE |
| styles.css used raw hex values, not named STYLE.md tokens | 1 | HW4 page | STYLE |
| Date shown one day early in US time zones if formatted as local time | 1 | caught in review before commit (Claude Code) | cannot verify → tested |

## 5. Evals
- **Code:** `npm test` with `API=<worker url>`; 7 tests, **7 passing against the deployed Worker** (October 2, 2026, docs/npm-test.png) and 7 passing locally before deploying (docs/npm-test-local.png); 4 of 7 on the HW4 Worker, so the three HW5 tests check the feature. Screenshot in README.
- **Judgment:** docs/JUDGMENT.md, 12 questions, two graders (me, and Claude as Grader 2 with its prompt pasted), agreement 12 of 12 (100%). Two questions (#3 SQL, #12 target size) were "?" on my first pass and were rewritten (JUDGMENT.md → Disagreements).

## Verification table (carried from HW4)
<!-- Paste your HW4 verification table here; it is the ancestor of section 3. -->
The HW4 table is kept, unedited, in [FEATURES.md → HW4: Verification](FEATURES.md#hw4-verification);
its HW5 descendant is [FEATURES.md → HW5: Verification](FEATURES.md#hw5-verification).
The rows that became code in HW5:

| HW4 row | HW4 verdict | Now checked by |
|---|---|---|
| Return entries in order (U-HW4-0) | PASS | evals #1 |
| Reject missing / invalid name (U-HW4-5) | PASS | evals #2 |
| Store valid entry (E-HW4-1) | PASS | evals #3 |
| Reject non-positive price (U-HW4) | PASS | evals #4 |
| Survive cleared cache (S-HW4-3) | PASS | human (README GIF); S-HW5-4 extends it to the date |
| Server unreachable / 500 (U-HW4-6) | PASS | human (`?serverDown`, docs/server-unreachable.png) |
| HW3 #5 renewal date | FAIL | evals #5–#7, now PASS locally |
