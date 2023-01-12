import * as React from 'react';

import { Dispatch, SetStateAction } from 'react';

import DirectionsIcon from '@mui/icons-material/Directions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

export type SpaceSearchProps = {
  searchedSpace: string;
  setSearchedSpace: Dispatch<SetStateAction<string>>;
};
export const SpaceSearch = ({
  searchedSpace,
  setSearchedSpace,
}: SpaceSearchProps) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        margin: '20px',

        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: '#3B3B3D',
      }}
    >
      <InputBase
        value={searchedSpace}
        onChange={event => setSearchedSpace(event.target.value)}
        sx={{ ml: 1, flex: 1, color: 'white' }}
        placeholder="Search For Spaces"
        inputProps={{ 'aria-label': 'search for spaces' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};
