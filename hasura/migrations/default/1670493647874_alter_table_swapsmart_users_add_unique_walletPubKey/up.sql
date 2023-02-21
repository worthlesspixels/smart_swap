alter table "swapsmart"."users" drop constraint "users_username_walletPubKey_userID_key";
alter table "swapsmart"."users" add constraint "users_walletPubKey_key" unique ("walletPubKey");
