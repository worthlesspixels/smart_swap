import React, { useContext } from 'react';
import { ConversationProps, friendMetaData } from './Conversation.type';
import ConversationSideBar from '../ConversationSideBar/ConversationSideBar';
import ChatArea from '../ChatArea/ChatArea';
import { FC } from 'react';
import { useState, useEffect } from 'react';
import { FriendData_WithUnreadMessageCount } from '../commonInterfaces';
import { showArea } from './Conversation.type';
import WalletArea from '../WalletArea/WalletArea';
import { User } from '../../models/User';
import {
  GET_UNREAD_MSG_SUBSCRIPTION,
  GET_CHAT_RECEIVER_IDS,
  GET_ALL_USERS_SUBSCRIPTION,
  GET_ONLINE_USERS_SUBSCRIPTION,
} from '../../models/graphqlOperations';
import { useSubscription } from '@apollo/client';
import { userContext } from '../../pages/_app';
import { IMAGE_PLACEHOLDER } from '../../assets/data/data';

// user conversation id to fetch all friends - current user logged in which i can see using use Context
const Conversation: FC<ConversationProps> = ({
  name,
  id,
  newAddedFriendUserID,
  inDevelopmentDialog,
  addUserDialog,
  setPotentialFriends,
}) => {
  const { user, setUser } = useContext(userContext);
  const usersIDWhoHaventMassegedMeSubscription = useSubscription(GET_CHAT_RECEIVER_IDS, {
    variables: { senderID: user.userID },
  });
  const unredMessageSubsription = useSubscription(GET_UNREAD_MSG_SUBSCRIPTION, {
    variables: { receiverID: user.userID },
  });
  const allUsersSubscription = useSubscription(GET_ALL_USERS_SUBSCRIPTION);
  const onlineUsersSubscription = useSubscription(GET_ONLINE_USERS_SUBSCRIPTION);

  //let allUsers: any[] = [];
  const [allUsers, setAllUsers] = useState<friendMetaData[]>([]);
  const [friends, setFriends] = useState<FriendData_WithUnreadMessageCount[]>([]);
  const [show, setShow] = useState<showArea>('chat');
  const [updateFreinds, setUpdateFriends] = useState<boolean>(false);
  const [renderSideBarBoolen, setRenderSideBarBoolen] = useState<boolean>(false);
  const [friendPublicKey, setFriendPublicKey] = useState<string | undefined>(undefined);
  const [selectedFriend, setSelectedFriend] = useState<
    FriendData_WithUnreadMessageCount | undefined
  >(undefined);

  const sendMessage = async (sendTo: string, message: string) => {
    await User.sendMessage(sendTo, message);
  };
  //let renderSideBarBoolen = false;
  useEffect(() => {
    if (newAddedFriendUserID !== '') {
      User.sendMessage(newAddedFriendUserID, 'Waddup');
      setRenderSideBarBoolen(!renderSideBarBoolen);
      setUpdateFriends(true);
    }
  }, [newAddedFriendUserID]);
  useEffect(() => {
    console.log('this was called');
    if (
      (unredMessageSubsription.loading === false &&
        allUsersSubscription.loading === false &&
        usersIDWhoHaventMassegedMeSubscription.loading === false) ||
      updateFreinds
    ) {
      console.log('all users data: ', allUsersSubscription.data);
      setAllUsers(allUsersSubscription.data ? allUsersSubscription.data.swapsmart_users : allUsers);
      setUpdateFriends(true);
    }
  }, [unredMessageSubsription, allUsersSubscription]);

  useEffect(() => {
    if (allUsers.length > 0 && updateFreinds) {
      const usersIDWhoHaventMassegedMe = usersIDWhoHaventMassegedMeSubscription.data
        ? usersIDWhoHaventMassegedMeSubscription.data.swapsmart_unread_messages_count
        : [];
      const usersIDWhoHaventMassegedMeList: FriendData_WithUnreadMessageCount[] =
        usersIDWhoHaventMassegedMe &&
        allUsers &&
        usersIDWhoHaventMassegedMe.map((friend: { receiverID: any }) => {
          const user = allUsers.find((user: friendMetaData) => user.userID === friend.receiverID);
          return {
            img: user?.avatar ?? IMAGE_PLACEHOLDER,
            name: user?.username ?? '',
            isActive: false,
            publicKey: user?.walletPubkey ?? '',
            userID: user?.userID ?? '',
            unreadMessageCount: 0,
          };
        });
      const friendsData = unredMessageSubsription.data
        ? unredMessageSubsription.data.swapsmart_unread_messages_count
        : [];
      //
      const friendsList: FriendData_WithUnreadMessageCount[] =
        friendsData &&
        allUsers &&
        friendsData.map((friend: { senderID: any; messageCount: any }) => {
          const user = allUsers.find((user) => user.userID === friend.senderID);
          return {
            img: user?.avatar ?? IMAGE_PLACEHOLDER,
            name: user?.username ?? '',
            isActive: false,
            publicKey: user?.walletPubkey ?? '',
            userID: user?.userID ?? '',
            unreadMessageCount: friend.messageCount ?? 0,
          };
        });
      console.log('friend list is ', friendsList);
      const FriendUnionMap = new Map();
      // create a union of the both Friend lists
      usersIDWhoHaventMassegedMeList &&
        usersIDWhoHaventMassegedMeList.forEach((item) => FriendUnionMap.set(item.userID, item));
      friendsList && friendsList.forEach((item) => FriendUnionMap.set(item.userID, item));
      const FriendListUnion: FriendData_WithUnreadMessageCount[] = Array.from(
        FriendUnionMap.values()
      );
      //// work here farrukh raha
      const onlineUsersData = onlineUsersSubscription.data!;

      if (!onlineUsersSubscription.loading) {
        console.log('online users', onlineUsersData['swapsmart_user_online']);
        FriendListUnion.forEach((friend) => {
          for (const user of onlineUsersData['swapsmart_user_online']) {
            if (friend.userID == user.userID) {
              friend.isActive = true;
            }
          }
        });
      }
      console.log('Union of friend list is :', FriendListUnion);

      // fitlering users who are not in friend list and setting them as potential friends can can be added later
      // filtering user himself as well
      setPotentialFriends(
        allUsers
          .map((user) => {
            return {
              img: user?.avatar ?? IMAGE_PLACEHOLDER,
              name: user?.username ?? '',
              isActive: false,
              publicKey: user?.walletPubkey ?? '',
              userID: user?.userID ?? '',
              unreadMessageCount: 0,
            };
          })
          .filter(({ userID: id1 }) => !FriendListUnion.some(({ userID: id2 }) => id2 === id1))
          .filter(({ userID: id1 }) => id1 !== user.userID)
      );
      // sorting the friend list by unread message count and name
      setFriends(
        FriendListUnion.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }).sort(
          (a, b) => b.unreadMessageCount - a.unreadMessageCount
        ) as FriendData_WithUnreadMessageCount[]
      );
      setUpdateFriends(false);
    }
  }, [allUsers, updateFreinds]);
  return (
    <div className="flex h-screen grow">
      <ConversationSideBar
        forcedRenderBoolean={renderSideBarBoolen}
        friendsList={friends}
        onUserSettingsClick={inDevelopmentDialog}
        onAddFriendClick={addUserDialog}
        onInviteLinklClick={inDevelopmentDialog}
        conversationName={name}
        getCurrentFriend={(publicKey) => {
          setSelectedFriend(friends.find((friend) => friend.publicKey === publicKey));
        }}
      />

      {show === 'chat' && (
        <ChatArea
          friend={selectedFriend}
          onShowFriendWallet={(publicKey: string) => {
            setFriendPublicKey(publicKey);
            setShow('wallet');
          }}
          onSendMessage={(message: string) => {
            selectedFriend && User.sendMessage(selectedFriend.userID, message);
          }}
        />
      )}
      {show === 'wallet' && selectedFriend && (
        <WalletArea
          friend={selectedFriend}
          onGoBack={() => {
            setShow('chat');
          }}
        />
      )}
    </div>
  );
};

export default Conversation;
