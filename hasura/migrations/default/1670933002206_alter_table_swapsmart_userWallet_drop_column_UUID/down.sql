alter table "swapsmart"."userWallet" alter column "UUID" set default gen_random_uuid();
alter table "swapsmart"."userWallet" alter column "UUID" drop not null;
alter table "swapsmart"."userWallet" add column "UUID" uuid;
