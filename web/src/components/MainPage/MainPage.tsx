import React from 'react';
import { PostTabs } from './FeedView/Post/Tabs/PostTabs';
import CodeIcon from '@mui/icons-material/Code';
import { MenuItem } from '@mui/material';
import { Home, Menu } from '@mui/icons-material';
import { PostedContents } from './FeedView/PostedContents/PostedContents';
import FeedView from './FeedView/FeedView';
import { Options } from './Options/Options';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MainPage = () => {
  return (
    <div className="App">
      <div>
        {/* Navbar */}
        <nav className="justify-content-between d-flex p-2">
          <div style={{ color: 'white' }}>
            We Code
            <CodeIcon fontSize="large" className="m-1" />
          </div>
          <div className="m-2">
            {/* <AccountCircleIcon color="primary" /> */}
            {/* same account circle but thats bigger */}
            <AccountCircleIcon fontSize="large" />
          </div>
        </nav>
        {/* Two columns */}
        <div className="columns">
          <Options />
          <div>
            <FeedView />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
