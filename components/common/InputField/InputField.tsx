import React from 'react';
import { FC } from 'react';
import { InputFieldProps, renderState, selectedCause } from './InputField.type';
import InputUserIconError from '../../../assets/svgs/InputUserIconError';
import InputUserIconSelected from '../../../assets/svgs/InputUserIconSelected';
import InputUserIconUnselected from '../../../assets/svgs/InputUserIconUnselected';
import { useEffect, useRef, useState } from 'react';
import InputErrorMessageIcon from '../../../assets/svgs/InputErrorMessageIcon';
import { twMerge } from 'tailwind-merge';
import Text from '../Text/Text';
import {
  DIALOG_INPUT_FIELD_STYLE_CLASSES,
  NON_DIALOG_INPUT_FIELD_STYLE_CLASSES,
} from '../../commonStyles';

const InputField: FC<InputFieldProps> = ({
  placeHolder = 'Enter Value',
  errorState,
  setError = false,
  showIcon = true,
  isInDialog = true,
  value,
  setInpValue,
  className,
}) => {
  const [selectedCause, setSelectedCause] = useState<selectedCause>('hover');
  const [renderState, setRenderState] = useState<renderState>('unselected');
  const inputFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setError) {
      setRenderState('error');
    } else {
      if (renderState === 'error') {
        setRenderState('unselected');
      }
    }
  }, [setError, renderState]);

  return (
    <div className={twMerge('flex flex-col', className)}>
      <div
        ref={inputFieldRef}
        className={twMerge(
          'flex justify-between items-center gap-1' +
            ' ' +
            (renderState === 'error' ? 'bg-[#FFDAD6] text-[#FF170A]' : 'bg-black text-white'),
          isInDialog ? DIALOG_INPUT_FIELD_STYLE_CLASSES : NON_DIALOG_INPUT_FIELD_STYLE_CLASSES,
          className && className
        )}
        onBlur={() => {
          if (selectedCause === 'mouseClick' && renderState !== 'error') {
            setSelectedCause('hover');
            setRenderState('unselected');
          }
        }}
        onMouseEnter={() => {
          if (renderState !== 'error') {
            setRenderState('selected');
          }
        }}
        onMouseLeave={() => {
          if (selectedCause === 'hover' && renderState !== 'error') {
            setRenderState('unselected');
          }
        }}
        onClick={() => {
          if (renderState !== 'error') {
            setSelectedCause('mouseClick');
            setRenderState('selected');
          }
        }}>
        <input
          className={
            (renderState === 'unselected'
              ? 'placeholder:text-[#AAAAB2]'
              : renderState === 'selected'
              ? 'placeholder:text-white'
              : 'placeholder:text-[#FF170A]') +
            ' ' +
            'w-[100%] placeholder:font-TT_Norms_Pro font-TT_Norms_Pro outline-none bg-transparent'
          }
          placeholder={placeHolder}
          onChange={(e) => {
            setInpValue(e.target.value);
          }}
          value={value}
        />
        {showIcon && (
          <div>
            {renderState === 'unselected' && <InputUserIconUnselected />}
            {renderState === 'selected' && <InputUserIconSelected />}
            {renderState === 'error' && <InputUserIconError />}
          </div>
        )}
      </div>
      {renderState === 'error' && (
        <div className="flex justify-start items-start gap-2 pl-2">
          <InputErrorMessageIcon className=" h-[1.5rem] w-[1.5rem]" />
          <Text className="text-ellipsis">{errorState || 'wrong input'}</Text>
        </div>
      )}
    </div>
  );
};

export default InputField;
