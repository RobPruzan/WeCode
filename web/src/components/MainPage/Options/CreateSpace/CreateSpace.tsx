import { SelectChangeEvent, TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
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

const CreateSpace = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({
    name: '',
    members: [],
    description: '',
  });
  const handleNameChange: ChangeHandler = event => {
    console.log('name change');
    setSpaceInfo(prev => ({ ...prev, name: event.target.value }));
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

  const submitHandler = () => {
    WeCode.createSpace(spaceInfo);
  };

  return (
    <form style={{ width: '16em' }} className="p-2">
      <p className="h2 mx-2 mb-4">Create Space</p>
      <CustomTextField
        className="mb-2 w-100"
        label="Space Name"
        handleChange={handleNameChange}
      />
      <SpaceUsers className="my-2" changeHandler={handleUsersChange} />
      <SpaceDescription
        handleChange={handleDescriptionChange}
        className="my-2 w-100"
        isMultiline={true}
        rows={6}
      />
      <CreateSpaceButton
        className="my-2"
        spaceInfo={spaceInfo}
        submitHandler={submitHandler}
      />
    </form>
  );
};

export default CreateSpace;
