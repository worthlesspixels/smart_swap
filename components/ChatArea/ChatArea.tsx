import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import { twMerge } from 'tailwind-merge';
import { FC } from 'react';
import { ChatAreaProps, Message } from './ChatArea.type';
import UserMessage from './UserMessage/UserMessage';
import FriendMessage from './FriendMessage/FriendMessage';
import { useContext } from 'react';
import { userContext } from '../../pages/_app';
import { SCROLL_BAR_STYLE_CLASSES } from '../commonStyles';
import { GET_MESSGES_PER_USER_SUBSCRIPTION } from '../../models/graphqlOperations';
import { useSubscription } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { messagesPerUserQuery } from '../commonConstants';
import { User } from '../../models/User';

// at start fetch messages from server againts friend and user public key
const ChatArea: FC<ChatAreaProps> = ({ friend, onShowFriendWallet, onSendMessage }) => {
  const [seeLatestMessage, setSeeLatestMessage] = React.useState<boolean>(true);
  const { user, setUser } = useContext(userContext);

  const messagePerUserSubscription = useSubscription(GET_MESSGES_PER_USER_SUBSCRIPTION, {
    variables: { otherUserID: friend ? friend.userID : '', limit: messagesPerUserQuery },
  });
  const downDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    User.markAllAsRead(friend ? friend.userID : '');
  }, [friend]);
  useEffect(() => {
    downDiv && downDiv.current && downDiv.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    // add this on first  item className="mt-auto"
    <div className=" relative flex flex-col bg-[#25272D] grow  pt-[3rem]">
      <Header friend={friend} onShowFriendWallet={onShowFriendWallet} />

      {friend && (
        <div
          className={twMerge(
            'flex flex-col   justify-start px-5 pt-5 gap-[1rem] h-full max-h-full',
            SCROLL_BAR_STYLE_CLASSES
          )}>
          {messagePerUserSubscription.data &&
            messagePerUserSubscription.data.swapsmart_chat &&
            (messagePerUserSubscription.data.swapsmart_chat as Message[]).map((message, index) => {
              let className = '';

              if (index === 0) {
                className = 'mt-auto';
              }
              if (message.senderID === user.userID) {
                return (
                  <UserMessage
                    key={message.timestamp}
                    className={className}
                    name={user.name}
                    img={user.img}
                    message={message.textMessage}
                  />
                );
              } else if (message.senderID === friend.userID) {
                return (
                  <FriendMessage
                    key={message.timestamp}
                    className={className}
                    name={friend.name}
                    img={friend.img}
                    message={message.textMessage}
                    onShowFriendWallet={onShowFriendWallet}
                    publicKey={friend.publicKey}
                  />
                );
              }
            })}
          {seeLatestMessage && <div ref={downDiv} />}
        </div>
      )}
      {friend && (
        <Footer
          friendName={friend.name}
          onSendMessage={(message: string) => {
            onSendMessage(message);
            User.markAllAsRead(friend ? friend.userID : '');
          }}
        />
      )}
    </div>
  );
};

export default ChatArea;
