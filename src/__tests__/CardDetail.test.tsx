import { render } from '@testing-library/react';
import CardDetail from '../scripts/pages/CardDetail/CardDetail';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

const fakeData = [
  {
    id: '4c997a45-d986-46a5-b16e-5e188c27dcb4',
    type: 'potion',
    attributes: {
      slug: 'ageing-potion',
      characteristics: 'Green',
      difficulty: 'Advanced',
      effect: 'Aged drinker temporarily',
      image: 'https://static.wikia.nocookie.net/harrypotter/images/5/51/Ageing_Potion_PM.png',
      inventors: null,
      ingredients: 'Newt spleens, Bananas, An orange snake, A green leaf',
      manufacturers: null,
      name: 'Ageing Potion',
      side_effects: null,
      time: null,
      wiki: 'https://harrypotter.fandom.com/wiki/Ageing_Potion',
    },
    links: {
      self: '/v1/potions/4c997a45-d986-46a5-b16e-5e188c27dcb4',
    },
  },
  {
    id: 'cebe1869-66f5-45e0-9996-20dbe96cc21a',
    type: 'potion',
    attributes: {
      slug: 'alihotsy-draught',
      characteristics: 'Blue fumes and colour',
      difficulty: null,
      effect: 'Uncontrollable laughter',
      image: 'https://static.wikia.nocookie.net/harrypotter/images/4/46/Alihotsy_Draught.png',
      inventors: null,
      ingredients: 'Alihotsy',
      manufacturers: null,
      name: 'Alihotsy Draught',
      side_effects: null,
      time: null,
      wiki: 'https://harrypotter.fandom.com/wiki/Alihotsy_Draught',
    },
    links: {
      self: '/v1/potions/cebe1869-66f5-45e0-9996-20dbe96cc21a',
    },
  },
  {
    id: 'e90a378a-c88d-470b-becc-4a8e49b0de26',
    type: 'potion',
    attributes: {
      slug: 'amortentia',
      characteristics:
        'Mother-of-pearl sheen, Spiralling steam, Scent was multi-faceted and varied based on what the person liked',
      difficulty: 'Advanced',
      effect: 'Love potion that caused a powerful infatuation or obsession in the drinker',
      image: 'https://static.wikia.nocookie.net/harrypotter/images/4/49/Amortentia.png',
      inventors: null,
      ingredients: 'Pearl Dust',
      manufacturers: null,
      name: 'Amortentia',
      side_effects: null,
      time: null,
      wiki: 'https://harrypotter.fandom.com/wiki/Amortentia',
    },
    links: {
      self: '/v1/potions/e90a378a-c88d-470b-becc-4a8e49b0de26',
    },
  },
];

describe('test CardDetail component', async () => {
  test('shoud return valid object', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const mockResolveValue = {
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            results: fakeData[0],
          })
        ),
    };

    fetchSpy.mockReturnValue(mockResolveValue as never);
    vi.mock('react-router-dom', async () => {
      const actual = (await vi.importActual('react-router-dom')) as object;
      return {
        ...actual,
        useParams: () => ({
          id: '4c997a45-d986-46a5-b16e-5e188c27dcb4',
        }),
        useRouteMatch: () => ({
          url: '/RSReact/detail/4c997a45-d986-46a5-b16e-5e188c27dcb4?page=1&limit=30',
        }),
      };
    });
    await act(async () => {
      render(
        <BrowserRouter>
          <CardDetail />
        </BrowserRouter>
      );
    });
  });
});
