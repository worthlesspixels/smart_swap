alter table "swapsmart"."users" add column "lastSeen" timestamptz
 null default now();
