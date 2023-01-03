import React from 'react';
export type SpaceCardProps = {
  children?: React.ReactNode;
  className?: string;
};
export const SpaceCard = ({ children, className }: SpaceCardProps) => {
  return (
    <div
      style={{
        minWidth: '15rem',
        width: '13%',
      }}
      className={`border-2 items-center border-gray-500 text-white p-3 m-3  bg-zinc-800 shadow-md rounded-sm ${className}     h-2/6 max-h-72 flex flex-col content-center`}
    >
      {children}
    </div>
  );
};
