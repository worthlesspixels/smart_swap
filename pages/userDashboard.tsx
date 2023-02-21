import { useState } from 'react';
import NavigationSideBar from '../components/NavigationSideBar/NavigationSideBar';
import Conversation from '../components/Conversation/Conversation';
import { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from './_app';
import { useRouter } from 'next/router';
import DialogBox from '../components/common/DialogBox/DialogBox';
import Text from '../components/common/Text/Text';
import { FriendData_WithUnreadMessageCount } from '../components/commonInterfaces';
import SelectUserDropDown from '../components/common/SelectUserDropDown/SelectUserDropDown';

const Body = () => {
  const [search, setSearch] = useState('');
  const { user, setUser } = useContext(userContext);
  const [newestFriendUserID, setNewestFriendUserID] = useState<string>('');
  const [usersThatCanBeAdded, setUsersThatCanBeAdded] = useState<
    FriendData_WithUnreadMessageCount[]
  >([]);
  const [showLaunchingSoon, setShowLaunchingSoon] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push('/authentication');
    }
    console.log('users that can be added:', usersThatCanBeAdded);
    console.log('newest friend user id:', newestFriendUserID);
  });
  return (
    <div>
      {showAddUserDialog && (
        <DialogBox onClose={() => setShowAddUserDialog(false)}>
          <SelectUserDropDown
            placeHolder={'Find or start a conversation'}
            userArray={usersThatCanBeAdded.map((user) => {
              return {
                publicKey: user.publicKey, // backend will ensure that its a valid public key
                userID: user.userID, // backend will ensure that its a valid user id
                name: user.name,
                img: user.img, // backend will ensure that its a valid image url
              };
            })}
            setUserID={(userId: string | number) => {
              setNewestFriendUserID(userId as string);
            }}
            afterSelect={() => setShowAddUserDialog(false)}></SelectUserDropDown>
        </DialogBox>
      )}
      {showLaunchingSoon && (
        <DialogBox
          onClose={() => {
            setShowLaunchingSoon(false);
          }}>
          <div className="flex flex-col justify-center items-center gap-5">
            <Text className=" font-bold text-2xl">Launching soon!</Text>
            <Text className=" w-[24rem] text-ellipsis">
              Sorry for the wait. This feature will be launching soon. Our team is working
              tirelessly to ensure we provide our users an enjoyable experience. Stay tuned!
            </Text>
          </div>
        </DialogBox>
      )}
      <div
        className={
          'h-screen flex grow bg-[#1F1F1F]' +
          ' ' +
          (showLaunchingSoon ? 'opacity-50' : 'opacity-100')
        }>
        <NavigationSideBar
          onAddConversationInstanceClick={() => {
            setShowLaunchingSoon(true);
          }}
          onConversationClick={() => {
            console.log('conversation selected');
          }}
          onWalletClick={() => {
            setShowLaunchingSoon(true);
          }}
        />

        <Conversation
          name="Antematter Labs"
          id="123"
          newAddedFriendUserID={newestFriendUserID}
          setPotentialFriends={(friends: FriendData_WithUnreadMessageCount[]) => {
            setUsersThatCanBeAdded(friends);
          }}
          inDevelopmentDialog={() => {
            setShowLaunchingSoon(true);
          }}
          addUserDialog={() => {
            setShowAddUserDialog(true);
          }}
        />
      </div>
    </div>
  );
};

export default Body;
