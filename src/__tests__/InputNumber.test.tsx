import { fireEvent, render, screen } from '@testing-library/react';
import InputNumber from '../scripts/components/InputNumber/InputNumber';
import ErrorPage from '../scripts/pages/ErrorPage/ErrorPage';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { PotionsParamsProvider } from '../scripts/providers/HPParamsProvider';

function getRouter(params: string) {
  const routes = [
    {
      path: '/',
      element: (
        <PotionsParamsProvider>
          <InputNumber minValue={1} title={'Cards limit on the page:'} maxValue={30} />
        </PotionsParamsProvider>
      ),
      errorElement: <ErrorPage />,
    },
  ];
  return createMemoryRouter(routes, {
    initialEntries: [`/?${params}`],
    initialIndex: 1,
  });
}

describe('Testsing InputNumber component', () => {
  test('show InputNumber component', () => {
    render(<InputNumber />);
    expect(screen.getByTestId('pagintionWrap')).toBeInTheDocument();
  });

  test('show value inputLimit is 29', () => {
    render(<RouterProvider router={getRouter('page=4&limit=29')} />);
    const inputLimit = screen.getByTestId('inputLimit');
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('29');
  });

  test('show value inputLimit is 30 after clicking on increaseInputLimit', () => {
    render(<RouterProvider router={getRouter('page=4&limit=29')} />);
    const inputLimit = screen.getByTestId('inputLimit');
    const buttonPlus = screen.getByTestId('increaseInputLimit');
    fireEvent.click(buttonPlus);
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('30');
  });

  test('show value inputLimit is 28 after clicking on decreaseInputLimit', () => {
    render(<RouterProvider router={getRouter('page=4&limit=29')} />);
    const inputLimit = screen.getByTestId('inputLimit');
    const buttonMunus = screen.getByTestId('decreaseInputLimit');
    fireEvent.click(buttonMunus);
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('28');
  });

  test('show value inputLimit is 1 after change', () => {
    render(<RouterProvider router={getRouter('page=4&limit=29')} />);
    const inputLimit = screen.getByTestId('inputLimit');
    fireEvent.change(inputLimit, { target: { value: 1 } });
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('1');
  });
});
