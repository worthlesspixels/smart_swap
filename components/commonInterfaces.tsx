export interface FriendData {
  img: string;
  name: string;
  isActive: boolean;
  publicKey: string;
  userID: string;
}

export interface FriendData_WithUnreadMessageCount extends FriendData {
  unreadMessageCount: number;
}

export interface UserContextType {
  name: string;
  img: string;
  publicKey: string;
  userID: string;
  isAuthenticated: boolean;
}

export interface loginStateObjType {
  userID: string;
  jwt: string;
}
