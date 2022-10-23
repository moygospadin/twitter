-- Deploy twitter:0003_userSocialMediaProfileLinks to pg

BEGIN;

create table if not exists "userSocialMediaProfileLinks" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "name"                                    varchar not null,
  "url"                                     varchar not null,
  "userId"                                  uuid not null,
  primary key ("id"),
  foreign key ("userId") references "users" ("id") on delete cascade
);

COMMIT;
