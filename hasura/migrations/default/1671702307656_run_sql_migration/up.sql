CREATE OR REPLACE VIEW swapsmart."user_online" AS 
 SELECT "users"."userID",
    "users"."username",
    "users"."lastSeen"
   FROM swapsmart.users
  WHERE (users."lastSeen" > (now() - '00:00:10'::interval));
