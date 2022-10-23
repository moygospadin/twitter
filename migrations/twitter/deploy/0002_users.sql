-- Deploy twitter:0002_users to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "users" (
  "id"                                      uuid NOT NULL DEFAULT uuid_generate_v4(),
  "createdAt"                               TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
  "email"                                   VARCHAR NOT NULL,
  "firstName"                               VARCHAR NOT NULL,
  "lastName"                                VARCHAR NOT NULL,
  "password"                                VARCHAR NOT NULL,
  "phoneNumber"                             VARCHAR,
  "updatedAt"                               TIMESTAMPTZ NOT NULL DEFAULT (NOW() at time zone 'utc'),
  PRIMARY KEY ("id"),
  UNIQUE("email")
);

CREATE INDEX index_users_email ON "users" ("email");

insert into users (id, email, "firstName", "lastName", password) 
values ('b285239b-d82c-42c9-88cc-d61d985b9b44', 'nikita.chaikin@innowise-group.com', 'nikita', 'pidorasovich', '7fcda903a90fe3e0f82eca9847365f9c:b3e8305c7f826cc3ef332f8c102a28f5bb978f074efa3239a4dce35cf0ac55c7a6d3c5ebb1e950a066fd8cf1a0118812f18748a52b0f5fb637d5a4b438674657');

insert into users (id, email, "firstName", "lastName", password) 
values ('3159f300-f1b0-4e63-b237-747685421d2f', 'pasha.udaloy@innowise-group.com', 'pavel', 'pidorovich', '7fcda903a90fe3e0f82eca9847365f9c:b3e8305c7f826cc3ef332f8c102a28f5bb978f074efa3239a4dce35cf0ac55c7a6d3c5ebb1e950a066fd8cf1a0118812f18748a52b0f5fb637d5a4b438674657');

insert into users (id, email, "firstName", "lastName", password) 
values ('3159f300-f1b0-4e63-b237-747685421d2e', 'alesya.zhovnerik@innowise-group.com', 'alesya', 'epamovna', '7fcda903a90fe3e0f82eca9847365f9c:b3e8305c7f826cc3ef332f8c102a28f5bb978f074efa3239a4dce35cf0ac55c7a6d3c5ebb1e950a066fd8cf1a0118812f18748a52b0f5fb637d5a4b438674657');

create table "userAvatars" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "key"                                     varchar not null,
  "url"                                     varchar not null,
  "userId"                                  uuid not null,
  primary key ("id"),
  unique("userId"),
  foreign key ("userId") references "users" ("id") on delete cascade
);

insert into "userAvatars" ("key", "url", "userId")
values ('/user-avatars/chaikin/1', 'https://user-avatars/chaikin/1', 'b285239b-d82c-42c9-88cc-d61d985b9b44');

insert into "userAvatars" ("key", "url", "userId")
values ('/user-avatars/udaloy/1', 'https://user-avatars/udaloy/1', '3159f300-f1b0-4e63-b237-747685421d2f');

COMMIT;
