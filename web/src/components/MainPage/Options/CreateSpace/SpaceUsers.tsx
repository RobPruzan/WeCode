import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TypeAhead } from '../../../utils/TypeAhead';
import { useQuery } from 'react-query';
import WeCode from '../../../../services/connections';
import { Button } from '@mui/material';
import { TypAheadChangeHandler } from './CreateSpace';
export type SpaceUsersProps = {
  className?: string;
  changeHandler: TypAheadChangeHandler;
  members: string[];
};
export const SpaceUsers = ({
  className,
  changeHandler,
  members,
}: SpaceUsersProps) => {
  // useQuery for getting users using getUsers
  const { data, error, isLoading } = useQuery('users', () => WeCode.getUsers());

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {`${error}`}</div>;
  }

  return (
    <div className={className}>
      {data && (
        <TypeAhead
          members={members}
          label="Select Users"
          options={data}
          changeHandler={changeHandler}
        />
      )}
    </div>
  );
};
