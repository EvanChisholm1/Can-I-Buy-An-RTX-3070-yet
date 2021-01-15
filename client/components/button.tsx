import React, { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  color?: 'green' | 'blue' | 'red';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<Props> = ({ children, onClick, className }) => {
  return (
    <button
      className={`focus:outline-none w-32 py-2 rounded-md font-semibold text-white bg-indigo-500 ring-4 ring-indigo-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
