import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import ErrorBoundary from './scripts/components/ErrorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router';
import router from './scripts/router/router.tsx';
import { store } from './scripts/store/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
