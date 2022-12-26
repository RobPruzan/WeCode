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
import { useEffect, useState } from 'react';
import { JoinSpaceButton } from './JoinSpaceButton';
import { DropDown, MenuData } from '../DropDown';
import { useQuery } from 'react-query';
import WeCode, { Space } from '../../../../services/connections';

export const PUBLIC_SPACE = 1;

const JoinSpace = () => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<number>(PUBLIC_SPACE);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { data, error, isLoading } = useQuery('spaces', async () => {
    const res = await WeCode.getSpaces();
    setSpaces(res);
  });
  useEffect(() => {
    async () => {
      const res = await WeCode.getSpaces();
    };
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {`${error}`}</div>;
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log('dropdown event', event);
    setSelectedSpaceId(Number(event.target.value));
  };

  const tempOptions = ['Main', 'CSE 115', 'CSE 116', 'CSE 220', 'CSE 250'];
  const menuData: MenuData[] = spaces.map(space => ({
    value: space.id,
    option: space.name,
  }));
  return (
    <div>
      <DropDown
        selection={selectedSpaceId}
        menuData={menuData}
        handleChange={handleChange}
        defaultValue={'Public'}
        labelName="Select Space"
        style={{
          minWidth: '15em',
        }}
      />
      <JoinSpaceButton className="m-2" spaceId={selectedSpaceId} />
    </div>
  );
};
export default JoinSpace;
