SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET escape_string_warning = off;
CREATE SCHEMA swapsmart;
CREATE TABLE swapsmart.users (
    "userID" text NOT NULL,
    username text NOT NULL,
    "walletPubKey" text NOT NULL
);
ALTER TABLE ONLY swapsmart.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userID", "walletPubKey", username);
ALTER TABLE ONLY swapsmart.users
    ADD CONSTRAINT "users_userID_username_wallet_pubkey_key" UNIQUE ("userID", username, "walletPubKey");
