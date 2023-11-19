import { render, screen, waitFor } from '@testing-library/react';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { fakePotions } from '../../data/fakePotions';
import { fakePotion } from '../../data/fakePotion';
import { getRouter } from '../../data/getRouter';

describe('Testing Detailed Card component - should correctly displays the detailed card data', async () => {
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

  test('shoud show correctly name', async () => {
    render(getRouter('/detail/af984889-3b1f-4b43-a49c-71c45d6fc012?page=4&limit=29'));
    await waitFor(async () => {
      expect(screen.getByTestId('cardDetailBox')).toBeInTheDocument();
      const name = screen.getByTestId('cardDetailName');
      expect(name).toBeInTheDocument();
      expect(name.textContent).toBe(fakePotion.name);
    });
  });

  test('shoud show correctly detail', async () => {
    render(getRouter('//detail/af984889-3b1f-4b43-a49c-71c45d6fc012?page=4&limit=29'));
    waitFor(async () => {
      const detailBox = screen.getByTestId('cardDetailDetail');
      expect(detailBox).toBeInTheDocument();
      expect(
        screen.getAllByTestId('DetailValue').filter((el) => el.textContent === 'heaven knows')
          .length
      ).toBe(3);
    });
  });

  test('shoud show correctly image', async () => {
    render(getRouter('/?page=4&limit=29'));
    waitFor(async () => {
      const image = screen.getByTestId('cardDetailImg');
      expect(image).toBeInTheDocument();
      if (!(image instanceof Image)) throw Error('element is not image');
      if (fakePotion.image) {
        expect(image.src).toBe(fakePotion.image);
      } else {
        expect(image.src).toMatch('3808217_cauldron_halloween_pot_potion_witch_icon%');
      }
    });
  });
});
