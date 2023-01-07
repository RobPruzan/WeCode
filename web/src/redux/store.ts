import { CountReducer, CountState } from './reducers/counts';
import { PostLoadingReducer, PostLoadingState } from './reducers/postLoading';
import { SpaceReducer, SpaceState } from './reducers/spaces';
import { UserReducer, UserState } from './reducers/user';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';

import { composeWithDevTools } from 'redux-devtools-extension';
import { count } from 'console';
export interface RootState {
  countState: CountState;
  postLoadingState: PostLoadingState;
  spaceState: SpaceState;
  userState: UserState;
}

export const store = createStore(
  combineReducers({
    // the reason these are called state is because they are the state of the reducer
    // the reducer is the function that takes in the state and action and returns the new state
    // by calling combineReducers(), we are combining the state of the reducers into one state
    countState: CountReducer,
    postLoadingState: PostLoadingReducer,
    spaceState: SpaceReducer,
    userState: UserReducer,
  }),
  composeWithDevTools(applyMiddleware())
);
