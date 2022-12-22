import React from 'react';
import { PostTabs } from './Post/Tabs';
import CodeIcon from '@mui/icons-material/Code';
import { MenuItem } from '@mui/material';
import { Home, Menu } from '@mui/icons-material';
import { PostedContents } from './PostedContents';

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
            <PostTabs className="mx-5 mt-2 mb-5" />
            <PostedContents className="mx-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
