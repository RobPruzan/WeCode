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
      <Button
        onClick={() => {
          submitHandler();
        }}
        className={className}
        variant="outlined"
        disabled={isLoading}
      >
        Add Space
      </Button>
    </>
  );
};
