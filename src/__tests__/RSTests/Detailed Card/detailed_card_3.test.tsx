import { act, fireEvent, render, screen } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { fakePotion } from '../../data/fakePotion';
import { getRouter } from '../../data/getRouter';

describe('Testing Detailed Card component', async () => {
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

  test('clicking the close button hides the component', async () => {
    render(getRouter('/detail/af984889-3b1f-4b43-a49c-71c45d6fc012?page=4&limit=29'));
    expect(screen.getByTestId('cardDetailBox')).toBeInTheDocument();
    const closeBtn = screen.getByTestId('cardDetailClose');
    await act(async () => fireEvent.click(closeBtn));
    const cardBox = document.querySelector('cardDetailBox');
    if (cardBox) throw Error('Card box is not null');
    expect(cardBox).not.toBeInTheDocument();
  });
});
