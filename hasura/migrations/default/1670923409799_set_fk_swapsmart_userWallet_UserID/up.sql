alter table "swapsmart"."userWallet"
  add constraint "userWallet_UserID_fkey"
  foreign key ("UserID")
  references "swapsmart"."users"
  ("walletPubkey") on update restrict on delete restrict;
