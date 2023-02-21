import React from 'react';
import { FC } from 'react';
import { SvgProps } from './svg.type';

const InputErrorMessageIcon: FC<SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.8125" cy="7.03125" r="6.19318" stroke="#FF170A" strokeWidth="1.23864" />
      <path
        d="M6.28809 10.651V9.71355H7.33616V10.651H6.28809ZM6.28809 8.81686V3.31445H7.33616V8.81686H6.28809Z"
        fill="#FF170A"
      />
    </svg>
  );
};

export default InputErrorMessageIcon;
