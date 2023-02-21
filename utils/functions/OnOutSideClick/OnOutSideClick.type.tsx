import { RefObject } from 'react';

export interface OnOutSideClickProps {
  ref: RefObject<HTMLButtonElement>;
  func: () => void;
  depedencyArray?: any[];
}
