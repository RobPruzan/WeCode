import React from 'react';

const LoadingCard = () => {
  return (
    <div
      style={{
        width: '25vw',
        minWidth: '300px',
        minHeight: '85px',
      }}
      className={`
  border-x-2 p-3  shadow-2xl flex justify-center items-end rounded-md border-neon-blue   text-white  mt-4  border-y-2 border-y-gray-900 text-center `}
    ></div>
  );
};

export default LoadingCard;
