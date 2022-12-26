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
  spaceId: number | null;
  spaceName: string | null;
}

export const DEFAULT_SPACE_STATE: SpaceState = {
  spaceId: null,
  spaceName: null,
  // TODO remove
};

export enum SpaceActions {
  SetSpace = 'spaces/SET_SPACE',
  RemoveSpace = 'spaces/REMOVE_SPACE',
}

interface SetSpaceAction {
  type: SpaceActions.SetSpace;
  payload: { spaceId: number; spaceName: string };
}
interface RemoveSpaceAction {
  type: SpaceActions.RemoveSpace;
}

export const SpaceReducer = (
  state: SpaceState = DEFAULT_SPACE_STATE,
  action: SetSpaceAction | RemoveSpaceAction
) => {
  switch (action.type) {
    case SpaceActions.SetSpace:
      return {
        ...state,

        spaceId: action.payload.spaceId,
        spaceName: action.payload.spaceName,
      };
    case SpaceActions.RemoveSpace:
      return {
        ...state,

        spaceId: null,
      };
    default:
      return state;
  }
};
