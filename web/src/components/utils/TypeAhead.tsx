import {
  Autocomplete,
  Stack,
  TextField,
  UseAutocompleteProps,
} from '@mui/material';

import { TypAheadChangeHandler } from '../MainPage/Options/CreateSpace/CreateSpace';

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
  changeHandler: TypAheadChangeHandler;
  members: TypeAheadOption[];
  placeholder: string;
};
export const TypeAhead = ({
  label,
  changeHandler,
  members,
  placeholder,
  ...props
}: TypeAheadProps) => {
  return (
    <Stack spacing={3}>
      <Autocomplete
        onChange={changeHandler}
        multiple
        value={members}
        id="tags-outlined"
        options={props.options as TypeAheadOption[]}
        getOptionLabel={option => option.label}
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

          minWidth: '15em',
          maxWidth: '15em',
        }}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,

              style: {
                color: 'white',

                opacity: 1,

                backgroundColor: '#141414',
              },
            }}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </Stack>
  );
};
