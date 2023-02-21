alter table "swapsmart"."users" drop constraint "users_userID_username_walletPubKey_key";
alter table "swapsmart"."users" add constraint "users_username_walletPubKey_userID_key" unique ("username", "walletPubKey", "userID");
