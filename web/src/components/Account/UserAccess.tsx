import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../redux/reducers/user';
import { RootState } from '../../redux/store';
import WeCode, { User } from '../../services/connections';
import { CustomTextField } from '../CustomTextField';

const UserAccess = () => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(
    // we are selecting one of the users from the reducer
    ({ userState }: RootState) => userState.user
  );
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
    <div>
      {user ? (
        <>
          Logged in as: {user.name}
          <Button
            className="mx-2"
            onClick={() => handleLogout()}
            variant="contained"
          >
            Logout
          </Button>
        </>
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
    </div>
  );
};

export default UserAccess;
