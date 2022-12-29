import React from 'react';
export type SpaceCardProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
export const SpaceCard = ({ children, style }: SpaceCardProps) => {
  return (
    <div
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
