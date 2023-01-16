import WeCode, { UserAuthState } from '../../services/connections';

import { UserActions } from '../../redux/reducers/user';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { RegisterType } from '../../components/Account/UserAccess';
import { AxiosError, AxiosResponse } from 'axios';

export const useRegister = (registerType: RegisterType) => {
  const dispatch = useDispatch();
  const voteOnPostMutation = useMutation(
    (user: UserAuthState) => {
      if (registerType === ('Login' satisfies RegisterType)) {
        return WeCode.login(user);
      } else {
        return WeCode.signup(user);
      }
    },

    {
      onSuccess: data => {
        console.log('sweet');
        if (registerType === ('Login' satisfies RegisterType)) {
          dispatch({ type: UserActions.Login, payload: { user: data.data } });
        } else if (registerType === ('Signup' satisfies RegisterType)) {
          dispatch({
            type: UserActions.SignUp,
            payload: { user: data.data },
          });
        }
      },
      onError: (error, fd, fds) => {
        const errorData = (error as AxiosError<any, any>).response?.data;
        console.log('fdsaf', errorData);
        dispatch({
          type: UserActions.RegisterError,
          // Returns backend error text
          payload: { error: errorData },
        });
      },
    }
  );

  return voteOnPostMutation;
};
