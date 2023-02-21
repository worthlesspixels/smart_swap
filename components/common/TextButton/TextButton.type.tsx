import { PropsWithChildren } from 'react';

export interface TextButtonProps extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
  children: string;
}
