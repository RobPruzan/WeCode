import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { useState } from 'react';
import { JoinSpaceButton } from './JoinSpaceButton';
import { DropDown } from '../DropDown';
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const JoinSpace = () => {
  const [selectedSpace, setSelectedSpace] = useState<string>('Main');
  // const [open, setOpen] = React.useState(false);
  // const dispatch = useDispatch();

  // const space = useSelector(({ spaceState }: RootState) => spaceState.space);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSpace(event.target.value);
  };
  const tempOptions = ['Main', 'CSE 115', 'CSE 116', 'CSE 220', 'CSE 250'];

  return (
    <div>
      <DropDown
        selection={selectedSpace}
        options={tempOptions}
        handleChange={handleChange}
      />
      <JoinSpaceButton selectedSpace={selectedSpace} />
    </div>
  );
};
export default JoinSpace;
