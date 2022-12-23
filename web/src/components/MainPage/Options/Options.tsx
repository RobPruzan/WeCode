import React from 'react';
import JoinRoom from './JoinRoom/JoinRoom';

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      Join a space
      <JoinRoom />
    </div>
  );
};
