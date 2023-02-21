import React from 'react';
import { FC } from 'react';
import { UserMessageProps } from './UserMessage.type';
import Text from '../../common/Text/Text';
import { twMerge } from 'tailwind-merge';
import { MESSAGE_PADDING } from '../../commonStyles';

const UserMessage: FC<UserMessageProps> = ({ name, img, message, className }) => {
  return (
    <div
      className={twMerge(
        'flex justify-start items-start gap-3 w-full',
        MESSAGE_PADDING,
        className
      )}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-[3rem] h-[3rem] rounded-full" src={img} alt={name} />
      <div className="flex flex-col">
        <Text className="text-white font-bold max-w-[15rem]">{name}</Text>
        <Text className="text-[#ECECF1] font-[100] flex-wrap max-w-full Break Words text-ellipsis">
          {message}
        </Text>
      </div>
    </div>
  );
};

export default UserMessage;
