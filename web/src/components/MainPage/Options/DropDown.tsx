import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type DropDownProps = {
  className?: string;
  selection: string;
  options: string[];
  labelName: string;
  handleChange: (event: SelectChangeEvent) => void;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const DropDown = ({
  className,
  selection,
  handleChange,
  options,
  labelName,
}: DropDownProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '15em' }} className={className}>
        <InputLabel focused={true} id="demo-controlled-open-select-label">
          {labelName}
        </InputLabel>
        <Select
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(67, 187, 255, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(67, 187, 255, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(67, 187, 255, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white !important',
            },
          }}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selection}
          label="Age"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {options.map((option, idx) => (
            <MenuItem key={`MenuItem-${idx}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
