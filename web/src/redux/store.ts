import {
  ThunkAction,
  Action,
  createStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CountReducer, CountState } from './reducers/counts';
import logger from 'redux-logger';
import { PostLoadingReducer, PostLoadingState } from './reducers/postLoading';
import { SpaceReducer, SpaceState } from './reducers/spaces';
export interface RootState {
  countState: CountState;
  postLoadingState: PostLoadingState;
  spaceState: SpaceState;
}

export const store = createStore(
  combineReducers({
    countState: CountReducer,
    postLoadingState: PostLoadingReducer,
    spaceState: SpaceReducer,
  }),
  composeWithDevTools(applyMiddleware())
);
