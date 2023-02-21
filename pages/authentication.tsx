import React from 'react';
import { useState } from 'react';
import DialogBox from '../components/common/DialogBox/DialogBox';
import InputField from '../components/common/InputField/InputField';
import TextButton from '../components/common/TextButton/TextButton';
import Text from '../components/common/Text/Text';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useContext } from 'react';
import { userContext } from './_app';
import { User } from '../models/User';
import { loginStateObjType, UserContextType } from '../components/commonInterfaces';
import { IMAGE_PLACEHOLDER } from '../assets/data/data';
import { validUsernameRegex } from '../components/commonConstants';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { loginState } from '../state/globalHookState';
import { getAuth } from 'firebase/auth';

const Authentication = () => {
  const { publicKey, signMessage } = useWallet();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const { user, setUser } = useContext(userContext);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<boolean>(false);
  const router = useRouter();

  const signUp = async () => {
    if (!publicKey) {
      setWalletError(true);
      return;
    }
    setWalletError(false);

    try {
      if (validUsernameRegex.test(username) === false) {
        setUserNameError(true);
        throw new Error('invalidUserName');
      }
      setUserNameError(false);
      const result = await User.create(username, publicKey.toBuffer(), signMessage!!);
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType; //
      console.log(loginStateObj);
      const userInfo: UserContextType = {
        name: username,
        img: IMAGE_PLACEHOLDER,
        publicKey: publicKey.toString(),
        userID: loginStateObj.userID,
        isAuthenticated: true,
      };
      // json web token token =
      setUser(userInfo);
      const result2 = await User.login(username, publicKey.toBuffer(), signMessage!!);
      router.push('/userDashboard');
    } catch (e) {
      console.log(e);
    }
  };
  const login = async () => {
    if (!publicKey) {
      setWalletError(true);
      return;
    }
    setWalletError(false);
    try {
      if (validUsernameRegex.test(username) === false) {
        setUserNameError(true);
        throw new Error('invalidUserName');
      }
      setUserNameError(false);
      await User.login(username, publicKey.toBuffer(), signMessage!!);
      const loginStateObj = Object.assign({}, loginState.get()) as loginStateObjType;
      const userInfo: UserContextType = {
        name: username,
        img: IMAGE_PLACEHOLDER,
        publicKey: publicKey.toString(),
        userID: loginStateObj.userID,
        isAuthenticated: true,
      };
      setUser(userInfo);
      router.push('/userDashboard');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex h-screen w-screen bg-[#1F1F1F;]">
      {!showLogin && (
        <DialogBox>
          <div className="flex flex-col items-center">
            <Text className=" text-black text-2xl font-bold">Get started with Smartswap</Text>
            <Text className=" text-black text-sm w-[20rem] pt-[0.5rem] text-center text-ellipsis">
              Enter a username of your choice and authenticate your wallet address to access
              Smartswap.
            </Text>
            <div className="flex flex-col items-center pt-5 gap-2">
              <InputField
                className="w-[17rem]"
                placeHolder="Enter Username"
                setInpValue={(value: string | number) => {
                  setUsername(value.toString());
                }}
                setError={userNameError}
                errorState="only alpha numeric names with length 3-20 are allowed"
              />
              <div
                className={twMerge(
                  'bg-purple-700 rounded-lg hover:rounded-lg',
                  walletError && 'bg-red-700'
                )}>
                <WalletMultiButton
                  style={{ borderRadius: '0.5rem' }}
                  className="flex items-center rounded-lg w-[17rem] bg-green-600"
                  startIcon={undefined}
                />
              </div>
              <TextButton onClick={signUp} className=" w-[17rem]">
                AuthenticateWallet
              </TextButton>
              <div className="flex items-center gap-1">
                <Text className="text-black text-xs font-normal">Have an account?</Text>
                <button
                  onClick={() => {
                    setShowLogin(true);
                  }}>
                  <Text className=" text-[#E42575] text-xs font-medium">Login!</Text>
                </button>
              </div>
            </div>
          </div>
        </DialogBox>
      )}
      {showLogin && (
        <DialogBox>
          <div className="flex flex-col items-center">
            <Text className=" text-black text-2xl font-bold">Welcome back!</Text>
            <Text className=" text-black text-sm w-[20rem] pt-[0.5rem] text-center text-ellipsis">
              Enter a username of your choice and authenticate your wallet address to access
              Smartswap.
            </Text>
            <div className="flex flex-col items-center pt-5 gap-2">
              <InputField
                className="w-[17rem]"
                placeHolder="Enter Username"
                setInpValue={(value: string | number) => {
                  setUsername(value.toString());
                }}
                setError={userNameError}
                errorState="only alpha numeric names with length 3-20 are allowed"
              />
              <div className="bg-purple-700 rounded-lg hover:rounded-lg">
                <WalletMultiButton
                  style={{ borderRadius: '0.5rem' }}
                  className="flex items-center rounded-lg w-[17rem] bg-green-600"
                  startIcon={undefined}
                />
              </div>
              <TextButton onClick={login} className=" w-[17rem]">
                AuthenticateWallet
              </TextButton>
              <div className="flex items-center gap-1">
                <Text className="text-black text-xs font-normal">Don&apos;t Have an account?</Text>
                <button
                  onClick={() => {
                    setShowLogin(false);
                  }}>
                  <Text className=" text-[#E42575] text-xs font-medium">Sign up!</Text>
                </button>
              </div>
            </div>
          </div>
        </DialogBox>
      )}
    </div>
  );
};

export default Authentication;
