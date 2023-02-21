import React from 'react';
import { FC } from 'react';
import { TextButtonProps } from './TextButton.type';
import Text from '../Text/Text';
import { twMerge } from 'tailwind-merge';
const TextButton: FC<TextButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={() => {
        onClick && onClick();
      }}
      className={twMerge(
        'group py-2 px-12 rounded-lg bg-[#00D99C] hover:bg-[#E42575] w-fit max-w-[20rem]',
        className
      )}>
      <Text className="font-bold text-black group-hover:text-white truncate">{children}</Text>
    </button>
  );
};

export default TextButton;
