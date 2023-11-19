import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { getRouter } from '../../data/getRouter';

describe('Testing Card', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: fakePotions,
      refetch: vi.fn(),
      isFetching: false,
    });
    vi.spyOn(potionApi, 'useGetPotionQuery');
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const card = screen.getAllByTestId('cardsItem')[0];
      fireEvent.click(card);
    });
    await waitFor(() => {
      expect(potionApi.useGetPotionQuery).not.toHaveBeenCalled();
    });
  });
});
