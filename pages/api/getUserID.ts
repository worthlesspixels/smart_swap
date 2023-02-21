import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { AXIOS_HEADERS } from './constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  try {
    const username = req.query.username;
    const queryResponse = await axios({
      method: 'POST',
      url: process.env.HASURA_GRAPHQL_ENDPOINT,
      headers: AXIOS_HEADERS,
      data: {
        query: `query MyQuery {
        swapsmart_users(where: {username: {_eq: "${username}"}}) {
          userID
        }
      }`,
      },
    });

    if (queryResponse.data.data.swapsmart_users.length === 0) {
      res.status(404).json({ error: 'user does not exist' });
      return;
    }

    res.status(200).json({ userID: queryResponse.data.data.swapsmart_users[0].userID });
  } catch (error) {
    res.status(400).json({ error: 'internal server error' });
  }
}
