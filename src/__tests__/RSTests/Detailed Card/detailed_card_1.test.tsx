import { act, render } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../../../scripts/router/router';
import { PotionsReqParams } from '../../../scripts/api/types/potions';
import HpApi from '../../../scripts/api/HpApi';
import React from 'react';

const fakeRes = {
  data: [
    {
      id: '3a1d403c-bf48-4729-9474-bdb26e2899e8',
      type: 'potion',
      attributes: {
        slug: 'tolipan-blemish-blitzer',
        characteristics: 'White in colour, Thick paste consistency',
        difficulty: null,
        effect: 'Treats acne',
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/c/c1/TolipanBlemishBlitzer.png',
        inventors: null,
        ingredients: 'Dragon claw',
        manufacturers: null,
        name: 'Tolipan Blemish Blitzer',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Tolipan_Blemish_Blitzer',
      },
      links: {
        self: '/v1/potions/3a1d403c-bf48-4729-9474-bdb26e2899e8',
      },
    },
    {
      id: '69f97266-e62f-4505-aaed-d20762bd57ee',
      type: 'potion',
      attributes: {
        slug: 'twilight-moonbeams',
        characteristics: 'Red in colour',
        difficulty: null,
        effect: 'Causes the drinker to become infatuated with the giver of the potion',
        image: null,
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
    {
      id: 'fb50ee12-9845-47ec-9a36-7e140fabb39c',
      type: 'potion',
      attributes: {
        slug: 'venomous-tentacula-juice',
        characteristics:
          "Water clear, The insides of the one who drank it felt like they were 'burning', The skin colour of who drank it became purple",
        difficulty: null,
        effect: null,
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/c/c2/Venomous_Tentacular_Juice.jpg',
        inventors: null,
        ingredients: null,
        manufacturers: null,
        name: 'Venomous Tentacula juice',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Venomous_Tentacula_juice',
      },
      links: {
        self: '/v1/potions/fb50ee12-9845-47ec-9a36-7e140fabb39c',
      },
    },
    {
      id: '2e4c5d93-d943-40af-82b5-277570accf77',
      type: 'potion',
      attributes: {
        slug: 'veritaserum',
        characteristics: 'Clear and odourless like water',
        difficulty: 'Advanced',
        effect: 'Forced drinker to speak the truth',
        image: 'https://static.wikia.nocookie.net/harrypotter/images/a/a0/Truth_sperum.gif',
        inventors: null,
        ingredients: null,
        manufacturers: null,
        name: 'Veritaserum',
        side_effects: null,
        time: 'One lunar phase (about 28 days)',
        wiki: 'https://harrypotter.fandom.com/wiki/Veritaserum',
      },
      links: {
        self: '/v1/potions/2e4c5d93-d943-40af-82b5-277570accf77',
      },
    },
    {
      id: '4c594b82-317b-4188-9500-faebd1347b0a',
      type: 'potion',
      attributes: {
        slug: 'vitamix-potion',
        characteristics: 'Blue in colour',
        difficulty: 'Beginner',
        effect: 'Burst of energy',
        image: 'https://static.wikia.nocookie.net/harrypotter/images/2/2a/Vitamix_Potion.PNG',
        inventors: null,
        ingredients: 'Infusion of Wormwood, Powdered Root of Asphodel, Monkshood',
        manufacturers: null,
        name: 'Vitamix Potion',
        side_effects: 'Unfortunate but unknown',
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Vitamix_Potion',
      },
      links: {
        self: '/v1/potions/4c594b82-317b-4188-9500-faebd1347b0a',
      },
    },
    {
      id: '15a6da33-c144-41e4-afe4-94d3aedaa100',
      type: 'potion',
      attributes: {
        slug: 'weakness-potion',
        characteristics: 'Yellowish in colour',
        difficulty: null,
        effect: 'Fumes cause weakness',
        image: 'https://static.wikia.nocookie.net/harrypotter/images/1/16/WeaknessPotion.jpg',
        inventors: null,
        ingredients: null,
        manufacturers: null,
        name: 'Weakness Potion',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Weakness_Potion',
      },
      links: {
        self: '/v1/potions/15a6da33-c144-41e4-afe4-94d3aedaa100',
      },
    },
    {
      id: '3e35e1ef-f89c-45a2-9ac3-acc536fc0d17',
      type: 'potion',
      attributes: {
        slug: 'wit-sharpening-potion',
        characteristics: 'Green, white or purple in colour',
        difficulty: 'Moderate to Ordinary Wizarding Level',
        effect: 'Improved intellect',
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/2/21/Wit-Sharpening_Potion_HM_Icon.png',
        inventors: null,
        ingredients: 'Ground scarab beetles, Cut ginger roots, Armadillo bile, Newt spleens',
        manufacturers: null,
        name: 'Wit-Sharpening Potion',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Wit-Sharpening_Potion',
      },
      links: {
        self: '/v1/potions/3e35e1ef-f89c-45a2-9ac3-acc536fc0d17',
      },
    },
    {
      id: 'a77d381e-36b5-42b0-a898-3c2ca9f623c5',
      type: 'potion',
      attributes: {
        slug: 'wolfsbane-potion',
        characteristics: 'Blue smoke, Unpleasant taste, Rendered useless with sugar',
        difficulty: 'Advanced',
        effect: 'Allowed werewolves to keep their minds post-transformation',
        image: 'https://static.wikia.nocookie.net/harrypotter/images/0/01/PA_C8.jpg',
        inventors: 'Damocles Belby',
        ingredients: 'Wolfsbane',
        manufacturers: null,
        name: 'Wolfsbane Potion',
        side_effects: 'Harmful side effects to health if potion tampered with',
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Wolfsbane_Potion',
      },
      links: {
        self: '/v1/potions/a77d381e-36b5-42b0-a898-3c2ca9f623c5',
      },
    },
    {
      id: 'af751624-ca96-4cb3-b272-ad284f28664b',
      type: 'potion',
      attributes: {
        slug: 'wound-cleaning-potion',
        characteristics: 'Purple liquid, Smoked on contact, Stung on contact',
        difficulty: 'Advanced',
        effect: 'Antiseptic, cleaned wounds',
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/a/a0/WoundCleaningPotionHM.png',
        inventors: null,
        ingredients: null,
        manufacturers: null,
        name: 'Wound-Cleaning Potion',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Wound-Cleaning_Potion',
      },
      links: {
        self: '/v1/potions/af751624-ca96-4cb3-b272-ad284f28664b',
      },
    },
  ],
  meta: {
    pagination: {
      current: 4,
      first: 1,
      prev: 3,
      records: 96,
    },
    copyright: 'Copyright © Potter DB 2023',
    generated_at: '2023-11-12T10:47:24.534+00:00',
  },
  links: {
    self: 'https://api.potterdb.com/v1/potions?sort=name&page[size]=29&page[number]=4&filter[name_cont_any]=a',
    current:
      'https://api.potterdb.com/v1/potions?filter[name_cont_any]=a&page[number]=4&page[size]=29&sort=name',
    first:
      'https://api.potterdb.com/v1/potions?filter[name_cont_any]=a&page[number]=1&page[size]=29&sort=name',
    prev: 'https://api.potterdb.com/v1/potions?filter[name_cont_any]=a&page[number]=3&page[size]=29&sort=name',
  },
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

describe('Testing Detailed Card component', async () => {
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

  test('should renders loading indicator is displayed while fetching data', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/detail/78f43f9e-fb3a-4d27-99cb-b4d7674ef208?page=1&limit=29'],
      initialIndex: 1,
    });
    await act(async () => render(<RouterProvider router={router} />));
    // const card = screen.getAllByTestId('cardsItem')[0];
    // screen.debug();
    // fireEvent.click(card);
    // expect(screen.getByTestId('cardDetailLoading')).toBeInTheDocument();
  });
});
