import React, { useEffect } from 'react';
import { FC } from 'react';

import { OnOutSideClickProps } from './OnOutSideClick.type';

const OnOutSideClick = ({ ref, func, depedencyArray }: OnOutSideClickProps) => {
  let localDepedencyArray; //: any[];
  return useEffect(() => {
    localDepedencyArray = [ref]; // doing this make code work why?

    const handleOutsideClick = (event: MouseEvent) => {
      {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          func();
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, localDepedencyArray);
};

export default OnOutSideClick;
