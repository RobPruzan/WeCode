import React from 'react';
import TextField from '@mui/material/TextField';

export const InputText = () => {
  return (
    <TextField
      className="p-2 "
      id="outlined-multiline-static"
      multiline
      rows={4}
      defaultValue="Default Value"
      variant="standard"
      //  unfocused color of the outline should be white
      sx={{
        color: 'white',
        background: '#141414',
      }}
      InputProps={{
        style: {
          color: 'white',
          background: '#141414',
        },
      }}
      fullWidth
    />
  );
};
