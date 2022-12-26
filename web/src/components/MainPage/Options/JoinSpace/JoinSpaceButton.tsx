import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
export type JoinSpaceButtonProps = {
  selectedSpace: string;
  className?: string;
};
export const JoinSpaceButton = ({
  selectedSpace,
  className,
}: JoinSpaceButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: SpaceActions.SetSpace,
      payload: { spaceName: selectedSpace },
    });
  };
  return (
    <Button className={className} variant="outlined" onClick={handleClick}>
      Join Space
    </Button>
  );
};
