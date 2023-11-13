import { render, screen } from '@testing-library/react';
import ErrorPage from '../scripts/pages/ErrorPage/ErrorPage';

describe('Testing ErrorPage component', () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });

  test('should show messege', () => {
    expect(screen.getByText('The error was raised and handled')).toBeInTheDocument();
  });
});
