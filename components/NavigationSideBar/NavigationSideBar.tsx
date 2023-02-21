import React, { useState, useEffect } from 'react';
import AddConversation from '../../assets/svgs/AddConversation';
import AppLogo from '../../assets/svgs/AppLogo';
import Wallet from '../../assets/svgs/Wallet';
import Button from '../common/Button/Button';
import BetaOnlyConversation from '../../assets/svgs/BetaOnlyConversation';
import { NavigationSideBarProps } from './NavigationSideBar.type';
import { FC } from 'react';
// fetch all conversation from server in which this user is a member
//on conversation select return  conversation id  and name
const NavigationSideBar: FC<NavigationSideBarProps> = ({
  onConversationClick,
  onAddConversationInstanceClick,
  onWalletClick,
}) => {
  const [walletFocused, setWalletFocused] = useState(false);
  const [addConversationFocused, setAddConversationFocused] = useState(false);
  const [betaOnlyConversationFocused, setBetaOnlyConversationFocused] = useState(false);
  return (
    <div className="flex flex-col justify-between items-center bg-black h-full w-[6.3rem] py-[3rem] ">
      <div className="flex flex-col items-center gap-4">
        <AppLogo />
        <hr className=" bg-[#666666] w-[75%] h-[0.13rem] rounded-[6rem] border-none" />
        <div className="flex flex-col gap-8">
          <Button
            onClick={onConversationClick}
            onBlur={() => {
              setBetaOnlyConversationFocused(false);
            }}
            onFocus={() => {
              setBetaOnlyConversationFocused(true);
            }}
            className="group">
            <div className="flex items-center">
              <hr className=" absolute left-0 bg-white w-[0.13rem] h-[0.5rem] group-hover:h-[1rem] group-focus:h-[2rem] rounded-[6rem] border-none" />
              <BetaOnlyConversation focused={betaOnlyConversationFocused} />
            </div>
          </Button>
          <Button
            onClick={onAddConversationInstanceClick}
            onBlur={() => {
              setAddConversationFocused(false);
            }}
            onFocus={() => {
              setAddConversationFocused(true);
            }}>
            <AddConversation focused={addConversationFocused} />
          </Button>
        </div>
      </div>
      <Button
        onBlur={() => {
          setWalletFocused(false);
        }}
        onFocus={() => {
          setWalletFocused(true);
        }}
        onClick={onWalletClick}
        className="group">
        <div className="flex items-center">
          <hr className=" absolute left-0 bg-white w-[0.13rem] h-[0.5rem] group-hover:h-[1rem] group-focus:h-[2rem] rounded-[6rem] border-none" />
          <Wallet focused={walletFocused} />
        </div>
      </Button>
    </div>
  );
};

export default NavigationSideBar;
