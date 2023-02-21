import { Metaplex } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import {
  AccountLayout,
  approveChecked,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { UserAssets, SwapTransactionParams } from './types';
import fetch from 'cross-fetch';
import Decimal from 'decimal.js';

export const RPC_ENDPOINT_URL =
  process.env.RPC_URL ||
  'https://little-quick-putty.solana-mainnet.discover.quiknode.pro/65e78cdb7158df63d97cbd53f66eebfefdad8683/';

/**
 *For the given wallet address, this function returns all of user's assets
 * @param walletAddr
 * @returns User's assets in JSON format
 */
export async function getUserAssets(walletAddr: string): Promise<UserAssets> {
  const connection = new Connection(RPC_ENDPOINT_URL, 'confirmed');
  const mx = Metaplex.make(connection);
  const userAssets: UserAssets = {
    NFTData: [],
    TokenData: [],
  };

  const owner = new PublicKey(walletAddr);
  const allATAs = await connection.getTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });
  const NFTs = await mx.nfts().findAllByOwner({ owner });

  const ataDataList = new Array();
  for (const ata of allATAs.value) {
    const decodedData = AccountLayout.decode(ata.account.data);
    ataDataList.push({
      ataAddress: ata.pubkey.toBase58(),
      balance: new Decimal(decodedData.amount.toString()).toNumber(),
      mint: decodedData.mint.toBase58(),
    });
  }

  for (const nft of NFTs) {
    const acc = await mx.nfts().findByMetadata({ metadata: nft.address });
    userAssets.NFTData.push({
      name: nft.name,
      URI: nft.uri,
      address: (await getAssociatedTokenAddress(acc.mint.address, owner)).toBase58(),
      mint: acc.mint.address.toBase58(),
    });
  }
  const allTokens = await (await fetch('https://cache.jup.ag/tokens')).json();

  for (const token of allTokens) {
    for (const ataData of ataDataList) {
      if (token.address == ataData.mint && ataData.balance > 0) {
        userAssets.TokenData.push({
          symbol: token.symbol,
          amount: ataData.balance,
          mint: ataData.mint,
          ATA: ataData.ataAddress,
          decimals: token.decimals,
          URI: token.logoURI,
        });
      }
    }
  }
  return userAssets;
}

/**
 * This function takes nft and token lists for 2 users and builds an exchange transaction
 * Maximum number of total swap ass
 * @param params TransactionParams
 */
export async function buildSwapTransaction(
  params: SwapTransactionParams
): Promise<Transaction | undefined> {
  const connection = new Connection(RPC_ENDPOINT_URL, 'confirmed');
  // get the latest blockhash
  const bHash = await connection.getLatestBlockhash();
  const tx = new Transaction({
    blockhash: bHash.blockhash,
    lastValidBlockHeight: bHash.lastValidBlockHeight,
  });

  try {
    // return nothing if the total number of tokens + nft exceed limit
    if (
      params.userANFTs.length +
        params.userATokens.length +
        params.userBNFTs.length +
        params.userBTokens.length >
      7
    ) {
      console.log('TOO MANY TOKENS!');
      return Promise.resolve(undefined);
    }
    for (const nft of params.userANFTs) {
      const receiver = await getOrCreateAssociatedTokenAccount(
        connection,
        params.owner,
        new PublicKey(nft.mint),
        params.userB
      );
      const instruction = createTransferCheckedInstruction(
        new PublicKey(nft.address),
        new PublicKey(nft.mint),
        receiver.address,
        params.owner.publicKey,
        1,
        0
      );
      tx.add(instruction);
    }
    for (const nft of params.userBNFTs) {
      const receiver = await getOrCreateAssociatedTokenAccount(
        connection,
        params.owner,
        new PublicKey(nft.mint),
        params.userA
      );
      const instruction = createTransferCheckedInstruction(
        new PublicKey(nft.address),
        new PublicKey(nft.mint),
        receiver.address,
        params.owner.publicKey,
        1,
        0
      );
      tx.add(instruction);
    }
    for (const token of params.userATokens) {
      console.log(tx.instructions.length);
      const receiver = await getOrCreateAssociatedTokenAccount(
        connection,
        params.owner,
        new PublicKey(token.mint),
        params.userB
      );
      const instruction = createTransferCheckedInstruction(
        new PublicKey(token.ATA),
        new PublicKey(token.mint),
        receiver.address,
        params.owner.publicKey,
        token.amount,
        token.decimals
      );
      tx.add(instruction);
    }
    for (const token of params.userBTokens) {
      const receiver = await getOrCreateAssociatedTokenAccount(
        connection,
        params.owner,
        new PublicKey(token.mint),
        params.userA
      );
      const instruction = createTransferCheckedInstruction(
        new PublicKey(token.ATA),
        new PublicKey(token.mint),
        receiver.address,
        params.owner.publicKey,
        token.amount,
        token.decimals
      );
      tx.add(instruction);
    }
    tx.sign(params.owner);
  } catch (e) {
    console.log('Invalid Data: Error processing transaction data');
    console.log(e);
    return Promise.resolve(undefined);
  }
  return tx;
}
/**
 * Function to delegate an ATA's tokens to a delegate authority
 * @param owner Owner's keypair
 * @param ataAddress Associated Token Account's address
 * @param delegateAuthority Delegate Account's address
 * @param mint Address of the token mint
 * @param amount Amount of tokens to delegate
 * @param decimals token's decimals
 * @returns transaction hash after a confirmed approve transaction or throws an error incase of failed transaction
 */
export async function delegateAccount(
  owner: Keypair,
  ataAddress: PublicKey,
  delegateAuthority: PublicKey,
  mint: PublicKey,
  amount: number,
  decimals: number
): Promise<string> {
  const connection = new Connection(RPC_ENDPOINT_URL, 'confirmed');
  const tx = await approveChecked(
    connection,
    owner,
    mint,
    ataAddress,
    delegateAuthority,
    owner.publicKey,
    amount,
    decimals
  );
  return tx;
}
