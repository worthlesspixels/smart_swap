import base58 from 'bs58';
import axios from 'axios';
import { createApolloClient, createHttpLink, FIREBASE_CONFIG, header } from './constants';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  SEND_MESSAGE_MUTATION,
  GET_MESSAGES_QUERY,
  UPDATE_AVATAR_MUTATION,
  GET_AVATAR_QUERY,
  GET_ALL_USERS_SUBSCRIPTION,
  MARK_ALL_MESSAGES_AS_READ,
  SEND_TIMESTAMP_MUTATION,
} from './graphqlOperations';

import { loginState } from '../state/globalHookState';
import { loginStateObjType } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

initializeApp(FIREBASE_CONFIG);

export class User {
  static apolloClient: ApolloClient<NormalizedCacheObject>;
  static loginTokenSubscription: NodeJS.Timer;
  static timestampSubscription: NodeJS.Timer;

  static async create(
    username: string,
    walletPubkey: Uint8Array,
    signMessage: (message: Uint8Array) => Promise<Uint8Array>
  ) {
    const walletPubkeyBase58 = base58.encode(walletPubkey);
    const message = new TextEncoder().encode(walletPubkeyBase58);
    const signature = await signMessage(message);

    var response: any;
    try {
      response = await axios({
        method: 'POST',
        url: '/api/createUser',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          username: username,
          walletPubkey: base58.encode(walletPubkey),
          signature: base58.encode(signature),
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { error: 'request timedout' };
      } else {
        return error.message;
      }
    }
  }

  static async login(
    username: string,
    walletPubkey: Uint8Array,
    signMessage: (message: Uint8Array) => Promise<Uint8Array>
  ) {
    try {
      const walletPubkeyBase58 = base58.encode(walletPubkey);
      const message = new TextEncoder().encode(walletPubkeyBase58);
      const signature = await signMessage(message);
      const email = `${username}@swapsmart.com`;
      const auth = getAuth();

      const loginAck = await signInWithEmailAndPassword(auth, email, base58.encode(signature));

      if (!loginAck) {
        return { error: 'acknowledgement not received' };
      }

      loginState.set({
        jwt: await loginAck.user.getIdToken(),
        userID: loginAck.user.uid,
      });
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;

      const httpLink = createHttpLink(loginStateObj);
      this.apolloClient = createApolloClient(httpLink);
      console.log(loginState.get());

      // set token refresh interval
      this.loginTokenSubscription = setInterval(() => {
        this.refreshToken();
      }, 3600000);
      // set timestamp update interval
      this.timestampSubscription = setInterval(() => {
        this.updateTimestamp();
      }, 10000);
      return { data: loginAck };
    } catch (error: any) {
      return { error: error.code };
    }
  }

  static async logout() {
    try {
      if (this.loginTokenSubscription) {
        clearInterval(this.loginTokenSubscription);
        clearInterval(this.timestampSubscription);
      }
      const auth = getAuth();
      signOut(auth);
      loginState.set({
        jwt: '',
        userID: '',
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  static async sendMessage(receiverID: string, message: string) {
    try {
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
      const apolloResponse = await this.apolloClient.mutate({
        mutation: SEND_MESSAGE_MUTATION,
        variables: {
          receiverID,
          senderID: loginStateObj.userID,
          message: message,
        },
      });
      return apolloResponse.data;
    } catch (error) {
      return { error: error };
    }
  }

  static async setAvatar(imageBytes: string) {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const apolloResponse = await this.apolloClient.mutate({
      mutation: UPDATE_AVATAR_MUTATION,
      variables: {
        userID: loginStateObj.userID,
        avatar: imageBytes,
      },
    });
    return apolloResponse.data;
  }

  static async getAvatar(): Promise<string> {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const apolloResponse = await this.apolloClient.mutate({
      mutation: GET_AVATAR_QUERY,
      variables: {
        userID: loginStateObj.userID,
      },
    });
    return apolloResponse.data['swapsmart_users'][0]['avatar'];
  }

  static async getAllUsers() {
    try {
      interface loginStateObjType {
        userID: string;
        jwt: string;
      }
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;

      const axiosResponse = await axios({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
        headers: header(loginStateObj.jwt),
        data: {
          query: GET_ALL_USERS_SUBSCRIPTION,
        },
      });
      return axiosResponse.data;
    } catch (error) {
      return undefined;
    }
  }

  static async markAllAsRead(otherUserID: string) {
    try {
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;

      const axiosResponse = await axios({
        method: 'POST',
        url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
        headers: header(loginStateObj.jwt),
        data: {
          query: MARK_ALL_MESSAGES_AS_READ,
          variables: {
            receiverID: loginStateObj.userID,
            senderID: otherUserID,
          },
        },
      });
      return axiosResponse.data;
    } catch (error) {
      return undefined;
    }
  }
  // --- private functions ---
  private static async refreshToken() {
    const auth = getAuth();
    const token = await auth.currentUser?.getIdToken(true);
    loginState.set({
      jwt: token,
      userID: auth.currentUser!.uid,
    });
    console.log(loginState.get());
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;

    // recreate the apolloClient object using the new token
    const httpLink = createHttpLink(loginStateObj);
    this.apolloClient = createApolloClient(httpLink);
  }
  private static async updateTimestamp() {
    const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
    const apolloResponse = await this.apolloClient.mutate({
      mutation: SEND_TIMESTAMP_MUTATION,
      variables: {
        userID: loginStateObj.userID,
      },
    });
    return apolloResponse.data;
  }
}
