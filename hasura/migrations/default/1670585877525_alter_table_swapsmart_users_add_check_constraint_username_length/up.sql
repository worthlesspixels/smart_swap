alter table "swapsmart"."users" add constraint "username_length" check (char_length(username) >= 3 AND char_length(username) <= 20 );
