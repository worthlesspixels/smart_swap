import { Keypair, PublicKey } from '@solana/web3.js';

/* eslint-disable prettier/prettier */
export interface UserAssets {
  NFTData: NFTData[];
  TokenData: TokenData[];
}

export type NFTData = {
  //non-fungible
  name: string;
  address: string;
  mint: string;
  URI?: string;
};

export type TokenData = {
  //fungable
  symbol: string;
  mint: string;
  ATA: string;
  amount: number;
  decimals: number;
  URI?: string;
};

export type SwapTransactionParams = {
  owner: Keypair;
  userA: PublicKey;
  userB: PublicKey;
  userANFTs: NFTData[];
  userATokens: TokenData[];
  userBNFTs: NFTData[];
  userBTokens: TokenData[];
};
