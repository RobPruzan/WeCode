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
  placeholder:string
};
export const TypeAhead = ({
  label,
  changeHandler,
  members,
  placeholder,
  ...props
}: TypeAheadProps) => {
  console.log('whats the difference', props.options, members);
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
          // '&:hover': {
          //   backgroundColor: 'transparent !important',
          // },
        }}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              // className: 'bg-slate-800',
              style: {
                color: 'white',
                // background: ''
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
// import {
//   Autocomplete,
//   Stack,
//   TextField,
//   UseAutocompleteProps,
// } from '@mui/material';
// import React from 'react';
// export type TypeAheadOption = {
//   label: string;
//   id: string;
// };
// const options = ['Option 1', 'Option 2'];
// export type TypeAheadProps = UseAutocompleteProps<
//   unknown,
//   undefined,
//   undefined,
//   undefined
// > & {
//   label: string;
// };
// export const TypeAhead = ({ label, ...props }: TypeAheadProps) => {
//   const [value, setValue] = React.useState<string | null>(options[0]);
//   const [inputValue, setInputValue] = React.useState('');
//   return (
//     <Stack spacing={3}>
//       <Autocomplete
//         value={value}
//         onChange={(event: any, newValue: string | null) => {
//           setValue(newValue);
//         }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         multiple
//         id="tags-outlined"
//         options={options}
//         getOptionLabel={option => (option ? option : '')}
//         filterSelectedOptions
//         sx={{
//           color: 'white',
//           '.MuiOutlinedInput-notchedOutline': {
//             borderColor: 'rgba(67, 187, 255, 0.25)',
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'rgba(67, 187, 255, 0.25)',
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'rgba(67, 187, 255, 1) !important',
//           },
//           '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'rgba(67, 187, 255, .25)',
//           },
//           '.MuiInputLabel-root': {
//             color: 'rgba(67, 187, 255)',
//           },
//           // '&:hover': {
//           //   backgroundColor: 'transparent !important',
//           // },
//         }}
//         renderInput={params => (
//           <TextField
//             {...params}
//             InputProps={{
//               ...params.InputProps,
//               style: {
//                 color: 'white',
//                 background: '#141414',
//               },
//             }}
//             label="Select Users"
//             placeholder="Users"
//           />
//         )}
//       />
//     </Stack>
//   );
// };
// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// const options = ['Option 1', 'Option 2'];

// export const TypeAhead = () => {
//   const [value, setValue] = React.useState<string | null>(options[0]);
//   const [inputValue, setInputValue] = React.useState('');

//   return (
//     <div>
//       <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
//       <div>{`inputValue: '${inputValue}'`}</div>
//       <br />
//       <Autocomplete
//         value={value}
//         onChange={(event: any, newValue: string | null) => {
//           setValue(newValue);
//         }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         id="controllable-states-demo"
//         options={options}
//         sx={{ width: 300 }}
//         renderInput={params => <TextField {...params} label="Controllable" />}
//       />
//     </div>
//   );
// };
