import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './scripts/components/App/App.tsx';
import './styles/index.scss';
import ErrorBoundary from './scripts/components/ErrorBoundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
