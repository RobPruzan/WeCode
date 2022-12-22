import React from 'react';
import { PostTabs } from './FeedView/Post/Tabs/PostTabs';
import CodeIcon from '@mui/icons-material/Code';
import { MenuItem } from '@mui/material';
import { Home, Menu } from '@mui/icons-material';
import { PostedContents } from './FeedView/PostedContents/PostedContents';
import FeedView from './FeedView/FeedView';

const MainPage = () => {
  return (
    <div className="App">
      <div>
        {/* Navbar */}
        <nav className="justify-content-between d-flex p-2">
          <div>
            <CodeIcon color="primary" />
          </div>
          <div>
            <Home color="primary" />
          </div>
        </nav>
        {/* Two columns */}
        <div className="columns">
          <div>Column 1</div>
          <div>
            <FeedView />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
