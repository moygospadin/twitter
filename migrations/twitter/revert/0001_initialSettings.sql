-- Revert twitter:0001_initialSettings from pg

BEGIN;

DROP SCHEMA public cascade;
CREATE SCHEMA public;

COMMIT;
