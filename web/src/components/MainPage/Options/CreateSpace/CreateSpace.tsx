import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';

import { BsXLg } from 'react-icons/bs';
import { CreateSpaceButton } from './CreateSpaceButton';
import { CustomTextField } from '../../../CustomTextField';
import { Filters } from '../../Filters/FilterOptions';
import IsSpacePublic from './IsSpacePublic';
import { RootState } from '../../../../redux/store';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { SpaceDescription } from './SpaceDescription';
import { SpaceUsers } from './SpaceUsers';
import { TypeAheadOption } from '../../../utils/TypeAhead';
import WeCode from '../../../../services/connections';

export type FilterChangeHandler = (
  event: SyntheticEvent<Element, Event>,
  newValue: TypeAheadOption[],
  // only takes key of Filters (names or languages)
  filterChoice: keyof Filters
) => void;

export type TypAheadChangeHandler = (
  event: SyntheticEvent<Element, Event>,
  newValue: TypeAheadOption[]
  // only takes key of Filters (names or languages)
) => void;
export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type SpaceInfo = {
  name: string;
  members: TypeAheadOption[];
  description: string;
  isPublic: boolean;
};

export const DEFAULT_SPACE_INFO = {
  name: '',
  members: [],
  description: '',
  isPublic: false,
};

export type CreateSpaceProps = {
  setAddSpace: Dispatch<SetStateAction<boolean>>;
};
const CreateSpace = ({ setAddSpace }: CreateSpaceProps) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);

  const user = useSelector(({ userState }: RootState) => userState.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const availableSpaces = useSelector(
    ({ spaceState }: RootState) => spaceState.availableSpaces
  );

  const { isLoading, isSuccess, isError, data, error, mutate } = useMutation(
    async (space: SpaceInfo) => {
      return user && (await WeCode.createSpace(space, user.id));
    },
    {
      onSuccess: data => {
        dispatch({
          type: SpaceActions.SetAvailableSpaces,
          payload: {
            availableSpaces: [...(availableSpaces ?? []), spaceInfo].reverse(),
          },
        });
        queryClient.invalidateQueries(['spaces', user?.id]);
      },
    }
  );
  const handleIsPublic = () => {
    setSpaceInfo(prev => ({ ...prev, isPublic: !prev.isPublic }));
  };
  const handleNameChange: ChangeHandler = event => {
    if (event.target.value.length > 20) {
      setSpaceInfo(prev => ({
        ...prev,
        name: event.target.value.slice(0, 20),
      }));
    } else {
      setSpaceInfo(prev => ({ ...prev, name: event.target.value }));
    }
  };

  const handleDescriptionChange: ChangeHandler = event => {
    setSpaceInfo(prev => ({ ...prev, description: event.target.value }));
  };

  const handleUsersChange: TypAheadChangeHandler = (event, newValue) => {
    // const users = newValue.map(user => user.id);
    setSpaceInfo(prev => ({ ...prev, members: newValue }));
  };

  const submitHandler = async () => {
    mutate(spaceInfo);

    setSpaceInfo(DEFAULT_SPACE_INFO);
  };

  return (
    <form
      style={{ maxWidth: '18em' }}
      className="p-4  border-2 border-neon-blue rounded-lg bg-custom-dark-gray"
    >
      <BsXLg
        style={{ margin: '-20px' }}
        className="cursor-pointer"
        onClick={() => setAddSpace(false)}
      />
      <p className="h2 mx-2 mt-4 mb-4">Create Space</p>
      <CustomTextField
        value={spaceInfo.name}
        className="mb-2 w-60 "
        label="Space Name"
        handleChange={handleNameChange}
      />
      <SpaceUsers
        className="my-2 w-60"
        changeHandler={handleUsersChange}
        members={spaceInfo.members}
      />
      <SpaceDescription
        value={spaceInfo.description}
        handleChange={handleDescriptionChange}
        className="my-2 w-60"
        isMultiline={true}
        rows={6}
      />
      <IsSpacePublic
        className="mt-2 mb-3 "
        isPublic={spaceInfo.isPublic}
        setIsPublic={handleIsPublic}
      />
      <CreateSpaceButton
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        spaceInfo={spaceInfo}
        submitHandler={submitHandler}
      />
    </form>
  );
};

export default CreateSpace;
