import React from 'react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { MessageBoxProps } from './MessageBox.type';
import Text from '../Text/Text';

const MessageBox: FC<MessageBoxProps> = ({ message, className }) => {
  return (
    <div
      className={twMerge(
        'w-fit flex justify-center items-center break-words max-w-full h-fit bg-white rounded-2xl p-5',
        className
      )}>
      <Text className=" font-bold  text-ellipsis">
        <strong>Note:</strong> {message}
      </Text>
    </div>
  );
};

export default MessageBox;
