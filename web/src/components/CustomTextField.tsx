import { TextField } from '@mui/material';
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
export type CustomTextFieldProps = {
  label: string;
  className?: string;
  isMultiline?: boolean;
  rows?: number;
  handleChange: ChangeEventHandler;
  value: string;
};
export const CustomTextField = ({
  label,
  className,
  isMultiline,
  rows,
  handleChange,
  value,
}: CustomTextFieldProps) => {
  return (
    <TextField
      value={value}
      onChange={handleChange}
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
