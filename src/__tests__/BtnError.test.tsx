import { render, screen } from '@testing-library/react';
import BtnError from '../scripts/components/BtnError/BtnError';

describe('Testing ErrorPage component', () => {
  test('should show button', () => {
    render(<BtnError />);
    expect(screen.getByTestId('BtnError')).toBeInTheDocument();
  });
});
