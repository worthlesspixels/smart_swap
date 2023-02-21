alter table "swapsmart"."userWallet" add column "WalletPubKey" text
 not null unique default '""';
