import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './router/router';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
