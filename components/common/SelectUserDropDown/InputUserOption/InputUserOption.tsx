import React from 'react';
import { FC } from 'react';
import { UserOptionProps } from './InputUserOption.type';
import Text from '../../Text/Text';
import { twMerge } from 'tailwind-merge';
import { DIALOG_INPUT_FIELD_STYLE_CLASSES } from '../../../commonStyles';

const InputUserOption: FC<UserOptionProps> = ({ userData, isSelected, onClick }) => {
  return (
    <div
      className={twMerge(
        'flex justify-start items-center gap-2 bg-transparent group  hover:bg-[#29292E] focus:bg-[#29292E]',
        DIALOG_INPUT_FIELD_STYLE_CLASSES,
        isSelected && 'bg-[#29292E]'
      )}
      onClick={() => {
        onClick(userData.name, userData.userID);
      }}>
      <div className="w-[1.75rem] h-[1.75rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={userData.img} alt={userData.name + ' image area'} />
      </div>
      <Text
        className={twMerge(
          'text-[#19191E] group-hover:text-white font-bold group-focus:text-white truncate max-w-[8rem]',
          isSelected && 'text-white'
        )}>
        {userData.name}
      </Text>
      <Text
        className={twMerge(
          'text-[#29292E] group-hover:text-white group-focus:text-white  truncate w-[8rem]',
          isSelected && 'text-white'
        )}>
        {userData.publicKey}
      </Text>
    </div>
  );
};

export default InputUserOption;
