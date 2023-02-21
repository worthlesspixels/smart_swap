import { PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  onFocus?: () => void;
  onBlur?: () => void;
  onClick: () => void;
  className?: string;
}
