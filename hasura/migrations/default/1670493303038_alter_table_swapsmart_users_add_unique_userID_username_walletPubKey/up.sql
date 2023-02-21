alter table "swapsmart"."users" drop constraint "users_userID_username_wallet_pubkey_key";
alter table "swapsmart"."users" add constraint "users_userID_username_walletPubKey_key" unique ("userID", "username", "walletPubKey");
