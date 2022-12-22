import React from 'react';
import Messages from './Messages';
import { PostTabs } from './Post/Tabs';

const MainPage = () => {
  return (
    <div className="App">
      helo
      <div>
        helo
        {/* Navbar */}
        <nav>
          <div>Logo</div>
          <div>Menu</div>
        </nav>
        {/* Two columns */}
        <div className="columns">
          <div>Column 1</div>
          <div>
            <PostTabs className="mx-5 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
