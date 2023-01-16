import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { SpaceInfo } from './CreateSpace';

export type CreateSpaceButtonProps = {
  className?: string;
  spaceInfo: SpaceInfo;
  submitHandler: VoidFunction;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
export const CreateSpaceButton = ({
  className,
  spaceInfo,
  submitHandler,
  isLoading,
  isSuccess,
  isError,
}: CreateSpaceButtonProps) => {
  const [alert, setAlert] = React.useState(false);
  useEffect(() => {
    if (isSuccess) {
      setAlert(true);
    }
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading, isSuccess]);
  return (
    <>
      <button
        onClick={() => {
          submitHandler();
        }}
        disabled={isLoading}
        className="bg-neon-blue hover:bg-sky-300 text-white font-bold  w-full py-2 px-3 rounded-md"
      >
        Add Space
      </button>
    </>
  );
};
