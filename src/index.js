import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./hooks/useAuth";
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#084887',
    },
    secondary: {
      main: '#F58A07',
    },
  },
});

Sentry.init({
  dsn: "https://0ea940615ee84c89a07bb2e2cc91dbfe@o992434.ingest.sentry.io/5949937",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
