-- Deploy twitter:0008_chats to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "chats" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "createdAt"                               timestamptz not null default (now() at time zone 'utc'),
  "title"                                   varchar,
  "type"                                    varchar not null,
  "updatedAt"                               timestamptz not null default (now() at time zone 'utc'),
  primary key ("id")
);

-- alesya 3159f300-f1b0-4e63-b237-747685421d2e
-- nikita b285239b-d82c-42c9-88cc-d61d985b9b44
-- pasha 3159f300-f1b0-4e63-b237-747685421d2f

-- pasha's chat with nikita
insert into "chats" ("id", "title", "type") values (
  'd21afdf1-5039-417b-b20f-f01e5b08ffe1',
  'My first chat with nikita',
  'private'
);

-- pasha's chat with alesya and nikita
insert into "chats" ("id", "title", "type") values (
  '3cee28c2-2bc1-4a2d-86a0-74d99228d32d',
  'My first chat with alesya and nikita',
  'group'
);

COMMIT;
