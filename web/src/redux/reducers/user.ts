import { User } from '../../services/connections';
// TODO
// REMOVE ALL OF THIS AND MIGRATE THIS TO REACT QUERY
export interface UserState {
  user: User | null;
  registerError: string | null;
}

export const DEFAULT_USER_STATE: UserState = {
  user: null,
  registerError: null,
};

export enum UserActions {
  Login = 'user/LOGIN',
  Logout = 'user/LOGOUT',
  SignUp = 'user/SIGN_UP',
  RegisterError = 'user/REGISTER_ERROR',
}

interface LoginAction {
  type: UserActions.Login;
  payload: { user: User };
}

interface LogoutAction {
  type: UserActions.Logout;
}
interface SignUpAction {
  type: UserActions.SignUp;
  payload: { user: User };
}

interface RegisterErrorAction {
  type: UserActions.RegisterError;
  payload: { error: string | null };
}

export const UserReducer = (
  state: UserState = DEFAULT_USER_STATE,
  action: LoginAction | LogoutAction | SignUpAction | RegisterErrorAction
) => {
  switch (action.type) {
    case UserActions.Login:
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }

      return {
        ...state,
        user: action.payload.user,
      };
    case UserActions.Logout:
      return {
        ...state,
        user: null,
      };
    case UserActions.SignUp:
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
      return {
        ...state,
        // userName: action.payload.userName,
        user: action.payload.user,
      };

    case UserActions.RegisterError:
      return {
        ...state,
        registerError: action.payload.error,
      };

    default:
      return state;
  }
};
