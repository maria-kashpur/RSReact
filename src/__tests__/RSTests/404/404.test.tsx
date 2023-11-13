import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../../scripts/router/router';
import { render, screen } from '@testing-library/react';

describe('Testing Router', () => {
  test('should show 404 page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/errorPath'],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('The error was raised and handled')).toBeDefined();
  });

  test('should show the main page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=1&limit=30'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Potions')).toBeInTheDocument();
  });

  test('should show the main page', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=1&limit=30'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Potions')).toBeInTheDocument();
  });
});
