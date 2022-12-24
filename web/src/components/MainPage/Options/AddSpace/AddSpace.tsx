import { SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DropDown } from '../DropDown';
import { AddSpaceButtons } from './AddSpaceButton';

const AddSpace = () => {
  const [addSpaceSelection, setAddSpaceSelection] = useState<string>();
  // sx={{ m: 1, width: '15em' }}
  return (
    <div style={{ width: '16em' }}>
      <TextField
        className="mb-2"
        label="Create Space"
        InputProps={{
          style: {
            color: 'white',
            background: '#141414',
          },
        }}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 0.25)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 0.25)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 1)',
          },
          // focused and hovered
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, .25)',
          },

          // '.MuiSvgIcon-root ': {
          //   fill: '#fff !important',
          // },
          // '.MuiInputBase-input': {
          //   color: '#fff',
          // },
          '.MuiInputLabel-root': {
            color: 'rgba(67, 187, 255)',
          },
        }}
      />
      <AddSpaceButtons />
    </div>
  );
};

export default AddSpace;
