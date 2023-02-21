import React from 'react';
import Header from './Header/Header';
import { FC } from 'react';
import { WalletAreaProps } from './WalletArea.type';
import FungibleToken from './FungibleToken/FungibleToken';

const WalletArea: FC<WalletAreaProps> = ({ friend, onGoBack }) => {
  return (
    <div className=" relative flex flex-col bg-[#25272D] grow  pt-[3rem]">
      <Header friend={friend} onGoBack={onGoBack} />
      <div className="flex-grow flex flex-col items-center justify-center">
        <FungibleToken />
      </div>
    </div>
  );
};

export default WalletArea;
