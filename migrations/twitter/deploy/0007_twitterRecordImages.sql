-- Deploy twitter:0007_twitterRecordImages to pg

BEGIN;

create table if not exists "twitterRecordImages" (
  "id"                                      uuid not null default uuid_generate_v4(),
  "key"                                     varchar not null,
  "recordId"                                uuid not null,
  "url"                                     varchar not null,
  primary key ("id"),
  foreign key ("recordId") references "twitterRecords" ("id") on delete cascade
);

insert into "twitterRecordImages" ("key", "url", "recordId")
values ('/record-images/1', 'https://record-images/1', 'a351a96c-4fa4-42a6-8f6d-ccdf25f28795');
insert into "twitterRecordImages" ("key", "url", "recordId")
values ('/record-images/2', 'https://record-images/2', 'a351a96c-4fa4-42a6-8f6d-ccdf25f28795');
insert into "twitterRecordImages" ("key", "url", "recordId")
values ('/record-images/3', 'https://record-images/3', 'a351a96c-4fa4-42a6-8f6d-ccdf25f28795');

insert into "twitterRecordImages" ("key", "url", "recordId")
values ('/record-comment-images/1', 'https://record-comment-images/1', 'f753bbf2-42e8-4a87-8d66-0c3a051ca316');
insert into "twitterRecordImages" ("key", "url", "recordId")
values ('/record-comment-images/2', 'https://record-comment-images/2', 'f753bbf2-42e8-4a87-8d66-0c3a051ca316');

COMMIT;
