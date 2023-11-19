import { render, screen } from '@testing-library/react';
import { getRouter } from '../../data/getRouter';

describe('Testing Router', () => {
  test('should show 404 page', async () => {
    render(getRouter('/errorPath'));
    expect(screen.getByText('The error was raised and handled')).toBeDefined();
  });

  test('should show the main page', async () => {
    render(getRouter());
    expect(screen.getByText('Potions')).toBeInTheDocument();
  });

  test('should show the main page', async () => {
    render(getRouter('/'));
    expect(screen.getByText('Potions')).toBeInTheDocument();
  });
});
