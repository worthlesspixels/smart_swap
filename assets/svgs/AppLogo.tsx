import React from 'react';
import { SvgProps } from './svg.type';
import { FC } from 'react';

const AppLogo: FC<SvgProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="52" height="52" rx="18" fill="#E42575" />
      <path
        d="M31.3639 12H20.6362L12 20.6361V31.3638L20.6362 40H31.3639L40 31.3638V20.6361L31.3639 12ZM22.1205 31.4988L16.588 25.9663L22.1205 20.4337C24.212 18.3422 27.653 18.3422 29.7446 20.4337L35.2771 25.9663L29.7446 31.4988C27.653 33.5904 24.2795 33.5904 22.1205 31.4988Z"
        fill="white"
      />
    </svg>
  );
};

export default AppLogo;
