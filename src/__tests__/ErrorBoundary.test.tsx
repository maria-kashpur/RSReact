import { fireEvent, render, screen } from '@testing-library/react';
import BtnError from '../scripts/components/BtnError/BtnError';
import ErrorBoundary from '../scripts/components/ErrorBoundary/ErrorBoundary';

describe('Testing ErrorBoundary', () => {
  test('should show button', () => {
    render(
      <ErrorBoundary>
        <BtnError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('BtnError')).toBeInTheDocument();
  });
  test('should show ErrorPage after click BtnError', () => {
    const { container } = render(
      <ErrorBoundary>
        <BtnError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('BtnError')).toBeInTheDocument();
    const button = container.querySelector('.btn-error');
    expect(button).instanceOf(HTMLElement);
    fireEvent.click(button as HTMLElement);
    expect(screen.getByText('The error was raised and handled')).toBeInTheDocument();
  });
});
