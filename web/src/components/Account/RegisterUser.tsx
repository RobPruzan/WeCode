import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomTextField } from '../CustomTextField';
import { RegisterType } from './UserAccess';
import { RootState } from '../../redux/store';
import { Spinner } from 'react-bootstrap';
import { UserActions } from '../../redux/reducers/user';
import { useRegister } from '../../hooks/UserHooks/useRegister';

type RegisterUserProps = {
  setShowRegisterPopup: Dispatch<SetStateAction<boolean>>;
  registerType: RegisterType;
};

const RegisterUser = ({
  setShowRegisterPopup,
  registerType,
}: RegisterUserProps) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const loginMutation = useRegister('Login');
  const signupMutation = useRegister('Signup');

  const dispatch = useDispatch();
  const registerError = useSelector(
    ({ userState }: RootState) => userState.registerError
  );

  const handleLogin = () => {
    if (username && password) {
      console.log(username, password);
      loginMutation.mutate({ name: username, password: password });
    } else {
      console.log('Username or password is empty', username, password);
    }
  };

  const handleSignup = () => {
    if (username && password) {
      signupMutation.mutate({ name: username, password: password });
    } else {
      console.log(
        'Username or password is empty (in the signup)',
        username,
        password
      );
    }
  };

  const handleSubmitRegister = () => {
    if (registerType === 'Login') {
      handleLogin();
    }
    if (registerType === 'Signup') {
      handleSignup();
    }
  };

  const handleCancel = () => {
    dispatch({ type: UserActions.RegisterError, payload: { error: null } });
    setShowRegisterPopup(false);
  };
  return (
    <div className=" border-neon-blue border-2 rounded-lg flex flex-col justify-center items-center ">
      <p className="text-white text-2xl font-semibold mt-2 p-0">
        {registerType}
      </p>
      <div className="flex flex-col w-80 mb-4 bg-custom-dark-gray rounded-lg p-4 py-0 ">
        <CustomTextField
          focused={true}
          variant={'filled'}
          label="Username"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          value={username ?? ''}
        />
        <CustomTextField
          label="Password"
          type="password"
          autoComplete="current-password"
          focused={true}
          variant={'filled'}
          handleChange={event => {
            console.log(password);
            setPassword(event.target.value);
          }}
          value={password ?? ''}
        />
        <p className="text-red-500 text-sm font-semibold mb-0 mt-3">
          {registerError}
        </p>
      </div>
      <div className="flex w-full">
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white  p-2 hover:bg-red-400 w-1/2 font-semibold  rounded-l-md rounded-t-none"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitRegister}
          className="bg-neon-blue text-white  p-2 hover:bg-sky-300 w-1/2 font-semibold rounded-b-md rounded-l-none"
        >
          {loginMutation.isLoading || signupMutation.isLoading ? (
            <Spinner size="sm" animation="border" variant="light" />
          ) : (
            registerType
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
