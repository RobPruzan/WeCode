import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPost = () => {
  return (
    <div
      style={{
        width: '86%',
      }}
      className="border-2 flex justify-center items-center rounded-lg shadow-md border-neon-blue mb-5 h-28 "
    >
      <Spinner />
    </div>
  );
};

export default LoadingPost;
