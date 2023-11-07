import { render, screen } from '@testing-library/react';
import ErrorPage from '../../api/pages/ErrorPage/ErrorPage';
import CardDetail from '../CardDetail/CardDetail';
import App from './App';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';

const routes = [
  {
    path: '/RSReact',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'detail/:id',
        element: <CardDetail />,
      },
    ],
  },
];

describe('Testing Router', () => {
  test('should show 404 page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/RSReact', '/RSReact/errorPath'],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('The error was raised and handled')).toBeDefined();
  });

  test('should show the main page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/RSReact?page=1&limit=30'],
      initialIndex: 0,
    });
    render(<RouterProvider router={router} />);
    screen.debug();
    expect(screen.getByText('Potions')).toBeDefined();
  });
});

// describe('Testing App', () => {
//   test('')
// })

// describe('Testing localStorage', () => {
//   test('gets params from localStorage ', () => {
//     const PARAMS_KEY = 'potionsParams';
//     const params = {
//       sort: {
//         param: 'ASC',
//         attribute: 'name',
//       },
//       pagination: {
//         page: 3,
//         limit: 30,
//       },
//     };
//     localStorage.setItem(PARAMS_KEY, JSON.stringify(params));
//     expect(getTodos())

//     // const router = createMemoryRouter(routes, {
//     //   initialEntries: ['/RSReact', '/RSReact/errorPath'],
//     //   initialIndex: 1,
//     // });
//     // render(<RouterProvider router={router} />);
//     // expect(screen.getByText('The error was raised and handled')).toBeDefined();
//   });
// });
