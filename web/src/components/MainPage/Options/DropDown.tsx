import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
export type MenuData = {
  value: string | number;
  option: string;
};
export type DropDownProps = {
  className?: string;
  selection?: string | number;
  menuData?: MenuData[];
  options?: string[];
  labelName: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  handleChange: (event: SelectChangeEvent) => void;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const DropDown = ({
  className,
  selection,
  handleChange,
  menuData,
  options,
  labelName,
  defaultValue,
  style,
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
      <FormControl sx={{ m: 1 }} className={className}>
        <InputLabel focused={true} id="demo-controlled-open-select-label">
          {labelName}
        </InputLabel>
        <Select
          className="w-100"
          sx={{
            ...style,
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
          value={selection ? String(selection) : undefined}
          defaultValue={defaultValue}
          label="Age"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {menuData
            ? menuData.map((data, idx) => (
                <MenuItem key={`MenuItem-${idx}`} value={data.value}>
                  {data.option}
                </MenuItem>
              ))
            : options?.map((option, idx) => (
                <MenuItem key={`MenuItem-${idx}`} value={option}>
                  {option}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
};
