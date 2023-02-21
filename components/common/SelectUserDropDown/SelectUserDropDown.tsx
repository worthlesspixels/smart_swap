import React from 'react';
import { FC } from 'react';
import { SelectUserDropDownProps } from './SelectUserDropDown.type';
import { useState } from 'react';
import InputField from '../InputField/InputField';
import InputUserOption from './InputUserOption/InputUserOption';
import { useEffect } from 'react';

const SelectUserDropDown: FC<SelectUserDropDownProps> = ({
  placeHolder,
  userArray,
  setUserID,
  afterSelect,
}) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [LocalUserArray, setLocalUserArray] = useState(userArray);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  useEffect(() => {
    setLocalUserArray(userArray);
    setSelectedUserIndex(-1);
  }, [userArray]);
  return (
    <div className="flex flex-col gap-1">
      <InputField
        placeHolder={placeHolder}
        setInpValue={(value: string | number) => {
          let locatValue: string = value.toString();
          setLocalUserArray(
            userArray.filter((user) =>
              user.name.toLocaleLowerCase().includes(locatValue.toLocaleLowerCase())
            )
          );
          setSelectedUser(locatValue);
          setSelectedUserIndex(-1);
        }}
        showIcon={false}
        value={selectedUser}
      />

      <div className=" max-h-[10rem] overflow-auto scrollbar-hide">
        {LocalUserArray.map((user, index) => {
          return (
            <div className="my-2" key={index}>
              {selectedUserIndex === index && (
                <InputUserOption
                  userData={user}
                  isSelected={true}
                  onClick={(name, userID) => {
                    setSelectedUserIndex(index);
                    setSelectedUser(name);
                    setUserID(userID);
                    afterSelect && afterSelect();
                  }}
                />
              )}
              {selectedUserIndex !== index && (
                <InputUserOption
                  userData={user}
                  isSelected={false}
                  onClick={(name, userID) => {
                    setSelectedUserIndex(index);
                    setSelectedUser(name);
                    console.log(' username:', name);
                    console.log('user id:', userID);
                    setUserID(userID);
                    afterSelect && afterSelect();
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectUserDropDown;
