import React, { useEffect } from 'react';

import './App.css';
import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import ReduxCount from './components/ReduxCount';
import MainPage from './components/MainPage/MainPage';
import { SpacesView } from './components/SpacesView/SpacesView';
import Account from './components/Account/Account';
const queryClient = new QueryClient();

const App = () => {
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
