export type Space = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export interface SpaceState {
  space: Space | null;
  spaceName: string;
}

export const DEFAULT_SPACE_STATE: SpaceState = {
  space: null,
  // TODO remove
  spaceName: 'Main',
};

export enum SpaceActions {
  SetSpace = 'spaces/SET_SPACE',
  RemoveSpace = 'spaces/REMOVE_SPACE',
}

interface SetSpaceAction {
  type: SpaceActions.SetSpace;
  payload: { spaceName: Space };
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

        spaceName: action.payload.spaceName,
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
