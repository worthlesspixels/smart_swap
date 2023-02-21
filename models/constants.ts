import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import WebSocket from 'isomorphic-ws';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyATbkDDHoFl54leRLocv7tt9o014O1TVdc',
  authDomain: 'swapsmart-e5472.firebaseapp.com',
  projectId: 'swapsmart-e5472',
  storageBucket: 'swapsmart-e5472.appspot.com',
  messagingSenderId: '28932773111',
  appId: '1:28932773111:web:0fa72b0a258785ecd3aff2',
};

export const header = (bearerToken: string) => ({
  'content-type': 'application/json',
  Authorization: `Bearer ${bearerToken}`,
});

export const createApolloClient = (splitLink: any) => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export const createHttpLink = (loginStateObj: any) => {
  return new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${loginStateObj.jwt}`,
    },
  });
};
