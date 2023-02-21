import React from 'react';
import Friends from '../../../assets/svgs/Friends';
import { HeaderProps } from './Header.type';
import { FC } from 'react';
import Text from '../../common/Text/Text';

const Header: FC<HeaderProps> = ({ conversationName, friendCount }) => {
  return (
    <div className=" absolute top-0 flex justify-between items-center  w-full h-[3rem] px-6 py-3 bg-[#18191D] border-[#29292E] border-b-[0.01rem]">
      <Text className=" text-[#FFFFFF] font-bold w-[10rem]">{conversationName}</Text>
      <div className="flex justify-between items-center  gap-2 border-[#808287] border-2 rounded-2xl px-3">
        <Friends className="w-[1rem] h-[1rem]" />
        <Text className=" text-[#FFFFFF] ">{friendCount}</Text>
      </div>
    </div>
  );
};

export default Header;
