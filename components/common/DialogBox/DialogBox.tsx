import React from 'react';
import { DialogBoxProps } from './DialogBox.type';
import DialogClose from '../../../assets/svgs/DialogClose';
import { FC } from 'react';

const DialogBox: FC<DialogBoxProps> = ({ children, onClose }) => {
  return (
    <div
      className={'z-[10] absolute flex justify-center items-center w-full h-full bg-transparent '}>
      <div className="relative flex flex-col rounded-2xl bg-white p-3 max-w-[50%] max-h-[50%]">
        {onClose && (
          <button
            className=" absolute top-3 right-3 flex justify-end"
            onClick={() => {
              onClose();
            }}>
            <DialogClose />
          </button>
        )}
        <div className="  flex flex-col overflow-auto scrollbar-hide p-5">{children}</div>
      </div>
    </div>
  );
};

export default DialogBox;
