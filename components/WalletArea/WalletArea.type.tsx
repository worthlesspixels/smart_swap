import { FriendData } from '../commonInterfaces';

export interface WalletAreaProps {
  //ownerPublicKey: string;
  friend: FriendData;
  onGoBack: () => void;
}
