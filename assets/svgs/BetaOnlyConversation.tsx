import React from 'react';
import { FC } from 'react';
import { SvgProps } from './svg.type';

const BetaOnlyConversation: FC<SvgProps> = ({ className, focused }) => {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="52" height="52" rx={focused ? '18' : '23'} fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_398_11564" transform="translate(0 -0.166667) scale(0.00277778)" />
        </pattern>
        <image
          id="image0_398_11564"
          width="360"
          height="480"
          xlinkHref="data:image/jpeg;base64,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"
        />
      </defs>
    </svg>
  );
};

export default BetaOnlyConversation;
