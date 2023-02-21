alter table "swapsmart"."userWallet" alter column "NFTData" set default jsonb_build_object();
ALTER TABLE "swapsmart"."userWallet" ALTER COLUMN "NFTData" TYPE json;
