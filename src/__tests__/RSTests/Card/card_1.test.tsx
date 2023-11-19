import { render, screen, waitFor } from '@testing-library/react';
import { getRouter } from '../../data/getRouter';
import { potionApi } from '../../../scripts/store/reducers/hpApi';
import { defaultImage, fakePotions } from '../../data/fakePotions';

describe('Testing Card - should renders the relevant card data', async () => {
  beforeAll(async () => {
    vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
      data: fakePotions,
      refetch: vi.fn(),
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should renders valid ico', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const card = screen.getAllByTestId('cardsItem')[0];
      const ico = card.querySelector('.potion_card__ico img');
      expect(ico).not.toBe(null);
      expect(ico).instanceOf(Image);
      if (!(ico instanceof Image)) throw Error('Ico is not Image');
      if (fakePotions.potions[0].attributes.image === null) {
        expect(ico.src).toContain(defaultImage);
      } else {
        expect(ico.src).toBe(fakePotions.potions[0].attributes.image);
      }
    });
  });

  test('should renders valid ico', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const card = screen.getAllByTestId('cardsItem')[1];
      const ico = card.querySelector('.potion_card__ico img');
      expect(ico).not.toBe(null);
      expect(ico).instanceOf(Image);
      if (!(ico instanceof Image)) throw Error('Ico is not Image');
      if (fakePotions.potions[1].attributes.image === null) {
        expect(ico.src).toContain(defaultImage);
      } else {
        expect(ico.src).toBe(fakePotions.potions[1].attributes.image);
      }
    });
  });

  test('should renders name', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const card = screen.getAllByTestId('cardsItem')[1];
      const name = card.querySelector('h3');
      expect(name?.textContent).toBe(fakePotions.potions[1].attributes.name);
    });
  });

  test('should renders difficulty if value is not null', async () => {
    render(getRouter('/?page=4&limit=29'));
    await waitFor(() => {
      const difficulties = screen.getAllByTestId('potion_card__difficulty');
      expect(difficulties.length).toBe(8);
    });
  });
});
