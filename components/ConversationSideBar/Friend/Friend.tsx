import React from 'react';
import { FC } from 'react';
import { FriendProps } from './Friend.type';
import { twMerge } from 'tailwind-merge';
import ActiveStatusIcon from '../../common/ActiveStatusIcon/ActiveStatusIcon';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';

const Friend: FC<FriendProps> = ({ friendData, className, onClick }) => {
  return (
    <Button
      onClick={() => {
        onClick(friendData.publicKey);
      }}
      className={twMerge('flex w-full justify-between items-center rounded-xl p-2', className)}>
      <div className="flex   items-center gap-3">
        <ActiveStatusIcon img={friendData.img} isActive={friendData.isActive} />
        <div className="flex justify-start w-[10rem]">
          <Text
            className={friendData.unreadMessageCount === 0 ? 'text-[#808287]' : ' text-[#FFFFFF]'}>
            {friendData.name}
          </Text>
        </div>
      </div>
      <div
        className={
          friendData.unreadMessageCount !== 0
            ? 'flex justify-center bg-[#BA1A1A] rounded-2xl w-[2.5rem] py-[0.01rem]'
            : ''
        }>
        {friendData.unreadMessageCount !== 0 && (
          <Text className="text-white w-[2rem]">{friendData.unreadMessageCount}</Text>
        )}
      </div>
    </Button>
  );
};

export default Friend;
