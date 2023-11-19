import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { fakePotions } from '../../data/fakePotions';
import { fakePotion } from '../../data/fakePotion';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { getRouter } from '../../data/getRouter';

describe('Testing Detailed Card component', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: fakePotions,
      isLoading: true,
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

  test('should renders loading indicator is displayed while fetching data', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(async () => {
      const card = screen.getAllByTestId('cardsItem')[0];
      fireEvent.click(card);
      expect(screen.getByTestId('cardDetailLoading')).toBeInTheDocument();
    });
  });
});
