import { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';

export type CustomTextFieldProps = {
  label: string;
  className?: string;
  isMultiline?: boolean;
  rows?: number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: string;
};
export const CustomTextField = ({
  label,
  className,
  isMultiline,
  rows,
  handleChange,
  value,
  type,
}: CustomTextFieldProps) => {
  return (
    <TextField
      type={type ?? 'text'}
      value={value}
      onChange={handleChange}
      className={className}
      label={label}
      multiline={isMultiline}
      rows={rows}
      InputProps={{
        style: {
          color: 'white',
          backgroundColor: '#141414',
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
