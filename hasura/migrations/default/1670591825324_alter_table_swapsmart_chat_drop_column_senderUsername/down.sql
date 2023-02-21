comment on column "swapsmart"."chat"."senderUsername" is E'to record chat (text and swap)';
alter table "swapsmart"."chat" alter column "senderUsername" drop not null;
alter table "swapsmart"."chat" add column "senderUsername" text;
