import { FriendData } from '../commonInterfaces';

export interface ChatAreaProps {
  friend: FriendData | undefined;
  onShowFriendWallet: (publicKey: string) => void;
  onSendMessage: (message: string) => void;
}

export interface Message {
  textMessage: string;
  senderID: string;
  receiverID: string;
  timestamp: string;
}
