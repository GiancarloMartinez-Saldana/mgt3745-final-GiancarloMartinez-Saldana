(() => {
  'use strict';

  // HW4: subscriptions now live in Cloudflare D1 behind the Worker (ADR-002).
  // Paste your deployed Worker URL here after `npx wrangler deploy`.
  const deployedApi = 'https://mgt3745-hw4.mgt3745-hw4-giancarlo.workers.dev';
  // A page served from this machine talks to `npm run dev` instead, so the
  // failure modes in FEATURES.md can be tested without touching the real table.
  const isLocalPage = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  // The query switch makes "server unreachable" repeatable: nothing listens on port 9.
  const simulateServerDown = new URLSearchParams(window.location.search).has('serverDown');
  const api = simulateServerDown ? 'http://127.0.0.1:9'
    : isLocalPage ? 'http://127.0.0.1:8787'
    : deployedApi;

  // ---- HW3, for the record (superseded by ADR-002) ------------------------
  // loadNotes: JSON.parse(window.localStorage.getItem(storageKey))
  // saveNotes: window.localStorage.setItem(storageKey, JSON.stringify(nextNotes))
  // -------------------------------------------------------------------------

  const noteForm = document.querySelector('#note-form');
  const noteInput = document.querySelector('#note-input');
  const priceInput = document.querySelector('#price-input');
  const renewalInput = document.querySelector('#renewal-input');
  const noteList = document.querySelector('#note-list');
  const noteError = document.querySelector('#note-error');
  const saveStatus = document.querySelector('#save-status');
  const emptyState = document.querySelector('#empty-state');
  const spendTotal = document.querySelector('#spend-total');
  let notes = [];

  function showError(message) {
    // The user sees it on the page. Nothing is thrown in the console.
    noteError.textContent = message;
    saveStatus.textContent = '';
  }

  // U-HW5-3: a real calendar date in YYYY-MM-DD form, not just a string that
  // parses. Date() will happily accept "2024-02-31" and roll it over to March,
  // so we check that the round-tripped date matches what was typed.
  // DDR-001 fix: bolt built local midnight and compared it in UTC, which
  // rejected every valid date east of UTC and threw on month 13. Building
  // and reading the date in UTC avoids both.
  function isValidRenewalDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    return parsed.getUTCFullYear() === year
      && parsed.getUTCMonth() === month - 1
      && parsed.getUTCDate() === day;
  }

  async function loadNotes() {
    const response = await fetch(api + '/entries');
    if (!response.ok) {
      showError('Could not load your subscriptions (server said ' + response.status + '). Try reloading.');
      return [];
    }
    return response.json();
  }

  async function saveNote(entry) {
    const response = await fetch(api + '/entries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      // The Worker's 400 path sends a short reason in the body. Show it.
      const reason = await response.text();
      showError('Could not save: ' + (reason || response.status) + '. Your entry is still here.');
      return false;
    }
    return true;
  }

  async function deleteNote(id) {
    const response = await fetch(api + '/entries/' + encodeURIComponent(id), { method: 'DELETE' });
    if (!response.ok) {
      showError('Could not delete that subscription. Nothing was changed.');
      return false;
    }
    return true;
  }

  function formatPrice(price) {
    return price.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  }

  // Same UTC rule as the check above, so the day shown is the day stored.
  function formatRenewalDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(undefined, {
      timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  function renderNotes() {
    noteList.replaceChildren();
    emptyState.hidden = notes.length > 0;

    const total = notes.reduce((sum, entry) => sum + entry.price, 0);
    spendTotal.textContent = notes.length > 0
      ? `Total monthly spend: ${formatPrice(total)}`
      : '';

    notes.forEach((note, index) => {
      const listItem = document.createElement('li');
      const noteText = document.createElement('span');
      // textContent, never innerHTML: the server does not get to write HTML into the page either.
      noteText.textContent = `${note.service} — ${formatPrice(note.price)}/mo`;
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete subscription ${index + 1}: ${note.service}`);
      deleteButton.addEventListener('click', async () => {
        try {
          if (!(await deleteNote(note.id))) return;
          await refresh();
          saveStatus.textContent = 'Subscription deleted.';
          noteInput.focus();
        } catch {
          showError('Could not reach the server. Nothing was deleted.');
        }
      });
      listItem.append(noteText, deleteButton);

      // O-HW5-1: show the renewal date alongside the service when one was stored.
      // DDR-001 fix: the Worker stores and returns renewal_date, not renewalDate.
      if (note.renewal_date) {
        const dateLine = document.createElement('time');
        dateLine.className = 'renewal-date';
        dateLine.dateTime = note.renewal_date;
        dateLine.textContent = `Renews ${formatRenewalDate(note.renewal_date)}`;
        listItem.append(dateLine);
      }

      noteList.append(listItem);
    });
  }

  async function refresh() {
    try {
      notes = await loadNotes();
    } catch {
      // The network itself failed (offline, DNS, CORS). fetch throws here.
      showError('Could not reach the server. Your subscriptions are safe; try again shortly.');
      notes = [];
    }
    renderNotes();
  }

  noteForm.addEventListener('submit', async event => {
    event.preventDefault();
    const service = noteInput.value.trim();
    const characterCount = Array.from(service).length;
    const price = Number(priceInput.value);
    const renewalDate = renewalInput.value.trim();

    if (characterCount < 1 || characterCount > 200) {
      noteError.textContent = 'Enter a service name containing 1–200 characters.';
      noteInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      noteInput.focus();
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      noteError.textContent = 'Enter a monthly price greater than 0.';
      priceInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      priceInput.focus();
      return;
    }
    // DDR-001 fix: with type="date", a half-typed date reaches here as an
    // empty value with badInput set; without this it would save with no date.
    if (renewalInput.validity.badInput) {
      noteError.textContent = 'Enter a complete renewal date, or leave it empty.';
      renewalInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      renewalInput.focus();
      return;
    }
    // U-HW5-3: an optional field, but if the user typed something it must be a
    // real YYYY-MM-DD calendar date or the entry is rejected with a reason.
    if (renewalDate && !isValidRenewalDate(renewalDate)) {
      noteError.textContent = 'Enter the renewal date as a real date in YYYY-MM-DD form, or leave it blank.';
      renewalInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      renewalInput.focus();
      return;
    }
    noteInput.removeAttribute('aria-invalid');
    priceInput.removeAttribute('aria-invalid');
    renewalInput.removeAttribute('aria-invalid');
    noteError.textContent = '';

    try {
      // E-HW5-2: send null when no date was entered so the server stores the
      // entry exactly as before, with no date attached.
      // DDR-001 fix: the Worker reads renewal_date (snake_case, like the column).
      const entry = { service, price };
      entry.renewal_date = renewalDate || null;
      if (!(await saveNote(entry))) return;
    } catch {
      showError('Could not reach the server. Your entry is still here; try again.');
      return;
    }
    await refresh();
    noteInput.value = '';
    priceInput.value = '';
    renewalInput.value = '';
    noteInput.focus();
    saveStatus.textContent = 'Subscription saved.';
  });

  refresh();
})();
