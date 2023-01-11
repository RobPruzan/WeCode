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
}

export const DEFAULT_SPACE_STATE: SpaceState = {
  currentSpaceId: 1,
  availableSpaces: null,
  // TODO remove
};

export enum SpaceActions {
  SetCurrentSpace = 'spaces/SET_CURRENT_SPACE',
  RemoveCurrentSpace = 'spaces/REMOVE_CURRENT_SPACE',
  SetAvailableSpaces = 'spaces/SET_AVAILABLE_SPACES',
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

export const SpaceReducer = (
  state: SpaceState = DEFAULT_SPACE_STATE,
  action: SetCurrentSpaceAction | RemoveSpaceAction | SetAvailableSpacesAction
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
    default:
      return state;
  }
};
