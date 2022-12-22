import React, { SyntheticEvent, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Box from '@mui/material/Box';

export enum TabType {
  'TEXT',
  'CODE',
}

export type TabsProps = {
  className?: string;
};
export const PostTabs = ({ className }: TabsProps) => {
  //  handling for matieral ui tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <Card className={className}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="fullWidth"
        >
          <Tab value="Text" icon={<TextFieldsIcon />} aria-label="text" />
          <Tab value="Code" icon={<CodeIcon />} aria-label="code" />
        </Tabs>
      </Card>
    </>
  );
};
