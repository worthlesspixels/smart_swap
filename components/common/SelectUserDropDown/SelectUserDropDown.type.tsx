import { UserOptionData } from './InputUserOption/InputUserOption.type';

export interface SelectUserDropDownProps {
  placeHolder: string;
  userArray: UserOptionData[];
  setUserID: (userId: string | number) => void;
  afterSelect?: () => void;
}
