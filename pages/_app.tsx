import '../styles/globals.css';
import type { AppProps } from 'next/app';
import WalletContext from '../components/WalletContext/WalletContext';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SAMPLE_IMAGE } from '../assets/testingData/testingData';
import { UserContextType } from '../components/commonInterfaces';
import { useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import WebSocket from 'isomorphic-ws';
import { loginState } from '../state/globalHookState';
import { httpLink } from '../components/commonConstants';

import { useHookstate } from '@hookstate/core';
import { loginStateObjType } from '../models/types';

const PlaceholderUser: UserContextType = {
  img: SAMPLE_IMAGE,
  name: 'khilji',
  publicKey: 'AqDhjawesvbaaasvdgbADhjjhffJKGYyFv HJjFcacsdJ1243TRDVSFW34ERFER',
  userID: '123',
  isAuthenticated: false,
};
const PlaceholderSetUser: Dispatch<SetStateAction<UserContextType>> = () => {};

export const userContext = createContext({
  user: PlaceholderUser,
  setUser: PlaceholderSetUser,
});

export default function App({ Component, pageProps }: AppProps) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
  });

  const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;

  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WS_ENDPOINT!!,
      webSocketImpl: WebSocket,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${loginStateObj.jwt}`,
        },
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
  const [user, setUser] = useState<UserContextType>(PlaceholderUser);
  const loginStateLocal = useHookstate(loginState);

  useEffect(() => {}, [loginStateLocal]);

  return (
    <div className="bg-[#1F1F1F]">
      <userContext.Provider value={{ user, setUser }}>
        <ApolloProvider client={client}>
          <WalletContext>
            <Component {...pageProps} />
          </WalletContext>
        </ApolloProvider>
      </userContext.Provider>
    </div>
  );
}
