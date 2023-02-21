import React from 'react';
import { FC } from 'react';
import { TokenData } from '../../../solana';
import Text from '../../common/Text/Text';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { TokenState } from './FungibleToken.type';
import InputField from '../../common/InputField/InputField';

//const FungibleToken: FC<TokenData> = ({ symbol, mint, ATA, amount, decimals, URI }) => {
const FungibleToken = () => {
  const [state, setState] = useState<TokenState>('display');
  const [selected, setSelected] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  return (
    <div className="w-[10rem] h-[10rem] bg-black rounded-[1.3rem]">
      {state === 'display' && (
        <div className="flex flex-col items-center w-full h-full p-5">
          <div className=" w-fit h-fit p-1 border	 border-[#E12273] rounded-full">
            <img
              className="w-[2.5rem] h-[2.5rem] rounded-full"
              src="http://placekitten.com/200/300"
            />
          </div>
          <Text className="text-white mt-1">USDC</Text>
          <div className=" w-fit h-fit py-1 px-4 mt-4 bg-[#19191E] border	 border-[#E12273] rounded-[1.125rem]">
            <Text className="text-white  font-bold text-sm">34 Tokens</Text>
          </div>
        </div>
      )}
      {state === 'trade' && (
        <Button
          onClick={() => {
            console.log('clicked');
          }}
          onFocus={() => {
            setSelected(true);
          }}
          onBlur={() => {
            setSelected(false);
          }}
          className="w-full h-full bg-black rounded-[1.3rem]">
          <div className="flex flex-col items-center w-full h-full p-5">
            <div className=" w-fit h-fit p-1 border	 border-[#E12273] rounded-full">
              <img
                className="w-[2.5rem] h-[2.5rem] rounded-full"
                src="http://placekitten.com/200/300"
              />
            </div>
            <Text className="text-white mt-1">USDC</Text>
            <div className=" w-fit h-fit   mt-4 bg-[#19191E] border	 border-[#E12273] rounded-[1.125rem]">
              <InputField
                setInpValue={(value: string | number) => {
                  if (typeof value === 'number') {
                    setSelectedAmount(value);
                  }
                }}
                showIcon={false}
                className="h-[1.5rem] w-[7rem] text-white bg-[#19191E] rounded-[1.125rem]"
              />
            </div>
          </div>
        </Button>
      )}
    </div>
  );
};

export default FungibleToken;
