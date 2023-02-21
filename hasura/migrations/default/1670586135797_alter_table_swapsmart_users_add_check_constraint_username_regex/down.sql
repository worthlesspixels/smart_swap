alter table "swapsmart"."users" drop constraint "username_regex";
alter table "swapsmart"."users" add constraint "username_length" check (CHECK (char_length(username) >= 3 AND char_length(username) <= 20));
