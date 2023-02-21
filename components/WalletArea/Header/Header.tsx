import React from 'react';
import { FC } from 'react';
import { HeaderProps } from './Header.type';
import AtTheRate from '../../../assets/svgs/AtTheRate';
import Text from '../../common/Text/Text';
import Status from '../../../assets/svgs/Status';
import Button from '../../common/Button/Button';
import FriendWallet from '../../../assets/svgs/FriendWallet';
import GoBack from '../../../assets/svgs/GoBack';
import { useState } from 'react';

const Header: FC<HeaderProps> = ({ friend, onGoBack }) => {
  const [focused, setFocused] = useState(false);

  if (friend === undefined) {
    return (
      <div className="absolute top-0 justify-start flex items-center   border-[#18191D] border-b-[0.01rem] h-[3rem] w-full"></div>
    );
  } else {
    return (
      <Button
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => {
          onGoBack();
        }}
        className="absolute top-0 justify-start flex items-center border-[#18191D] border-b-[0.01rem] h-[3rem] w-full">
        <div className="flex px-4 gap-2 justify-start items-center">
          <GoBack className="h-[1rem] w-[1rem] mr-[1rem]" focused={focused} />
          <AtTheRate />
          <Text className={'max-w-[7rem] font-bold text-white'}>{friend.name}</Text>

          <Status
            className="h-[1rem] w-[1rem] rounded-full bg-transparent pr-[0.1rem] pb-[0.1rem]"
            transparentFill={true}
            focused={friend.isActive}
          />
        </div>
        <hr className="w-[0.06rem] h-[1.5rem] bg-[#45464E] border-none" />
        <div className="flex justify-start items-center pl-4 gap-2">
          <FriendWallet />
          <Text className="text-white font-bold max-w-[15rem]">{friend.publicKey}</Text>
        </div>
      </Button>
    );
  }
};

export default Header;
