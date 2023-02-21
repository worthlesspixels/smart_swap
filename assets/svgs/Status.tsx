import React from 'react';
import { FC } from 'react';
import { StatusSvgProps } from './svg.type';

const Status: FC<StatusSvgProps> = ({ className, focused, transparentFill }) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.2 0C3.22355 0 0 3.22355 0 7.2C0 9.04405 0.693248 10.7262 1.83334 12H7.2L12 7.2V1.83334C10.7262 0.693248 9.04405 0 7.2 0Z"
        fill={transparentFill ? '#ffffff00' : '#18191D'}
      />
      <rect x="2" y="2" width="10" height="10" rx="5" fill={focused ? '#34C759' : '#757681'} />
      <rect x="4.5" y="4.5" width="5" height="5" rx="2.5" fill={focused ? '#34C759' : '#18191D'} />
    </svg>
  );
};

export default Status;
