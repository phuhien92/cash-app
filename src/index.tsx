import '@hookstate/devtools';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';
import App from './containers/App';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
