import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

export const CurrentSpace = () => {
  const space = useSelector(({ spaceState }: RootState) => spaceState.spaceId);
  return <div>CurrentSpace</div>;
};
