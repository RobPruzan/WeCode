export interface PostAmountState {
  amount: number;
  addingPostIsLoading: boolean;
}

export const DEFAULT_POST_AMOUNT_STATE: PostAmountState = {
  amount: 50,
  addingPostIsLoading: false,
};

export enum PostAmountActions {
  SetAmount = 'posAmount/SET_AMOUNT',
  SetIsLoading = 'postAmount/SET_IS_LOADING',
  SetIsNotLoading = 'postAmount/SET_IS_NOT_LOADING',
}

interface PostAmountAction {
  type: PostAmountActions.SetAmount;
  payload: { amount: number };
}

interface PostAmountIsLoadingAction {
  type: PostAmountActions.SetIsLoading;
}

interface PostAmountIsNotLoadingAction {
  type: PostAmountActions.SetIsNotLoading;
}

export const PostAmountReducer = (
  state: PostAmountState = DEFAULT_POST_AMOUNT_STATE,
  action:
    | PostAmountAction
    | PostAmountIsLoadingAction
    | PostAmountIsNotLoadingAction
) => {
  switch (action.type) {
    case PostAmountActions.SetAmount:
      return {
        ...state,
        amount: action.payload.amount,
      };
    case PostAmountActions.SetIsLoading:
      return {
        ...state,
        addingPostIsLoading: true,
      };
    case PostAmountActions.SetIsNotLoading:
      return {
        ...state,
        addingPostIsLoading: false,
      };

    default:
      return state;
  }
};
