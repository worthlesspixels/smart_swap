alter table "swapsmart"."userWallet" alter column "TokenData" set default json_build_object();
ALTER TABLE "swapsmart"."userWallet" ALTER COLUMN "TokenData" TYPE json;
