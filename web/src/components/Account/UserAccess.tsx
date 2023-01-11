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
  const user = useSelector(
    // we are selecting one of the users from the reducer
    ({ userState }: RootState) => userState.user
  );
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
        <></>
      ) : (
        <div className="justify-content-center">
          <p className="h3 mt-2">Login</p>
          <CustomTextField
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
