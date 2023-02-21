import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessageMutation($receiverID: String!, $senderID: String, $message: String!) {
    insert_swapsmart_chat_one(
      object: { receiverID: $receiverID, senderID: $senderID, textMessage: $message, type: "text" }
      on_conflict: { constraint: chat_pkey }
    ) {
      id
      timestamp
    }
  }
`;

export const GET_MESSAGES_QUERY = gql`
  query GetMessagesQuery {
    swapsmart_chat(order_by: { timestamp: asc }) {
      id
      receiverID
      senderID
      swapMessage
      textMessage
      timestamp
      type
    }
  }
`;

export const GET_MESSAGES_SUBSCRIPTION = gql`
  subscription GetMessagesSubscription {
    swapsmart_chat {
      id
      textMessage
      timestamp
      senderID
      receiverID
      swapMessage
      type
    }
  }
`;

export const GET_UNREAD_MSG_SUBSCRIPTION = gql`
  subscription GetAllNumberOfUnreadMsgSubscription($receiverID: String!) {
    swapsmart_unread_messages_count(where: { receiverID: { _eq: $receiverID } }) {
      messageCount
      senderID
    }
  }
`;
export const GET_CHAT_RECEIVER_IDS = gql`
  subscription getAllConvoUserIDs($senderID: String!) {
    swapsmart_unread_messages_count(where: { senderID: { _eq: $senderID } }) {
      receiverID
    }
  }
`;

export const MARK_ALL_MESSAGES_AS_READ = `
  mutation MarkAllMessagesAsRead($senderID: String!, $receiverID: String!) {
    update_swapsmart_unread_messages_count(
      where: { _and: [{ senderID: { _eq: $senderID } }, { receiverID: { _eq: $receiverID } }] }
      _set: { messageCount: 0 }
    ) {
      returning {
        messageCount
      }
    }
  }
`;

export const GET_MESSGES_PER_USER_SUBSCRIPTION = gql`
  subscription GetMessagesPerUserSubscription($otherUserID: String!, $limit: Int!) {
    swapsmart_chat(
      where: { _or: [{ senderID: { _eq: $otherUserID } }, { receiverID: { _eq: $otherUserID } }] }
      limit: $limit
      order_by: { timestamp: asc }
    ) {
      senderID
      receiverID
      swapMessage
      textMessage
      timestamp
      type
    }
  }
`;

export const GET_ALL_USERS_SUBSCRIPTION = gql`
  subscription getAllUsersSubscription {
    swapsmart_users {
      userID
      username
      walletPubkey
    }
  }
`;

export const WALLETPUBKEY_EXISTS_QUERY = `query WalletPubkeyExistsQuery($walletPubkey: String!) {
    swapsmart_users(where: {walletPubkey: {_eq: $walletPubkey}}) {
      walletPubkey
    }
  }`;

export const INSERT_USER_MUTATION = `mutation InsertUserMutation($userID: String!, $username: String!, $walletPubkey: String!) {
    insert_swapsmart_users_one(object: {userID: $userID, username: $username, walletPubkey: $walletPubkey}) {
      userID
    }
  }`;
export const UPDATE_WALLET_MUTATION = gql`
  mutation updateWalletMutation($NFTData: String, $TokenData: String, $UserID: String!) {
    update_swapsmart_userWallet_by_pk(
      pk_columns: { UserID: $UserID }
      _set: { NFTData: $NFTData, TokenData: $TokenData }
    ) {
      NFTData
      TokenData
    }
  }
`;
export const UPSERT_WALLET_MUTATION = gql`
  mutation upsertWalletMutation(
    $NFTData: String
    $TokenData: String
    $UserID: String
    $WalletPubKey: String
  ) {
    insert_swapsmart_userWallet_one(
      object: {
        NFTData: $NFTData
        TokenData: $TokenData
        UserID: $UserID
        WalletPubKey: $WalletPubKey
      }
      on_conflict: { constraint: userWallet_pkey, where: {}, update_columns: [NFTData, TokenData] }
    ) {
      UserID
      NFTData
      TokenData
    }
  }
`;

export const SELECT_WALLETS_QUERY = gql`
  query getWallets($userIDs: [String!]) {
    swapsmart_userWallet(where: { UserID: { _in: $userIDs } }) {
      WalletPubKey
      UserID
      NFTData
      TokenData
    }
  }
`;
export const UPDATE_AVATAR_MUTATION = gql`
  mutation updateAvatar($userID: String!, $avatar: String!) {
    update_swapsmart_users_by_pk(pk_columns: { userID: $userID }, _set: { avatar: $avatar }) {
      userID
    }
  }
`;

export const GET_AVATAR_QUERY = gql`
  query getAvatarQuery($userID: String!) {
    swapsmart_users(where: { userID: { _eq: $userID } }) {
      avatar
    }
  }
`;

export const USERNAME_EXISTS_QUERY = `query searchUsername($userName: String) {
  swapsmart_users(where: {username: {_eq: $userName}}) {
    userID
    username
  }
}`;

export const SEND_TIMESTAMP_MUTATION = gql`
  mutation updateTimestampMutation($userID: String!) {
    update_swapsmart_users_by_pk(pk_columns: { userID: $userID }, _set: { lastSeen: "now()" }) {
      userID
    }
  }
`;
export const GET_ONLINE_USERS_SUBSCRIPTION = gql`
  subscription {
    swapsmart_user_online(order_by: { userID: asc }) {
      userID
    }
  }
`;
