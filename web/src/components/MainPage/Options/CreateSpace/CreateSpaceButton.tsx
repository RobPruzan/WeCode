import React from 'react';
import { Button } from '@mui/material';
import { SpaceInfo } from './CreateSpace';
export type CreateSpaceButtonProps = {
  className?: string;
  spaceInfo: SpaceInfo;
  submitHandler: VoidFunction;
};
export const CreateSpaceButton = ({
  className,
  spaceInfo,
  submitHandler,
}: CreateSpaceButtonProps) => {
  return (
    <>
      <Button onClick={submitHandler} className={className} variant="outlined">
        Add Space
      </Button>
    </>
  );
};
