alter table "swapsmart"."userWallet" drop constraint "userWallet_UserID_fkey",
  add constraint "userWallet_UserID_fkey"
  foreign key ("UserID")
  references "swapsmart"."users"
  ("userID") on update restrict on delete restrict;
