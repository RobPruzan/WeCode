import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
export type JoinRoomButtonProps = {
  selectedSpace: string;
};
export const JoinRoomButton = ({ selectedSpace }: JoinRoomButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: SpaceActions.SetSpace,
      payload: { spaceName: selectedSpace },
    });
  };
  return <Button onClick={handleClick}>Join Room</Button>;
};
