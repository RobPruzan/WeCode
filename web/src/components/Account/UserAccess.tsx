import React, { useState } from 'react';
import WeCode, { User } from '../../services/connections';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { CustomTextField } from '../CustomTextField';
import { RootState } from '../../redux/store';
import { UserActions } from '../../redux/reducers/user';
import { useMutation } from 'react-query';

const UserAccess = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(({ userState }: RootState) => userState.user);
  // TODO
  // WE NEED LOGINS AND REAL AUTHENTICATION
  const handleSignin = (userData: User) => {
    dispatch({ type: UserActions.SignUp, payload: { user: userData } });
  };
  const handleLogout = () => {
    dispatch({ type: UserActions.Logout });
  };
  const { mutate, data } = useMutation(
    async (userName: string) => {
      return WeCode.createUser(userName);
    },
    {
      onSuccess: data => {
        handleSignin(data);
      },
    }
  );
  return (
    <>
      {user ? (
        <div className="flex justify-evenly items-center w-full   p-2">
          <p className="h4 m-0 ">{user.name}</p>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex  justify-evenly items-center bg-opacity-50  mt-1">
          <CustomTextField
            focused={true}
            variant={'filled'}
            label="User Name"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(event.target.value)
            }
            value={userName}
          />
          <Button
            className="m-2"
            variant="contained"
            onClick={() => mutate(userName)}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default UserAccess;
