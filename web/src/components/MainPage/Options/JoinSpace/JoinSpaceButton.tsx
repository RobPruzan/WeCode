import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
export type JoinSpaceButtonProps = {
  spaceId: number;
  className?: string;
};
export const JoinSpaceButton = ({
  spaceId,
  className,
}: JoinSpaceButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: SpaceActions.SetSpace,
      payload: { spaceId: spaceId },
    });
  };
  return (
    <Button className={className} variant="outlined" onClick={handleClick}>
      Join Space
    </Button>
  );
};
