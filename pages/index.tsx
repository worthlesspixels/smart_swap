import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { createElement, useEffect, useState } from 'react';
import { User } from '../models/User';
import { useSubscription } from '@apollo/client';
import {
  GET_MESSAGES_SUBSCRIPTION,
  GET_UNREAD_MSG_SUBSCRIPTION,
  GET_MESSGES_PER_USER_SUBSCRIPTION,
  GET_ONLINE_USERS_SUBSCRIPTION,
} from '../models/graphqlOperations';
import { useRouter } from 'next/router';
import { render } from 'react-dom';

const IndexPage = () => {
  const { publicKey, signMessage } = useWallet();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const router = useRouter();

  const signUp = async () => {
    if (!publicKey) return;

    const result = await User.create(username, publicKey.toBuffer(), signMessage!!);
    console.log(result);
  };

  const sendMessage = async () => {
    const msg = await User.sendMessage(sendTo, message);
    console.log('sendMessage returns ', msg);
  };

  const login = async () => {
    const res = await User.login(username, publicKey!!.toBuffer(), signMessage!!);
    console.log(res);
  };

  const logout = async () => {
    await User.logout();
  };

  const uploadAvatar = async () => {
    const img = document.getElementById('img') as HTMLInputElement;
    if (img) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img.files![0]);
      fileReader.addEventListener('load', () => {
        const len = (fileReader.result as string).length;
        const kb = len / 1024;

        console.log(`${kb}KB`);
        if (kb < 400) {
          User.setAvatar(fileReader.result as string);
        }
      });
    }
  };
  const displayAvatar = async () => {
    const root = document.getElementById('imgRoot');
    const imgDataURL = await User.getAvatar();
    console.log(imgDataURL);
    const imgElem = createElement('img', { src: imgDataURL }, null);
    render(imgElem, root);
  };

  const { data, loading, error } = useSubscription(GET_MESSAGES_SUBSCRIPTION);
  const onlineUsersData = useSubscription(GET_ONLINE_USERS_SUBSCRIPTION);

  return <div className="h-screen bg-[#1F1F1F] p-5"></div>;
};

export default IndexPage;
