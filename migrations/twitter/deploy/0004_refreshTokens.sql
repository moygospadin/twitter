-- Deploy twitter:0004_refreshTokens to pg

BEGIN;

create table if not exists "refreshTokens" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "createdAt"                               timestamptz not null default (now() at time zone 'utc'),
  "expiredAt"                               timestamptz not null,
  "userId"                                  uuid not null,
  primary key ("id"),
  foreign key ("userId") references "users" ("id") on delete cascade
);

create index index_refresh_tokens_user_id on "refreshTokens" ("userId");

COMMIT;
