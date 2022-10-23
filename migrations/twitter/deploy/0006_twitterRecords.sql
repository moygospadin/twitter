-- Deploy twitter:0006_twitterRecords to pg

BEGIN;

create or replace function "isTweetOrRetweetOrComment" ("parentId" uuid, "replyCreatorUserId" uuid)
returns boolean as
$$
begin

  -- if ("parentId" is null) and ("replyCreatorUserId" is null) then
  --   return false;
  -- end if;

  -- if ("parentId" is not null) and ("replyCreatorUserId" is not null) then
  --   return false;
  -- end if;

  -- if ("parentId" is not null) and ("replyCreatorUserId" is null) then
  --   return false;
  -- end if;

  return true;

end;
$$ language PLpgSQL;

create table if not exists "twitterRecords" (
  "authorId"                                uuid,
  "createdAt"                               timestamptz not null default (now() at time zone 'utc'),
  "id"                                      uuid not null default uuid_generate_v4(),
  "isComment"                               boolean not null,
  "parentRecordAuthorId"                    uuid,
  "parentRecordId"                          uuid,
  "text"                                    text,
  "updatedAt"                               timestamptz not null default (now() at time zone 'utc'),
  primary key ("id"),
  foreign key ("authorId") references "users" ("id") on delete set null,
  foreign key ("parentRecordAuthorId") references "users" ("id") on delete set null,
  foreign key ("parentRecordId") references "twitterRecords" ("id") on delete set null
  -- constraint "isTweetConsistent" check (
  --   "isTweetOrRetweetOrComment"("parentId", "replyCreatorUserId")
  -- )
);

 -- nikita tweet(number one)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  'a351a96c-4fa4-42a6-8f6d-ccdf25f28795',
  now(),
  null,
  null,
  'Это мой первый твит, всем приветули',
  now(),
  'b285239b-d82c-42c9-88cc-d61d985b9b44',
  false
);

 -- nikita tweet(number two)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values  ('4aa78144-99e9-42f9-a4ba-7ec00f55ffa9', now(), null, null, 'Второй твит подьехал, меня зовут Никита и я умница большая вот такая вот, котичка золотая', now(), 'b285239b-d82c-42c9-88cc-d61d985b9b44', false);

 -- pavel comment(number three) to tweet (number one)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  'dd3a355b-8b27-450d-85f3-a4147344374f',
  now(),
  /*(number two) tweetId*/'4aa78144-99e9-42f9-a4ba-7ec00f55ffa9',
  /*parentRecordAuthorId nikita*/'b285239b-d82c-42c9-88cc-d61d985b9b44',
  'Чел, да закрой ты уже своё ебало, ну реально заебал, клоун нахуй.',
  now(),
  /*authorId pavel*/'3159f300-f1b0-4e63-b237-747685421d2f',
  true
);

 -- nikita comment(number four) to pavel comment (number three)
insert into "twitterRecords" ("createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  now(), 
  /*(number three) commentId*/'dd3a355b-8b27-450d-85f3-a4147344374f',
  /*parentRecordAuthorId pavel*/'3159f300-f1b0-4e63-b237-747685421d2f',
  'Бля, хуёк, нахуя ты выёбываешься сидя в экране, я тебе сам ебало закрою несколько раз, аутист.',
  now(),
  /*authorId nikita*/'b285239b-d82c-42c9-88cc-d61d985b9b44',
  true
);

 -- alesya tweet(number five)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  '4aa78144-99e9-42f9-a4ba-7ec00f55ffa3',
  now(),
  null,
  null,
  'Гайз, всем привет мои гайзики, айэм воркинг in emap systems, я очень сильный инженер, умею решать много задач, вот такая я вот умная.', 
  now(),
  '3159f300-f1b0-4e63-b237-747685421d2e',
  false
);

 -- alesya tweet(number six)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  '4aa78144-99e9-42f9-a4ba-7ec00f55ffa2',
  now(),
  null,
  null,
  'Епам супер компания, там очень много зарабатывают, вообще мне очень нравится там работать, это самая лучшая компания', 
  now(),
  '3159f300-f1b0-4e63-b237-747685421d2e',
  false
);

 -- alesya tweet(number seven)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  'f753bbf2-42e8-4a87-8d66-0c3a051ca316',
  now(),
  null,
  null,
  'У меня очень много друзей, мы все дружим, обсуждаем программирование там разное, очень много обсуждаем и я помогаю всем всё обсуждать, я умная просто.', 
  now(),
  '3159f300-f1b0-4e63-b237-747685421d2e',
  false
);

 -- nikita comment(number eight) to alesya tweet (number seven)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  '83af6f71-444e-4ebc-b616-9cca3323807f',
  now(), 
  /*(number seven) tweetId*/'f753bbf2-42e8-4a87-8d66-0c3a051ca316',
  /*parentRecordAuthorId alesya*/'3159f300-f1b0-4e63-b237-747685421d2e',
  'АХХАХАХ, пизда, ебать ты ебанулась, иди готовь еду, БАБА = посудомойка, не больше, какое тебе програмирование. Место бабы у плиты.',
  now(),
  /*authorId nikita */'b285239b-d82c-42c9-88cc-d61d985b9b44',
  true
);

 -- pavel comment(number nine) to nikita comment (number eight)
insert into "twitterRecords" ("id", "createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  '7dbd55b8-4370-428b-9ab4-7d60f25cb214',
  now(), 
  /*(number eight) commentId*/'83af6f71-444e-4ebc-b616-9cca3323807f',
  /*parentRecordAuthorId nikita*/'b285239b-d82c-42c9-88cc-d61d985b9b44',
  'Пизда братишка, поддерживаю нахуй, так эту епамовку, на место нахуй поставил.',
  now(),
  /*authorId pavel*/'3159f300-f1b0-4e63-b237-747685421d2f',
  true
);

 -- pavel retweet(number ten) to nikita comment (number eight)
insert into "twitterRecords" ("createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  now(),
  /*(number eight) commentId*/'83af6f71-444e-4ebc-b616-9cca3323807f',
  /*parentRecordAuthorId nikita*/'b285239b-d82c-42c9-88cc-d61d985b9b44',
  null,
  now(),
  /*authorId pavel*/'3159f300-f1b0-4e63-b237-747685421d2f',
  false
);

 -- pavel retweet(number elveven) to nikita tweet (number one)
insert into "twitterRecords" ("createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (
  now(),
  /*(number one) tweetId*/'a351a96c-4fa4-42a6-8f6d-ccdf25f28795',
  /*parentRecordAuthorId nikita*/'3159f300-f1b0-4e63-b237-747685421d2f',
  null,
  now(),
  /*authorId pavel*/'3159f300-f1b0-4e63-b237-747685421d2f',
  false
);

 -- pavel tweet(number twelve)
insert into "twitterRecords" ("createdAt", "parentRecordId", "parentRecordAuthorId", "text", "updatedAt", "authorId", "isComment")
values (now(), null, null, 'Тож сделаю твит, побуду долбоёбом немножко', now(), '3159f300-f1b0-4e63-b237-747685421d2f', false);


COMMIT;
