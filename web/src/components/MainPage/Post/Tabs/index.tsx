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
import { TextTab } from './TextTab';
import { CodeTab } from './CodeTab';

export enum TabType {
  'TEXT',
  'CODE',
}

export type TabsProps = {
  className?: string;
};
export const PostTabs = ({ className }: TabsProps) => {
  //  handling for matieral ui tabs
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setActiveTab(newValue);
  };

  return (
    <>
      <div
        className={className}
        style={{
          background: '#141414',
          border: '1px solid #43bbff',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="tabs"
          variant="fullWidth"
          sx={{
            background: '#141414',
            //  inactive tab underline color should be white
          }}
        >
          <Tab
            value={TabType.TEXT}
            icon={<TextFieldsIcon />}
            aria-label="text"
            //  inactive tab underline color should be white and active is #000000
            sx={{
              color: 'gray',
            }}
          />

          <Tab
            sx={{
              color: 'gray',
            }}
            value={TabType.CODE}
            icon={<CodeIcon />}
            aria-label="code"
          />
          {/* <TabPanel value={'Text'}>
            <h1>Text</h1>
          </TabPanel> */}
          {/* <TabPanel value="lol" /> */}
          {/* <TabPanel value={'Code'}>
            <h1>Code</h1>
          </TabPanel> */}
        </Tabs>
        {activeTab === TabType.TEXT && <TextTab />}
        {activeTab === TabType.CODE && <CodeTab />}
      </div>
    </>
  );
};
