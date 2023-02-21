import React from 'react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { TextProps } from './Text.type';

const Text: FC<TextProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge('text-black font-TT_Norms_Pro truncate', className)}>{children}</div>
  );
};

export default Text;
