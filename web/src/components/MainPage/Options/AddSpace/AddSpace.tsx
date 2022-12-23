import { SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DropDown } from '../DropDown';
import { AddSpaceButtons } from './AddSpaceButton';

const AddSpace = () => {
  const [addSpaceSelection, setAddSpaceSelection] = useState<string>();

  return (
    <div>
      Add Space
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
      <AddSpaceButtons />
    </div>
  );
};

export default AddSpace;
