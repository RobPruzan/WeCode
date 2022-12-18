import React from 'react';

import './App.css';
import ReduxCount from './components/ReduxCount';

const App = () => {
  return (
    <div className="App">
      Hello yo
      <button type="button" className="btn btn-primary mb-5">
        Primary
      </button>
      <ReduxCount />
    </div>
  );
};

export default App;
