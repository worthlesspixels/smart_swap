import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Text from '../common/Text/Text';
import { FC } from 'react';
import { useState, useEffect } from 'react';
import Friend from './Friend/Friend';

import AddFriend from '../../assets/svgs/AddFriend';
import Button from '../common/Button/Button';
import InputField from '../common/InputField/InputField';
import TextButton from '../common/TextButton/TextButton';
import { ConversationSideBarProps } from './ConversationSideBar.type';
import MessageBox from '../common/MessageBox/MessageBox';
import { SCROLL_BAR_STYLE_CLASSES } from '../commonStyles';

import { FriendData_WithUnreadMessageCount } from '../commonInterfaces';

//at start fetch all users that exist in this conversation and update localFriendsList
// on any friend selected, return that friend's public key in friend object to parent component

const ConversationSideBar: FC<ConversationSideBarProps> = ({
  friendsList,
  conversationName,
  onAddFriendClick,
  onInviteLinklClick,
  getCurrentFriend,
  onUserSettingsClick,
  forcedRenderBoolean,
}) => {
  const [selectedFriendPublicKey, setSelectedFriendPublicKey] = useState<string>('');
  const [localFriendsList, setLocalFriendsList] =
    useState<FriendData_WithUnreadMessageCount[]>(friendsList);
  useEffect(() => {
    setLocalFriendsList(friendsList);
  }, [friendsList]);

  useEffect(() => {
    getCurrentFriend(selectedFriendPublicKey);
  }, [selectedFriendPublicKey, getCurrentFriend]);

  return (
    <div className=" relative flex flex-col bg-[#18191D] h-full py-[3rem] w-[20rem] ">
      <Header conversationName={conversationName} friendCount={localFriendsList.length} />
      <div className={SCROLL_BAR_STYLE_CLASSES}>
        <div className="mx-[1.5rem]">
          <Button
            className="w-full mt-[2rem]"
            onClick={() => {
              onAddFriendClick();
            }}>
            <InputField
              placeHolder="Find or start a conversation"
              showIcon={false}
              isInDialog={false}
              setInpValue={(value) => {}}
            />
          </Button>
        </div>
        <div className="mx-[1.5rem] mt-[1.5rem]">
          <TextButton
            onClick={() => {
              onInviteLinklClick();
            }}
            className="w-full">
            Invite User
          </TextButton>
        </div>
        <Button
          className="flex justify-between items-center w-full px-6 my-6"
          onClick={() => {
            onAddFriendClick();
          }}>
          <Text className=" text-[#808287] font-bold">DIRECT MESSAGES</Text>
          <AddFriend className="w-[1rem] h-[1rem]" />
        </Button>
        <div className="flex flex-col gap-3 w-full px-6 ">
          {localFriendsList.length !== 0 &&
            localFriendsList.map((friendData, index) => {
              return (
                <Friend
                  key={friendData.publicKey}
                  className={
                    selectedFriendPublicKey === friendData.publicKey
                      ? 'bg-[#45464E]'
                      : ' bg-transparent'
                  }
                  friendData={friendData}
                  onClick={(publicKey) => {
                    setSelectedFriendPublicKey(publicKey);
                  }}
                />
              );
            })}
          {localFriendsList.length === 0 && (
            <MessageBox
              className="w-full  break-words  text-clip"
              message="Add users to your direct messages to start a conversation."
            />
          )}
        </div>
      </div>
      <Footer
        onSettingsClick={() => {
          onUserSettingsClick();
        }}
      />
    </div>
  );
};

export default ConversationSideBar;
