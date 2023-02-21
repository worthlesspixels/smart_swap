import React from 'react';
import { FC } from 'react';
import { SvgProps } from './svg.type';

const GoBack: FC<SvgProps> = ({ className, focused }) => {
  return (
    <svg
      className={className}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 6.00076H3.14L6.77 1.64076C6.93974 1.43655 7.0214 1.17327 6.99702 0.90884C6.97264 0.644414 6.84422 0.400503 6.64 0.230764C6.43578 0.0610254 6.1725 -0.0206365 5.90808 0.00374322C5.64365 0.0281229 5.39974 0.156547 5.23 0.360764L0.23 6.36076C0.196361 6.40849 0.166279 6.45862 0.14 6.51076C0.14 6.56076 0.14 6.59076 0.0700002 6.64076C0.0246737 6.75542 0.000941121 6.87747 0 7.00076C0.000941121 7.12405 0.0246737 7.2461 0.0700002 7.36076C0.0700002 7.41076 0.0699999 7.44076 0.14 7.49076C0.166279 7.5429 0.196361 7.59304 0.23 7.64076L5.23 13.6408C5.32402 13.7536 5.44176 13.8444 5.57485 13.9066C5.70793 13.9689 5.85309 14.001 6 14.0008C6.23365 14.0012 6.46009 13.9198 6.64 13.7708C6.74126 13.6868 6.82496 13.5837 6.88631 13.4674C6.94766 13.351 6.98546 13.2237 6.99754 13.0927C7.00961 12.9618 6.99573 12.8297 6.95669 12.7041C6.91764 12.5785 6.8542 12.4618 6.77 12.3608L3.14 8.00076H15C15.2652 8.00076 15.5196 7.89541 15.7071 7.70787C15.8946 7.52033 16 7.26598 16 7.00076C16 6.73555 15.8946 6.48119 15.7071 6.29366C15.5196 6.10612 15.2652 6.00076 15 6.00076Z"
        fill={focused ? '#00D99C' : 'white'}
      />
    </svg>
  );
};

export default GoBack;
