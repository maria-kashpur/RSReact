import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('Testing ErrorPage component', () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });

  test('should show the not found messege', () => {
    expect(screen.getByText('The error was raised and handled')).toBeDefined();
  });
});
