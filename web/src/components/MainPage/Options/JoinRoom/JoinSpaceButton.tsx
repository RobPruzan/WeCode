import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
export type JoinSpaceButtonProps = {
  selectedSpace: string;
};
export const JoinSpaceButton = ({ selectedSpace }: JoinSpaceButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: SpaceActions.SetSpace,
      payload: { spaceName: selectedSpace },
    });
  };
  return (
    <Button variant="outlined" onClick={handleClick}>
      Join Space
    </Button>
  );
};
