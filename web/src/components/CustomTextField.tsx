import { TextField } from '@mui/material';
import React from 'react';
export type CustomTextFieldProps = {
  label: string;
  className?: string;
  isMultiline?: boolean;
  rows?: number;
};
export const CustomTextField = ({
  label,
  className,
  isMultiline,
  rows,
}: CustomTextFieldProps) => {
  return (
    <TextField
      className={className}
      label={label}
      multiline={isMultiline}
      rows={rows ?? 1}
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
        // '&:hover .MuiOutlinedInput-notchedOutline': {
        //   borderColor: 'rgba(67, 187, 255, 1)',
        // },
        '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(67, 187, 255, .25)',
        },
        '.MuiInputLabel-root': {
          color: 'rgba(67, 187, 255)',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(67, 187, 255) !important',
        },
      }}
    />
  );
};
