import 'bootstrap/dist/css/bootstrap.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
const theme = createTheme({
  // make default behavior root: {
  //   whiteSpace: "unset",
  //   wordBreak: "break-all"
  // }

  palette: {
    primary: {
      main: '#43bbff',
    },
    secondary: {
      main: '#141414',
    },
    // whitespace unset
  },

  typography: {
    fontFamily: 'Montserrat',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        whiteSpace: 'unset',
        wordBreak: 'break-all',
      },
    },
  },
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
