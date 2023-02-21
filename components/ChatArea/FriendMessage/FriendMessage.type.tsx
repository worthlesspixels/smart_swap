import { UserMessageProps } from '../UserMessage/UserMessage.type';

export interface FriendMessageProps extends UserMessageProps {
  publicKey: string;
  onShowFriendWallet: (publicKey: string) => void;
}
