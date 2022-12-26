// export interface UserState {
//   id: number | null;
//   name: string | null;
//   photo?: Blob | null;
// }

// export const DEFAULT_USER_STATE: UserState = {
//   id: null,
//   name: null,
//   photo: null,
// };

// export enum UserActions {
//   Login = 'user/LOGIN',
//   Logout = 'user/LOGOUT',
//   SignUp = 'user/SIGN_UP',
// }

// interface IncrementAction {
//   type: UserActions.login;
// }

// export const CountReducer = (
//   state: CountState = DEFAULT_COUNT_STATE,
//   action: IncrementAction
// ) => {
//   switch (action.type) {
//     case CountActions.INCREMENT:
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     default:
//       return state;
//   }
// };
export {};
