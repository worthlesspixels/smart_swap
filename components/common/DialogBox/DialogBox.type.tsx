import { PropsWithChildren } from 'react';

export interface DialogBoxProps extends PropsWithChildren {
  onClose?: () => void;
}
