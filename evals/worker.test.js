// evals/worker.test.js
// The code eval. Run with:   API=https://mgt3745-hw4.<you>.workers.dev npm test
// Each test names the EARS row it checks (context/FEATURES.md).
//
// HW5 integration: the template's starter tests posted { text }, but this
// app's table stores { service, price } (HW4). They are adapted here; the
// assertions are unchanged.
import { test, after } from "node:test";
import assert from "node:assert/strict";

const API = process.env.API;
if (!API) throw new Error("Set API to your deployed Worker URL: API=https://... npm test");

// Every entry a test creates is deleted at the end, so running the eval
// against the deployed Worker does not leave junk in the shared table.
const createdIds = [];

async function post(body) {
  return fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function listEntries() {
  return (await fetch(API + "/entries")).json();
}

// POST an entry with a unique name, then find it in GET.
async function createAndFind(fields) {
  const service = "eval-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  const res = await post({ service, price: 1, ...fields });
  assert.equal(res.status, 201, "valid entry is accepted");
  const found = (await listEntries()).find(e => e.service === service);
  assert.ok(found, "posted entry appears in GET");
  createdIds.push(found.id);
  return found;
}

after(async () => {
  for (const id of createdIds) await fetch(API + "/entries/" + id, { method: "DELETE" });
});

test("EARS U-HW4-0: THE SYSTEM SHALL return all entries in creation order (GET /entries is 200 + array)", async () => {
  const res = await fetch(API + "/entries");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  for (let i = 1; i < body.length; i++) assert.ok(body[i].id > body[i - 1].id, "ids ascending");
});

test("EARS U-HW4-5: IF the entry text is missing, THEN THE SYSTEM SHALL reject it (POST {} is 400)", async () => {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(res.status, 400);
  assert.ok((await res.text()).length > 0, "400 carries a reason");
});

test("EARS E-HW4-1: WHEN a valid entry is submitted, THE SYSTEM SHALL store it (POST then GET shows it)", async () => {
  const entry = await createAndFind({});
  assert.equal(entry.price, 1);
});

test("EARS U-HW4: IF a submitted price is not a number greater than 0, THEN THE SYSTEM SHALL reject it and say why", async () => {
  for (const price of [0, -3, "12"]) {
    const res = await post({ service: "eval-bad-price", price });
    assert.equal(res.status, 400, `price ${JSON.stringify(price)} is rejected`);
    assert.match(await res.text(), /price/);
  }
});

// ---- HW5: the delegated feature (F-05 renewal date) ----------------------

test("EARS O-HW5-1 + S-HW5-4: WHERE an entry includes a renewal date, THE SYSTEM SHALL store it on the server and return it", async () => {
  const entry = await createAndFind({ renewal_date: "2026-10-15" });
  assert.equal(entry.renewal_date, "2026-10-15");
});

test("EARS E-HW5-2: WHEN a valid entry is submitted without a renewal date, THE SYSTEM SHALL store it with no date", async () => {
  const entry = await createAndFind({});
  assert.equal(entry.renewal_date, null);
});

test("EARS U-HW5-3: IF a renewal date is not a real YYYY-MM-DD date, THEN THE SYSTEM SHALL reject it and say why", async () => {
  for (const renewal_date of ["2026-02-30", "10/15/2026", "2026-13-01", 20261015]) {
    const res = await post({ service: "eval-bad-date", price: 1, renewal_date });
    assert.equal(res.status, 400, `renewal_date ${JSON.stringify(renewal_date)} is rejected`);
    assert.match(await res.text(), /renewal date/);
  }
  const names = (await listEntries()).map(e => e.service);
  assert.ok(!names.includes("eval-bad-date"), "nothing with a bad date was stored");
});
