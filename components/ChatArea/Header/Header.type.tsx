import { FriendData } from '../../commonInterfaces';
export interface HeaderProps {
  friend: FriendData | undefined;
  onShowFriendWallet: (publicKey: string) => void;
}
