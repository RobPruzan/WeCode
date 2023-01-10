import React from 'react';
export type PrimaryCardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
export const PrimaryCard = ({className,children,style,}: PrimaryCardProps) => {
  return (
    <div
      className={`flex flex-column items-center m-3 ${className}`}
      style={{
        border: '1px solid #43bbff',
        borderRadius: '10px',

        ...style,
      }}
    >
      {children}
    </div>
  );
};
