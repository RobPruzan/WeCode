import React, { Dispatch, SetStateAction } from 'react';

import { Radio } from '@material-ui/core';

type Props = {
  isPublic: boolean;
  setIsPublic: VoidFunction;
  className?: string;
};

const IsSpacePublic = ({ isPublic, setIsPublic, className }: Props) => {
  return (
    <div
      style={{
        border: '.5px solid',
        // border opactity 50%
        borderColor: 'rgba(67, 187, 255 , 0.4)',
        borderRadius: '3px',
      }}
      className={`${className} flex w-full justify-evenly items-center hover:border-opacity-100 rounded-sm`}
    >
      <p className="m-0 opacity-100">Is Space Public?</p>
      <Radio checked={isPublic} onClick={setIsPublic} />
    </div>
  );
};

export default IsSpacePublic;
