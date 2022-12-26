import {
  Autocomplete,
  Stack,
  TextField,
  UseAutocompleteProps,
} from '@mui/material';
import React from 'react';
export type TypeAheadOption = {
  label: string;
  id: string;
};
export type TypeAheadProps = UseAutocompleteProps<
  unknown,
  undefined,
  undefined,
  undefined
> & {
  label: string;
};
export const TypeAhead = ({ label, ...props }: TypeAheadProps) => {
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.options as TypeAheadOption[]}
        getOptionLabel={option => (option?.label ? option.label : '')}
        filterSelectedOptions
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 0.25)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 0.25)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, 1) !important',
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(67, 187, 255, .25)',
          },
          '.MuiInputLabel-root': {
            color: 'rgba(67, 187, 255)',
          },
          // '&:hover': {
          //   backgroundColor: 'transparent !important',
          // },
        }}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              style: {
                color: 'white',
                background: '#141414',
              },
            }}
            label="Select Users"
            placeholder="Users"
          />
        )}
      />
    </Stack>
  );
};
