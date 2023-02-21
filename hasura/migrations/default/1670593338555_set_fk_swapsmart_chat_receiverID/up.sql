alter table "swapsmart"."chat"
  add constraint "chat_receiverID_fkey"
  foreign key ("receiverID")
  references "swapsmart"."users"
  ("userID") on update restrict on delete restrict;
