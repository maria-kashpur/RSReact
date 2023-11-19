import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getRouter } from '../../data/getRouter';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { fakePotion } from '../../data/fakePotion';

describe('Testing Card', async () => {
  beforeAll(async () => {
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
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(async () => {
      const card = screen.getAllByTestId('cardsItem')[0];
      await act(async () => fireEvent.click(card));
      const detailBox = screen.getByTestId('cardDetailBox');
      expect(detailBox).toBeInTheDocument();
    });
  });
});
