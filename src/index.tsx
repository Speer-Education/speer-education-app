import React from 'react';
import './index.css';
import App from './App';
import { AuthProvider } from "./hooks/useAuth";
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#084887',
    },
    secondary: {
      main: '#F58A07',
    },
  },
});


ReactDOM.createRoot(
  document.getElementById('root')!
).render(
<React.StrictMode>
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </StyledEngineProvider>
</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
