import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateSpaceButton } from './CreateSpaceButton';
import { CustomTextField } from '../../../CustomTextField';
import { RootState } from '../../../../redux/store';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { SpaceDescription } from './SpaceDescription';
import { SpaceUsers } from './SpaceUsers';
import { TypeAheadOption } from '../../../utils/TypeAhead';
import WeCode from '../../../../services/connections';
import { useMutation } from 'react-query';

export type TypAheadChangeHandler = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TypeAheadOption[]
) => void;
export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type SpaceInfo = {
  name: string;
  members: TypeAheadOption[];
  description: string;
};

const DEFAULT_SPACE_INFO = {
  name: '',
  members: [],
  description: '',
};

const CreateSpace = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  const user = useSelector(({ userState }: RootState) => userState.user);
  const dispatch = useDispatch();
  const availableSpaces = useSelector(
    ({ spaceState }: RootState) => spaceState.availableSpaces
  );

  const { isLoading, isSuccess, isError, data, error, mutate } = useMutation(
    async (space: SpaceInfo) => {
      return user && (await WeCode.createSpace(space, user.id));
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

  const handleUsersChange: TypAheadChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: TypeAheadOption[]
  ) => {
    // const users = newValue.map(user => user.id);
    setSpaceInfo(prev => ({ ...prev, members: newValue }));
  };

  const submitHandler = async () => {
    await mutate(spaceInfo);

    dispatch({
      type: SpaceActions.SetAvailableSpaces,
      payload: { availableSpaces: [...(availableSpaces ?? []), spaceInfo] },
    });
    setSpaceInfo(DEFAULT_SPACE_INFO);
  };

  return (
    <form
      style={{ maxWidth: '18em' }}
      className="p-4  border-2 border-neon-blue rounded-lg"
    >
      <p className="h2 mx-2 mb-4">Create Space</p>
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
