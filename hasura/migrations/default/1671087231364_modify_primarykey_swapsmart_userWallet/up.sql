BEGIN TRANSACTION;
ALTER TABLE "swapsmart"."userWallet" DROP CONSTRAINT "userWallet_pkey";

ALTER TABLE "swapsmart"."userWallet"
    ADD CONSTRAINT "userWallet_pkey" PRIMARY KEY ("WalletPubKey");
COMMIT TRANSACTION;
