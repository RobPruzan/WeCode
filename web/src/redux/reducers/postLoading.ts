export interface PostLoadingState {
  loading: boolean;
}

export const DEFAULT_POST_LOADING_STATE: PostLoadingState = {
  loading: false,
};

export enum PostLoadingActions {
  SetIsLoading = 'postLoading/SET_IS_LOADING',
  SetIsNotLoading = 'postLoading/SET_IS_NOT_LOADING',
}

interface PostIsLoadingAction {
  type: PostLoadingActions.SetIsLoading;
}
interface PostNotLoadingAction {
  type: PostLoadingActions.SetIsNotLoading;
}

export const PostLoadingReducer = (
  state: PostLoadingState = DEFAULT_POST_LOADING_STATE,
  action: PostIsLoadingAction | PostNotLoadingAction
) => {
  switch (action.type) {
    case PostLoadingActions.SetIsLoading:
      return {
        ...state,
        loading: true,
      };
    case PostLoadingActions.SetIsNotLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
