alter table "swapsmart"."users" add constraint "username_regex" check (CHECK (username ~* '^[a-zA-Z0-9]{3,20}$'::text));
