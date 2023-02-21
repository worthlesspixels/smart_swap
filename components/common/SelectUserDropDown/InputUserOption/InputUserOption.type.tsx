export interface UserOptionData {
  publicKey: string; // backend will ensure that its a valid public key
  userID: string; // backend will ensure that its a valid user id
  name: string;
  img: string; // backend will ensure that its a valid image url
}

export interface UserOptionProps {
  userData: UserOptionData;
  onClick: (name: string, userID: string) => void;
  isSelected?: boolean;
}
