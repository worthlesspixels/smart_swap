import { ReactElement } from 'react';

export interface InputFieldProps {
  placeHolder?: string;
  showIcon?: Boolean;
  errorState?: string;
  setError?: Boolean;
  value?: string;
  isInDialog?: Boolean;
  setInpValue: (value: string | number) => void;
  className?: string;
}

export type renderState = 'error' | 'unselected' | 'selected';
export type selectedCause = 'hover' | 'mouseClick';
