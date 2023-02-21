import { FriendData_WithUnreadMessageCount } from '../commonInterfaces';

export interface ConversationSideBarProps {
  onInviteLinklClick: () => void;
  onAddFriendClick: () => void;
  onUserSettingsClick: () => void;
  friendsList: FriendData_WithUnreadMessageCount[];
  conversationName: string;
  getCurrentFriend: (publicKey: string) => void;
  forcedRenderBoolean: boolean;
}
