declare module 'react-hot-toast' {
  import { ReactNode } from 'react';

  export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

  export interface ToastOptions {
    duration?: number;
    position?: ToastPosition;
  }

  export function toast(
    message: string | ReactNode,
    options?: ToastOptions
  ): string;
  export function Toaster(props: any): JSX.Element;
}
