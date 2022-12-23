import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export default function ControlledOpenSelect() {
  const [space, setSpace] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  // const test = useSelector(({ spaceState }: RootState) => spaceState.space);
  const handleChange = (event: SelectChangeEvent<typeof space>) => {
    // dispatch({ type: 'SET_SPACE', payload: event.target.value });
    setSpace(event.target.value);
  };

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
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-controlled-open-select-label">Space</InputLabel>
        <Select
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: 'rgba(228, 219, 233, 0.25)',
              // convert the hexidecimal color to rgba #43bbff
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
          value={space}
          label="Age"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={10}>Main</MenuItem>
          <MenuItem value={20}>CSE 115</MenuItem>
          <MenuItem value={30}>CSE 250</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
