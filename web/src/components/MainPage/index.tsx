import React from 'react';
import Messages from './Messages';

const MainPage = () => {
  return (
    <div className="App">
      <div className="grid">
        <div className="column-1">
          <header>header stuff</header>
          <Messages />
        </div>
        <div className="column-2">Column 2</div>
        <div className="column-3">
          <div className="nested-grid">
            <div className="top-half">Top half</div>
            <div className="bottom-half">Bottom half</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
