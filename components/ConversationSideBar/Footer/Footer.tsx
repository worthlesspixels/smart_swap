import React from 'react';
import { FC, useContext } from 'react';
import Setting from '../../../assets/svgs/Setting';
import ActiveStatusIcon from '../../common/ActiveStatusIcon/ActiveStatusIcon';
import Text from '../../common/Text/Text';
import { userContext } from '../../../pages/_app';
import Button from '../../common/Button/Button';
import { FooterProps } from './Footer.type';

const Footer: FC<FooterProps> = ({ onSettingsClick }) => {
  const { user, setUser } = useContext(userContext);
  return (
    <div className=" absolute bottom-0 flex justify-between items-center w-full h-[3rem] p-3 bg-[#131417]">
      <div className="flex gap-3 justify-start items-center">
        <ActiveStatusIcon img={user.img} isActive={true} />
        <Text className=" text-[#FFFFFF] w-[10rem]">{user.name}</Text>
      </div>
      <Button onClick={onSettingsClick}>
        <Setting />
      </Button>
    </div>
  );
};

export default Footer;
