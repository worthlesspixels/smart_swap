import React from 'react';
import { FC } from 'react';
import { ButtonProps } from './Button.type';
import { useState } from 'react';

const Button: FC<ButtonProps> = ({ onBlur, onFocus, onClick, className, children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <button
      className={className}
      onMouseEnter={onFocus}
      onMouseLeave={() => {
        if (!focused) {
          onBlur && onBlur();
        }
      }}
      onFocus={() => {
        setFocused(true);
        onFocus && onFocus();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur && onBlur();
      }}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
