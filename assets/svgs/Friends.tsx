import React from 'react';
import { FC } from 'react';
import { SvgProps } from './svg.type';

const Friends: FC<SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6C7.6545 6 9 4.6545 9 3C9 1.3455 7.6545 0 6 0C4.3455 0 3 1.3455 3 3C3 4.6545 4.3455 6 6 6Z"
        fill="#808287"
      />
      <path
        d="M6 6.75C2.4675 6.75 0 8.60025 0 11.25V12H12V11.25C12 8.60025 9.5325 6.75 6 6.75Z"
        fill="#808287"
      />
    </svg>
  );
};

export default Friends;
