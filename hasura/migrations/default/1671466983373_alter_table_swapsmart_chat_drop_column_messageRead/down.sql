comment on column "swapsmart"."chat"."messageRead" is E'to record chat (text and swap)';
alter table "swapsmart"."chat" alter column "messageRead" set default false;
alter table "swapsmart"."chat" alter column "messageRead" drop not null;
alter table "swapsmart"."chat" add column "messageRead" bool;
