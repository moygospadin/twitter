-- Deploy twitter:0005_userSessions to pg

BEGIN;

create table if not exists "userSessions" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "createdAt"                               timestamptz not null default (now() at time zone 'utc'),
  "expiredAt"                               timestamptz not null,
  "userId"                                  uuid not null,
  primary key ("id"),
  foreign key ("userId") references "users" ("id") on delete cascade
);

create index index_user_sessions_user_id on "userSessions" ("userId");

COMMIT;
