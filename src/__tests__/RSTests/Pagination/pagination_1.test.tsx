import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { fakePotion } from '../../data/fakePotion';
import { getRouter2 } from '../../data/getRouter';

describe('Testing Pagination - Make sure the component updates URL query parameter when page changes', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: fakePotions,
      refetch: vi.fn(),
    });
    vi.spyOn(potionApi, 'useGetPotionQuery').mockReturnValue({
      data: fakePotion,
      refetch: vi.fn(),
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('start btn updates URL', async () => {
    const { app, router } = getRouter2('/?page=4&limit=29');
    render(app);
    const start = screen.getByTestId('startPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(start));
    expect(router.state.location.search).toMatch('page=1');
  });

  test('prev btn updates URL', async () => {
    const { app, router } = getRouter2('/?page=4&limit=29');
    render(app);
    const prev = screen.getByTestId('prevPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(prev));
    expect(router.state.location.search).toMatch('page=3');
  });

  test('next btn updates URL', async () => {
    const { app, router } = getRouter2('/?page=4&limit=29');
    render(app);
    const next = screen.getByTestId('nextPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(next));
    expect(router.state.location.search).toMatch('page=5');
  });

  test('end btn updates URL', async () => {
    const { app, router } = getRouter2('/?page=4&limit=29');
    render(app);
    const end = screen.getByTestId('endPagination');
    expect(router.state.location.search).toMatch('page=4');
    console.log(router.state.location.search);
    await waitFor(() => {
      fireEvent.click(end);
      expect(router.state.location.search).toMatch(`page=${fakePotions.pages}`);
    });
  });
});
