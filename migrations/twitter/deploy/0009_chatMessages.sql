-- Deploy twitter:0009_chatMessages to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "chatsMessages" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "chatId"                                  uuid not null,
  "createdAt"                               timestamptz not null default (now() at time zone 'utc'),
  "replyToMessageId"                        uuid,
  "text"                                    text,
  "updatedAt"                               timestamptz not null default (now() at time zone 'utc'),
  "userId"                                  uuid,
  foreign key ("chatId") references "chats" ("id") on delete set null,
  foreign key ("replyToMessageId") references "chatsMessages" ("id") on delete set null,
  foreign key ("userId") references "users" ("id") on delete set null,
  primary key ("id")
);

-- alesya 3159f300-f1b0-4e63-b237-747685421d2e
-- nikita b285239b-d82c-42c9-88cc-d61d985b9b44
-- pasha 3159f300-f1b0-4e63-b237-747685421d2f

-- add messages to PRIATE chat betweet pasha and nikita
insert into "chatsMessages" ("chatId", "replyToMessageId", "text", "userId") values 
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', null, 'Здарова Никитос', '3159f300-f1b0-4e63-b237-747685421d2f'),
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', null, 'Привет Паш, чё ты, еще не сдох???', 'b285239b-d82c-42c9-88cc-d61d985b9b44'),
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', null, 'А чё мне сдыхать то, у меня всё отлично, это ты же любишь есть говно', '3159f300-f1b0-4e63-b237-747685421d2f'),
('d21afdf1-5039-417b-b20f-f01e5b08ffe1', null, '.... даунич колхозный', 'b285239b-d82c-42c9-88cc-d61d985b9b44');

-- add messages to GROUP chat betweet pasha and nikita and alesya
insert into "chatsMessages" ("id", "chatId", "replyToMessageId", "text", "userId") values
('730ae4de-8d62-42d3-b0e3-79067cf3e90d', '3cee28c2-2bc1-4a2d-86a0-74d99228d32d', null, 'Привет епамовским ебанашкам', '3159f300-f1b0-4e63-b237-747685421d2f'),
('6f69d01f-6a0d-4abc-92da-a5655c96e2cd', '3cee28c2-2bc1-4a2d-86a0-74d99228d32d', null, 'Паш, ну зачем ты так? Я же просил тебя не говорить так про нее', 'b285239b-d82c-42c9-88cc-d61d985b9b44'),
('67fa65fc-6afe-4997-8816-e6365f0d46ad', '3cee28c2-2bc1-4a2d-86a0-74d99228d32d', '730ae4de-8d62-42d3-b0e3-79067cf3e90d', 'Удалой, ты в своём репертуаре, клоун ебанный с галеры инновайз', '3159f300-f1b0-4e63-b237-747685421d2e');

COMMIT;
