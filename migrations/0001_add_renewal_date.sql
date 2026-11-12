-- migrations/0001_add_renewal_date.sql
-- HW5: the deployed HW4 table has no renewal_date column. Run this ONCE
-- against the remote database, BEFORE deploying the HW5 worker.js:
--   npm run db:migrate
-- Existing rows keep their data and get renewal_date = NULL ("not given").
-- Running it a second time fails with "duplicate column name", which is
-- harmless and means the column is already there.
ALTER TABLE entries ADD COLUMN renewal_date TEXT;
