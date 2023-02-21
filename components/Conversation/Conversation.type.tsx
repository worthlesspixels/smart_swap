import { FriendData_WithUnreadMessageCount } from '../commonInterfaces';

export type showArea = 'chat' | 'wallet';

export interface ConversationProps {
  name: string;
  id: string;
  inDevelopmentDialog: () => void;
  addUserDialog: () => void;
  setPotentialFriends: (friends: FriendData_WithUnreadMessageCount[]) => void;
  newAddedFriendUserID: string;
}

export interface friendMetaData {
  userID: string;
  username: string;
  walletPubkey: string;
  avatar?: string;
}
