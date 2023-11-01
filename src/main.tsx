import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import ErrorBoundary from './scripts/components/ErrorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router';
import router from './router/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
