import { fireEvent, render, screen, act } from '@testing-library/react';
import { getRouter2 } from './data/getRouter';

describe('Testsing InputNumber component', () => {
  test('show InputNumber component', () => {
    const { app } = getRouter2('/?page=4&limit=29');
    render(app);
    expect(screen.getByTestId('pagintionWrap')).toBeInTheDocument();
  });

  test('show value inputLimit is 29', () => {
    const { app } = getRouter2('/?page=4&limit=29');
    render(app);
    const inputLimit = screen.getByTestId('inputLimit');
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('29');
  });

  test('show value inputLimit is 30 after clicking on increaseInputLimit', () => {
    const { app } = getRouter2('/?page=4&limit=29');
    render(app);
    const inputLimit = screen.getByTestId('inputLimit');
    const buttonPlus = screen.getByTestId('increaseInputLimit');
    fireEvent.click(buttonPlus);
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('30');
  });

  test('show value inputLimit is 28 after clicking on decreaseInputLimit', () => {
    const { app } = getRouter2('/?page=4&limit=29');
    render(app);
    const inputLimit = screen.getByTestId('inputLimit');
    const buttonMunus = screen.getByTestId('decreaseInputLimit');
    fireEvent.click(buttonMunus);
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('28');
  });

  test('show value inputLimit is 1 after change', async () => {
    const { app } = getRouter2('/?page=4&limit=29');
    render(app);
    const inputLimit = screen.getByTestId('inputLimit');
    await act(async () => fireEvent.change(inputLimit, { target: { value: 1 } }));
    const value = inputLimit.getAttribute('value');
    expect(value).toBe('1');
  });
});
