import React from 'react';
import { FC } from 'react';
import { ActiveStatusIconProps } from './ActiveStatusIcon.type';
import { twMerge } from 'tailwind-merge';
import Status from '../../../assets/svgs/Status';

const ActiveStatusIcon: FC<ActiveStatusIconProps> = ({ img, isActive, className }) => {
  return (
    <div className={twMerge('relative w-8 h-8 ', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={className ? 'w-full h-full rounded-full' : ' rounded-full'}
        src={img}
        alt={'User'}
      />
      {isActive !== undefined && (
        <Status className=" absolute right-0 bottom-0" focused={isActive} />
      )}
    </div>
  );
};

export default ActiveStatusIcon;
