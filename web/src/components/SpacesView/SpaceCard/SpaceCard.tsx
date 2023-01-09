import React from 'react';
export type SpaceCardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
export const SpaceCard = ({ className, children, style }: SpaceCardProps) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#2D2D2F',
        border: '2px solid #3B3B3D',
        borderRadius: '4px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
        // whiteSpace: 'pre',

        ...style,
      }}
    >
      {children}
    </div>
  );
};
