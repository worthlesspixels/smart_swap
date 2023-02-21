BEGIN TRANSACTION;
ALTER TABLE "swapsmart"."users" DROP CONSTRAINT "users_pkey";

ALTER TABLE "swapsmart"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("userID");
COMMIT TRANSACTION;
