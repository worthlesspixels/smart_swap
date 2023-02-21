import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import { useSubscription } from '@apollo/client';
import {
  GET_MESSAGES_SUBSCRIPTION,
  GET_UNREAD_MSG_SUBSCRIPTION,
  GET_MESSGES_PER_USER_SUBSCRIPTION,
} from '../models/graphqlOperations';
import { useRouter } from 'next/router';

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
    const img = document.getElementById('img');
    if (img) {
      console.log(img);
    }
  };
  useEffect(() => {
    router.push('/authentication');
  }, []);

  const { data, loading, error } = useSubscription(GET_MESSAGES_SUBSCRIPTION);

  return (
    <div className="h-screen bg-black p-5">
      <WalletMultiButton />
      <div className="mt-5">
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-800 p-2 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <button className="bg-blue-500 p-2 text-white" onClick={signUp}>
          Signup
        </button>
      </div>
      <div className="mt-5">
        <button className="bg-blue-500 p-2 text-white" onClick={login}>
          Login
        </button>
      </div>
      <div className="mt-5">
        <button className="bg-blue-500 p-2 text-white" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="mt-5">
        <input
          type="text"
          placeholder="sendTo"
          className="bg-gray-800 p-2 text-white"
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <input
          type="text"
          placeholder="message"
          className="bg-gray-800 p-2 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <button className="bg-blue-500 p-2 text-white" onClick={sendMessage}>
          send msg
        </button>
      </div>
      <div className="mt-5">
        <label htmlFor="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*"></input>
        <button className="bg-blue-500 p-2 text-white" onClick={uploadAvatar}>
          setAvatar
        </button>
      </div>
      <div>
        <p>{!loading && JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default IndexPage;
