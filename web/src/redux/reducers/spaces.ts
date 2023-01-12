import { User } from '../../services/connections';

export type Space = {
  id: number;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
};
export interface SpaceState {
  currentSpaceId: number | null;
  availableSpaces: Space[] | null;
  isLoading: boolean;
}

export const DEFAULT_SPACE_STATE: SpaceState = {
  currentSpaceId: 1,
  availableSpaces: null,
  isLoading: false,
  // TODO remove
};

export enum SpaceActions {
  SetCurrentSpace = 'spaces/SET_CURRENT_SPACE',
  RemoveCurrentSpace = 'spaces/REMOVE_CURRENT_SPACE',
  SetAvailableSpaces = 'spaces/SET_AVAILABLE_SPACES',
  SetIsLoading = 'spaces/SET_IS_LOADING',
  SetIsNotLoading = 'spaces/SET_IS_NOT_LOADING',
}

interface SetCurrentSpaceAction {
  type: SpaceActions.SetCurrentSpace;
  payload: { currentSpaceId: number };
}
interface RemoveSpaceAction {
  type: SpaceActions.RemoveCurrentSpace;
}

interface SetAvailableSpacesAction {
  type: SpaceActions.SetAvailableSpaces;
  payload: { availableSpaces: Space[] };
}

interface IsNotLoadingAction {
  type: SpaceActions.SetIsNotLoading;
}
interface IsLoadingAction {
  type: SpaceActions.SetIsLoading;
}

export const SpaceReducer = (
  state: SpaceState = DEFAULT_SPACE_STATE,
  action:
    | SetCurrentSpaceAction
    | RemoveSpaceAction
    | SetAvailableSpacesAction
    | IsNotLoadingAction
    | IsLoadingAction
) => {
  switch (action.type) {
    case SpaceActions.SetCurrentSpace:
      return {
        ...state,
        currentSpaceId: action.payload.currentSpaceId,
      };

    case SpaceActions.RemoveCurrentSpace:
      return {
        ...state,
        currentSpaceId: null,
      };

    case SpaceActions.SetAvailableSpaces:
      return {
        ...state,
        availableSpaces: action.payload.availableSpaces,
      };
    case SpaceActions.SetIsLoading:
      return {
        ...state,
        isLoading: true,
      };
    case SpaceActions.SetIsNotLoading:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
