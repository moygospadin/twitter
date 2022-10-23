-- Deploy twitter:0011_chatMembers to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "chatMembers" (
  "chatId"                                  uuid not null,
  "userId"                                  uuid not null,
  foreign key ("chatId") references "chats" ("id") on delete cascade,
  foreign key ("userId") references "users" ("id") on delete cascade,
  primary key ("chatId", "userId")
);

-- alesya 3159f300-f1b0-4e63-b237-747685421d2e
-- nikita b285239b-d82c-42c9-88cc-d61d985b9b44
-- pasha 3159f300-f1b0-4e63-b237-747685421d2f

insert into "chatMembers" ("chatId", "userId") values
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', 'b285239b-d82c-42c9-88cc-d61d985b9b44'),
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', '3159f300-f1b0-4e63-b237-747685421d2f');

insert into "chatMembers" ("chatId", "userId") values
('3cee28c2-2bc1-4a2d-86a0-74d99228d32d', '3159f300-f1b0-4e63-b237-747685421d2e'),
('3cee28c2-2bc1-4a2d-86a0-74d99228d32d', 'b285239b-d82c-42c9-88cc-d61d985b9b44'),
('3cee28c2-2bc1-4a2d-86a0-74d99228d32d', '3159f300-f1b0-4e63-b237-747685421d2f');

COMMIT;
