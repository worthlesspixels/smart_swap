alter table "swapsmart"."chat"
  add constraint "chat_senderID_fkey"
  foreign key ("senderID")
  references "swapsmart"."users"
  ("userID") on update restrict on delete restrict;
