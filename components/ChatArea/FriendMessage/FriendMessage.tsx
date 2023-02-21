import React from 'react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { MESSAGE_PADDING } from '../../commonStyles';
import { FriendMessageProps } from './FriendMessage.type';
import FriendMessageWallet from '../../../assets/svgs/FriendMessageWallet';
import Button from '../../common/Button/Button';
import Text from '../../common/Text/Text';
import { useState } from 'react';

const FriendMessage: FC<FriendMessageProps> = ({
  name,
  img,
  message,
  className,
  publicKey,
  onShowFriendWallet,
}) => {
  const [showWalletFocused, setShowWalletFocused] = useState(false);
  return (
    <div
      className={twMerge(
        'flex justify-start items-start gap-3 w-fit rounded-[1.1rem] bg-[#000000]',
        MESSAGE_PADDING,
        className
      )}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-[3rem] h-[3rem] rounded-full" src={img} alt={name} />
      <div className="flex flex-col">
        <Button
          onClick={() => {
            onShowFriendWallet(publicKey);
          }}
          onFocus={() => {
            setShowWalletFocused(true);
          }}
          onBlur={() => {
            setShowWalletFocused(false);
          }}
          className="flex items-center  w-fit">
          <FriendMessageWallet focused={showWalletFocused} />
          <Text className="text-white font-bold max-w-[15rem] rounded-r-lg pl-[0.5rem] pr-3 bg-[#18191D]">
            {name}
          </Text>
        </Button>
        <Text className="text-[#ECECF1] font-[100] flex-wrap max-w-full Break Words text-ellipsis">
          {message}
        </Text>
      </div>
    </div>
  );
};

export default FriendMessage;
