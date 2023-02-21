import { UserAssets } from '../solana';
import {
  SELECT_WALLETS_QUERY,
  UPDATE_WALLET_MUTATION,
  UPSERT_WALLET_MUTATION,
} from './graphqlOperations';
import { loginStateObjType } from './types';
import { loginState } from '../state/globalHookState';
import { createApolloClient, createHttpLink } from './constants';
export class Wallet {
  /**
   * This function inserts or updates wallet data for the given user pubkey
   * @param NFTData List of all the user's NFTs
   * @param TokenData List of all the tokens
   * @param UserID User's firebaseID
   * @returns true if the operation is successful and false otherwise
   */
  static async create(pubKey: string, userAssets: UserAssets) {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const httpLink = createHttpLink(loginStateObj);
    const apolloClient = createApolloClient(httpLink);
    const variables = this.generateInsertOrUpdateVariables(
      loginStateObj.userID,
      pubKey,
      userAssets
    );
    const result = await apolloClient.mutate({ mutation: UPSERT_WALLET_MUTATION, variables });

    const { errors, data } = await result.data;
    if (errors) {
      console.log(errors);
      return false;
    }
    console.log(data);
    return true;
  }

  /**
   * This function updates wallet's data
   * @param adminSecret Hasura secret string
   * @param userAssets user's Assets
   * @returns true if success and false incase of any error
   */
  static async update(pubKey: string, userAssets: UserAssets) {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const variables = this.generateInsertOrUpdateVariables(
      loginStateObj.userID,
      pubKey,
      userAssets
    );
    const httpLink = createHttpLink(loginStateObj);
    const apolloClient = createApolloClient(httpLink);
    const result = await apolloClient.mutate({
      mutation: UPDATE_WALLET_MUTATION,
      variables: variables,
    });

    const { errors, data } = await result.data;
    if (errors) {
      console.log(errors);
      return false;
    }
    console.log(data);
    return true;
  }

  /**
   * Get wallets of provided corresponding userIds
   * @param userIDs userId
   * @param JWT JsonWebToken
   * @returns wallet data
   */
  static async getWallets(userIDs: string[]): Promise<UserAssets[]> {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const httpLink = createHttpLink(loginStateObj);
    const apolloClient = createApolloClient(httpLink);
    const result = await apolloClient.query({
      query: SELECT_WALLETS_QUERY,
      variables: { userIDs },
    });

    const { errors, data } = await result.data;
    if (errors) {
      console.log(errors);
      return [];
    }
    //parse strings to JSON
    for (const wallet of data['swapsmart_userWallet']) {
      wallet['NFTData'] = JSON.parse(wallet['NFTData']);
      wallet['TokenData'] = JSON.parse(wallet['TokenData']);
    }
    return data['swapsmart_userWallet'];
  }
  /**
   * For a given user public key and assets object, this funciton returns query variable object
   * @param user
   * @param assets
   * @returns query variables
   */
  static generateInsertOrUpdateVariables(userID: string, pubKey: string, assets: UserAssets) {
    const nfts = JSON.stringify(assets.NFTData);
    const tokens = JSON.stringify(assets.TokenData);
    return {
      NFTData: nfts,
      TokenData: tokens,
      UserID: userID,
      WalletPubKey: pubKey,
    };
  }
}
