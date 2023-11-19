import { render, screen, waitFor } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { getRouter } from '../../data/getRouter';

describe('Testing Card List', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: {
        potions: [],
        page: 1,
        pages: 1,
      },
      refetch: vi.fn(),
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should show an appropriate message is displayed if no cards are present', async () => {
    await waitFor(() => {
      render(getRouter('/?page=1&limit=29'));
      waitFor(() => {
        expect(screen.getByTestId('noCardsItem'));
        const cards = document.getElementsByClassName('cards_item');
        expect(cards.length).toBe(0);
      });
    });
  });
});
