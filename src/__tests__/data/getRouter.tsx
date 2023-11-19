import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../scripts/router/router';
import { Provider } from 'react-redux';
import { store } from '../../scripts/store/store';

export function getRouter(path = '/?page=1&limit=30') {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export function getRouter2(path = '/?page=1&limit=30') {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });
  return {
    app: (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    ),
    router,
  };
}
