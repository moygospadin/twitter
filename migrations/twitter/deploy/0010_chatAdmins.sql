-- Deploy twitter:0010_chatAdmins to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "chatAdmins" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "chatId"                                  uuid not null,
  "type"                                    varchar not null,
  "userId"                                  uuid not null,
  foreign key ("chatId") references "chats" ("id") on delete cascade,
  foreign key ("userId") references "users" ("id") on delete cascade,
  primary key ("id")
);

-- alesya 3159f300-f1b0-4e63-b237-747685421d2e
-- nikita b285239b-d82c-42c9-88cc-d61d985b9b44
-- pasha 3159f300-f1b0-4e63-b237-747685421d2f

insert into "chatAdmins" ("chatId", "type", "userId") values (
  'd21afdf1-5039-417b-b20f-f01e5b08ffe1',
  'owner',
  '3159f300-f1b0-4e63-b237-747685421d2f'
);

insert into "chatAdmins" ("chatId", "type", "userId") values (
  '3cee28c2-2bc1-4a2d-86a0-74d99228d32d',
  'owner',
  '3159f300-f1b0-4e63-b237-747685421d2f'
);

COMMIT;
