alter table "swapsmart"."users" drop constraint "users_pkey";
alter table "swapsmart"."users"
    add constraint "users_pkey"
    primary key ("userID", "username", "walletPubKey");
