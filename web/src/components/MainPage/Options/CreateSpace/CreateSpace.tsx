import { SelectChangeEvent, TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { RootState } from '../../../../redux/store';
import WeCode from '../../../../services/connections';
import { CustomTextField } from '../../../CustomTextField';
import { TypeAheadOption } from '../../../utils/TypeAhead';
import { DropDown } from '../DropDown';
import { CreateSpaceButton } from './CreateSpaceButton';
import { SpaceDescription } from './SpaceDescription';
import { SpaceUsers } from './SpaceUsers';

export type TypAheadChangeHandler = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: TypeAheadOption[]
) => void;
export type ChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type SpaceInfo = {
  name: string;
  members: string[];
  description: string;
};

const DEFAULT_SPACE_INFO = {
  name: '',
  members: [],
  description: '',
};

const CreateSpace = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  const dispatch = useDispatch();
  const availableSpaces = useSelector(
    ({ spaceState }: RootState) => spaceState.availableSpaces
  );

  const { isLoading, isSuccess, isError, data, error, mutate } = useMutation(
    async (space: SpaceInfo) => {
      console.log('calling mutate');
      const response = await WeCode.createSpace(space);
      console.log('what is the response after mutating', response);
      return response;
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
    const users = newValue.map(user => user.id);
    setSpaceInfo(prev => ({ ...prev, members: users }));
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
    <form style={{ width: '16em' }} className="p-2">
      <p className="h2 mx-2 mb-4">Create Space</p>
      <CustomTextField
        value={spaceInfo.name}
        className="mb-2 w-100"
        label="Space Name"
        handleChange={handleNameChange}
      />
      <SpaceUsers
        className="my-2"
        changeHandler={handleUsersChange}
        members={spaceInfo.members}
      />
      <SpaceDescription
        value={spaceInfo.description}
        handleChange={handleDescriptionChange}
        className="my-2 w-100"
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
