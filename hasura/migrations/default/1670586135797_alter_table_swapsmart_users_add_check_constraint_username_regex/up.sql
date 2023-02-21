alter table "swapsmart"."users" drop constraint "username_length";
alter table "swapsmart"."users" add constraint "username_regex" check (username ~* '^[a-zA-Z0-9]{3,20}$');
