import React from 'react';
import { FC } from 'react';
import { SvgProps } from './svg.type';

const AddFriend: FC<SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7H7V12H5V7H0V5H5V0H7V5H12V7Z" fill="#808287" />
    </svg>
  );
};

export default AddFriend;
