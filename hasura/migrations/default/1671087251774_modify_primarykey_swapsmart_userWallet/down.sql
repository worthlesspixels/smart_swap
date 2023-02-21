alter table "swapsmart"."userWallet" drop constraint "userWallet_pkey";
alter table "swapsmart"."userWallet"
    add constraint "userWallet_pkey"
    primary key ("WalletPubKey");
