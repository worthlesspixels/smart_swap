import firebaseAdmin from 'firebase-admin';
import axios from 'axios';
import base58 from 'bs58';
import { getAuth } from 'firebase-admin/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'tweetnacl';
import { AXIOS_HEADERS } from './constants';
import firebaseCreds from './firebase-creds.json';
import {
  WALLETPUBKEY_EXISTS_QUERY,
  INSERT_USER_MUTATION,
  USERNAME_EXISTS_QUERY,
} from '../../models/graphqlOperations';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseCreds as firebaseAdmin.ServiceAccount),
  });
}

interface CreateUserParams {
  username: string;
  walletPubkey: string;
  signature: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const { username, walletPubkey, signature } = req.body as CreateUserParams;

  if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
    res.status(400).json({ error: 'invalid username' });
    return;
  }

  const walletPubkeyBuffer = base58.decode(walletPubkey);
  if (
    !sign.detached.verify(
      new TextEncoder().encode(walletPubkey),
      base58.decode(signature),
      walletPubkeyBuffer
    )
  ) {
    res.status(400).json({ error: 'invalid signature' });
    return;
  }

  var queryResponse = await axios({
    method: 'POST',
    url: process.env.HASURA_GRAPHQL_ENDPOINT,
    headers: AXIOS_HEADERS,
    data: {
      query: WALLETPUBKEY_EXISTS_QUERY,
      variables: {
        walletPubkey,
      },
    },
  });

  if (queryResponse.data.data.swapsmart_users.length !== 0) {
    res.status(400).json({ error: 'wallet public key exists' });
    return;
  }

  queryResponse = await axios({
    method: 'POST',
    url: process.env.HASURA_GRAPHQL_ENDPOINT,
    headers: AXIOS_HEADERS,
    data: {
      query: USERNAME_EXISTS_QUERY,
      variables: {
        userName: username,
      },
    },
  });

  if (queryResponse.data.data.swapsmart_users.length !== 0) {
    res.status(400).json({ error: 'username exists' });
    return;
  }

  const userRecord = await getAuth().createUser({
    email: `${username}@swapsmart.com`,
    password: signature,
  });

  const mutationResponse = await axios({
    method: 'POST',
    url: process.env.HASURA_GRAPHQL_ENDPOINT,
    headers: AXIOS_HEADERS,
    data: {
      query: INSERT_USER_MUTATION,
      variables: {
        userID: userRecord.uid,
        username: username,
        walletPubkey: walletPubkey,
      },
    },
  });

  if (mutationResponse.data.errors) {
    res.status(500).json({ error: 'internal server error' });
    return;
  }

  res.status(200).json({ data: 'success' });
}
