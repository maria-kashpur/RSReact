import { act, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../../../scripts/router/router';
import { PotionsReqParams } from '../../../scripts/api/types/potions';
import HpApi from '../../../scripts/api/HpApi';

const fakeRes = {
  meta: {
    pagination: {
      current: 1,
      records: 0,
    },
    copyright: 'Copyright © Potter DB 2023',
    generated_at: '2023-11-12T18:51:00.648+00:00',
  },
  links: {
    self: 'https://api.potterdb.com/v1/potions?sort=name&page[size]=29&page[number]=1&filter[name_cont_any]=asss',
    current:
      'https://api.potterdb.com/v1/potions?filter[name_cont_any]=asss&page[number]=1&page[size]=29&sort=name',
  },
  data: [],
};

const mockCardResp = {
  data: {
    id: '69f97266-e62f-4505-aaed-d20762bd57ee',
    type: 'potion',
    attributes: {
      slug: 'twilight-moonbeams',
      characteristics: 'Red in colour',
      difficulty: null,
      effect: 'Causes the drinker to become infatuated with the giver of the potion',
      image: 'https://static.wikia.nocookie.net/harrypotter/images/b/b7/TwilightMoonbeams.jpg',
      inventors: 'Fred and George Weasley',
      ingredients: 'Pearl Dust',
      manufacturers: null,
      name: 'Twilight Moonbeams',
      side_effects: null,
      time: null,
      wiki: 'https://harrypotter.fandom.com/wiki/Twilight_Moonbeams',
    },
    links: {
      self: '/v1/potions/69f97266-e62f-4505-aaed-d20762bd57ee',
    },
  },
  meta: {
    copyright: 'Copyright © Potter DB 2023',
    generated_at: '2023-11-12T16:48:44.039+00:00',
  },
  links: {
    self: 'https://api.potterdb.com/v1/potions/69f97266-e62f-4505-aaed-d20762bd57ee',
  },
};

describe('Testing Card List', async () => {
  beforeAll(async () => {
    vi.mock('../../../scripts/pages/App/loader', () => {
      return {
        loader: vi.fn(async (params: PotionsReqParams) => {
          const items = fakeRes.data;
          const pagination = {
            current: params.pagination.page,
            pages: 1,
          };
          return { items, pagination };
        }),
      };
    });

    vi.spyOn(HpApi, 'getPotion').mockReturnValue(new Promise((resolve) => resolve(mockCardResp)));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should show an appropriate message is displayed if no cards are present', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });
    await act(async () => render(<RouterProvider router={router} />));
    expect(screen.getByTestId('noCardsItem'));
    const cards = document.getElementsByClassName('cards_item');
    expect(cards.length).toBe(0);
  });
});
