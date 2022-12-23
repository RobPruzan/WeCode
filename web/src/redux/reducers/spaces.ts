export type Space = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export interface SpaceState {
  space: Space | null;
}

export const DEFAULT_POST_LOADING_STATE: SpaceState = {
  space: null,
};

export enum SpaceActions {
  SetSpace = 'postLoading/SET_SPACE',
  RemoveSpace = 'postLoading/REMOVE_SPACE',
}

interface SetSpaceAction {
  type: SpaceActions.SetSpace;
  payload: { space: Space };
}
interface RemoveSpaceAction {
  type: SpaceActions.RemoveSpace;
}

export const SpaceReducer = (
  state: SpaceState = DEFAULT_POST_LOADING_STATE,
  action: SetSpaceAction | RemoveSpaceAction
) => {
  switch (action.type) {
    case SpaceActions.SetSpace:
      return {
        ...state,
        space: action.payload.space,
      };
    case SpaceActions.RemoveSpace:
      return {
        ...state,
        space: null,
      };
    default:
      return state;
  }
};
