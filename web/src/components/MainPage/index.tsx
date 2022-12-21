import React from 'react';
import Messages from './Messages';

const MainPage = () => {
  return (
    <div className="App">
      <div>
        {/* Navbar */}
        <nav>
          <div>Logo</div>
          <div>Menu</div>
        </nav>

        {/* Two columns */}
        <div className="columns">
          <div>Column 1</div>
          <div>Column 2</div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
