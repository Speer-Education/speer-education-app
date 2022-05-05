import { useEffect } from 'react';
import "./App.css";
import ServiceWorkerWrapper from './components/ServiceWorker/ServiceWorkerWrapper';
import FallbackPage from './pages/Fallback/FallbackPage';
import {ErrorBoundary} from 'react-error-boundary';
import { logEvent } from './utils/analytics';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';

function App() {

  const routingInstrumentation = useRoutingInstrumentation();
  useEffect(() => {
    Sentry.init({
      dsn: "https://0ea940615ee84c89a07bb2e2cc91dbfe@o992434.ingest.sentry.io/5949937",
      //@ts-ignore
      integrations: [new Integrations.BrowserTracing({
        //@ts-ignore
        routingInstrumentation
      })],
    
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }, [routingInstrumentation]);

  useEffect(() => {
    logEvent('app_start', {
      app_version: process.env.REACT_APP_VERSION
    });
  },[]);

  const errorHandler= (error,errorInfo) => {
    console.log('logging error:', error, errorInfo)
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackPage} onError={errorHandler}>
      <div className="app bg-gray-100 min-h-screen">
        <div className="grid place-items-center w-screen h-screen bg-gray-100">
          <div className="flex flex-col items-center space-y-2">
            <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
            <h2>Welcome to Speer Education!</h2>
            <p>We're currently elevating our experience to new heights, come back in a few weeks as we're making the final changes</p>
            <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
          </div>
        </div>
        <ServiceWorkerWrapper/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
