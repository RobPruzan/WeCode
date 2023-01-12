import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React, { useEffect } from 'react';

import Account from './components/Account/Account';
import Container from 'react-bootstrap/Container';
import MainPage from './components/MainPage/MainPage';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReduxCount from './components/ReduxCount';
import { SpacesView } from './components/SpacesView/SpacesView';
import { UserActions } from './redux/reducers/user';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userObect = JSON.parse(user ?? '');
      console.log('user object smile', userObect);

      dispatch({ type: UserActions.Login, payload: { user: userObect } });
    }
  }, []);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/spaces" element={<SpacesView />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};

export default App;
