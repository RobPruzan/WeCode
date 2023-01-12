import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsXLg } from 'react-icons/bs';
import { CreateSpaceButton } from './CreateSpaceButton';
import { CustomTextField } from '../../../CustomTextField';
import { Filters } from '../../Filters/LanguageOptions';
import { RootState } from '../../../../redux/store';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { SpaceDescription } from './SpaceDescription';
import { SpaceUsers } from './SpaceUsers';
import { TypeAheadOption } from '../../../utils/TypeAhead';
import WeCode from '../../../../services/connections';
import { useMutation } from 'react-query';

export type FilterChangeHandler = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TypeAheadOption[],
  // only takes key of Filters (names or languages)
  filterChoice: keyof Filters
) => void;

export type TypAheadChangeHandler = (
  event: React.SyntheticEvent<Element, Event>,
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
};

export const DEFAULT_SPACE_INFO = {
  name: '',
  members: [],
  description: '',
};

export type CreateSpaceProps = {
  setAddSpace: Dispatch<SetStateAction<boolean>>;
};
const CreateSpace = ({ setAddSpace }: CreateSpaceProps) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  const user = useSelector(({ userState }: RootState) => userState.user);
  const dispatch = useDispatch();
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
      },
    }
  );

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
      <CreateSpaceButton
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        className="my-2"
        spaceInfo={spaceInfo}
        submitHandler={submitHandler}
      />
    </form>
  );
};

export default CreateSpace;
