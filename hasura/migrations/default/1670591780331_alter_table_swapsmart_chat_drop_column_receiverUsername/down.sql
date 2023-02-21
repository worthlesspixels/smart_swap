comment on column "swapsmart"."chat"."receiverUsername" is E'to record chat (text and swap)';
alter table "swapsmart"."chat" alter column "receiverUsername" drop not null;
alter table "swapsmart"."chat" add column "receiverUsername" text;
