import { act, fireEvent, render, screen } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { getRouter } from '../../data/getRouter';

describe.shuffle('Testing Search', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: fakePotions,
      refetch: vi.fn(),
      isFetching: false,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    render(getRouter('/?page=4&limit=29'));
    await act(async () => localStorage.removeItem('search'));
    expect(localStorage.getItem('search')).toBe(null);
    const searchInput = screen.getByTestId('searchInput');
    await act(async () => fireEvent.change(searchInput, { target: { value: 'sss' } }));
    const searchBtn = screen.getByTestId('searchBtn');
    await act(async () => fireEvent.click(searchBtn));
    expect(localStorage.getItem('search')).toBe('sss');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    render(getRouter('/?page=4&limit=29'));
    const ls = localStorage.getItem('search') || '';
    const input = screen.getByTestId('searchInput') as HTMLInputElement;
    expect(input.value).toEqual(ls);
  });
});
