import React, { useState } from 'react';
import WeCode, { User } from '../../services/connections';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { CustomTextField } from '../CustomTextField';
import RegisterUser from './RegisterUser';
import { RootState } from '../../redux/store';
import { UserActions } from '../../redux/reducers/user';
import { useMutation } from 'react-query';

export type RegisterType = 'Login' | 'Signup';
const UserAccess = () => {
  const [userName, setUserName] = useState('');
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [registerType, setRegisterType] = useState<'Login' | 'Signup'>();
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

  return (
    <>
      {user ? (
        <div className="flex justify-evenly items-center w-full   p-2">
          <p className=" text-2xl font-semibold m-0 ">{user.name}</p>
          <Button
            className="text-white"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex w-full justify-evenly items-center bg-opacity-50 p-2 mt-1">
          {/* <CustomTextField
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
            onClick={() => loginMutation.mutate(userName)}
          >
            Login
          </Button> */}
          {showRegisterPopup && registerType ? (
            <RegisterUser
              registerType={registerType}
              setShowRegisterPopup={setShowRegisterPopup}
            />
          ) : (
            <div className="flex w-full">
              {' '}
              <Button
                className="m-2 text-white w-1/2 "
                variant="contained"
                onClick={() => {
                  setRegisterType('Login');
                  setShowRegisterPopup(true);
                }}
              >
                Login
              </Button>
              <Button
                className="m-2 text-white w-1/2 "
                variant="contained"
                onClick={() => {
                  setRegisterType('Signup');
                  setShowRegisterPopup(true);
                }}
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserAccess;
