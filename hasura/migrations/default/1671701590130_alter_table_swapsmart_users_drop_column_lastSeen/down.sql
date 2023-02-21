alter table "swapsmart"."users" alter column "lastSeen" drop not null;
alter table "swapsmart"."users" add column "lastSeen" timestamptz;
