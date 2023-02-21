import { FriendData_WithUnreadMessageCount } from '../../commonInterfaces';

export interface FriendProps {
  friendData: FriendData_WithUnreadMessageCount;
  onClick: (publicKey: string) => void;
  className?: string;
}
