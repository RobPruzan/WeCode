import React from 'react';
export type PrimaryCardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
export const PrimaryCard = ({
  className,
  children,
  style,
}: PrimaryCardProps) => {
  return (
    <div
      className={`d-flex flex-column align-items-center m-3 p-3 ${className}`}
      style={{
        ...style,
        border: '1px solid #43bbff',
        borderRadius: '10px',
        maxWidth: '18em',
      }}
    >
      {children}
    </div>
  );
};
