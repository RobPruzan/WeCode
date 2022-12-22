import React from 'react';
import TextField from '@mui/material/TextField';

export const InputText = () => {
  return (
    <TextField
      className="m-2"
      id="outlined-multiline-static"
      multiline
      rows={4}
      defaultValue="Default Value"
      variant="standard"
    />
  );
};
