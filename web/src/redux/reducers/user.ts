import { User } from '../../services/connections';
// TODO
// REMOVE ALL OF THIS AND MIGRATE THIS TO REACT QUERY
export interface UserState {
  user: User | null;
  // TODO remove username
  // userName: string | null;
}

export const DEFAULT_USER_STATE: UserState = {
  user: null,
  // userName: null,
};

export enum UserActions {
  Login = 'user/LOGIN',
  Logout = 'user/LOGOUT',
  SignUp = 'user/SIGN_UP',
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

export const UserReducer = (
  state: UserState = DEFAULT_USER_STATE,
  action: LoginAction | LogoutAction | SignUpAction
) => {
  switch (action.type) {
    case UserActions.Login:
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
      return {
        ...state,
        // userName: action.payload.userName,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
