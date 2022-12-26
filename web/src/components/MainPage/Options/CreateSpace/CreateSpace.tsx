import { SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CustomTextField } from '../../../CustomTextField';
import { DropDown } from '../DropDown';
import { CreateSpaceButton } from './CreateSpaceButton';
import { SpaceDescription } from './SpaceDescription';
import { SpaceUsers } from './SpaceUsers';

const CreateSpace = () => {
  const [addSpaceSelection, setAddSpaceSelection] = useState<string>();
  // sx={{ m: 1, width: '15em' }}
  return (
    <div style={{ width: '16em' }} className="p-2">
      <CustomTextField label="Create Space" className="mb-2 w-100" />
      <SpaceUsers className="my-2" />
      <SpaceDescription className="my-2 w-100" isMultiline={true} />

      <CreateSpaceButton />
    </div>
  );
};

export default CreateSpace;
