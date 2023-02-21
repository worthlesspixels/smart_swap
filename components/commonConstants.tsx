import { HttpLink } from '@apollo/client';

export const validUsernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
});

export const messagesPerUserQuery = 100;
