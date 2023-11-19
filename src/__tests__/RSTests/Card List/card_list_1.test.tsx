import { render, screen, waitFor } from '@testing-library/react';
import { getRouter } from '../../data/getRouter';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';

describe('Testing Card List', async () => {
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

  test('should renders the specified number of cards', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const cards = screen.getAllByTestId('cardsItem');
      expect(cards.length).toBe(fakePotions.potions.length);
    });
  });
});
