import { render, screen } from '@testing-library/react';

import Cards from './Cards';
import { CardsContextProvider } from '../../providers/CardsProvider';
import { RouterProvider, createMemoryRouter } from 'react-router';
import ErrorPage from '../../api/pages/ErrorPage/ErrorPage';
import { PotionsResponse } from '../../api/types/potions';

function getRouter(fakeData: PotionsResponse['data'], path: string) {
  const routes = [
    {
      path: path,
      element: (
        <CardsContextProvider data={fakeData}>
          <Cards />
        </CardsContextProvider>
      ),
      errorElement: <ErrorPage />,
    },
  ];
  return createMemoryRouter(routes, {
    initialEntries: [path],
    initialIndex: 1,
  });
}

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the specified number of cards - should show cards two cards_item', () => {
    const FAKE_DATA = [
      {
        id: '389a118b-736c-4ac0-a15f-d88fd1d01089',
        type: 'potion',
        attributes: {
          slug: 'antidote-to-common-poisons',
          characteristics: 'Teal-coloured',
          difficulty: 'Beginner to Moderate',
          effect: 'Counteracted the effects of common poisons',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/9/96/Antidote-to-common-poisons.png',
          inventors: null,
          ingredients:
            '1 Bezoar, 2 measures of Standard Ingredient, 1 pinch of powdered unicorn horn, 2 mistletoe berries',
          manufacturers: null,
          name: 'Antidote to Common Poisons',
          side_effects: null,
          time: null,
          wiki: 'https://harrypotter.fandom.com/wiki/Antidote_to_Common_Poisons',
        },
        links: {
          self: '/v1/potions/389a118b-736c-4ac0-a15f-d88fd1d01089',
        },
      },
      {
        id: 'ecb5754d-9f50-424f-b256-57aca7c52630',
        type: 'potion',
        attributes: {
          slug: 'antidote-to-uncommon-poisons',
          characteristics: 'Green in colour',
          difficulty: 'Moderate',
          effect: 'Cures the effects of minor poisons',
          image:
            'https://static.wikia.nocookie.net/harrypotter/images/b/bd/Antidote_to_Uncommon_Poisons.png',
          inventors: null,
          ingredients: 'Fire Seeds, Powdered graphorn horn, Billywig stings, Chizpurfle carapaces',
          manufacturers: null,
          name: 'Antidote to Uncommon Poisons',
          side_effects: null,
          time: null,
          wiki: 'https://harrypotter.fandom.com/wiki/Antidote_to_Uncommon_Poisons',
        },
        links: {
          self: '/v1/potions/ecb5754d-9f50-424f-b256-57aca7c52630',
        },
      },
    ];
    render(<RouterProvider router={getRouter(FAKE_DATA, '/')} />);
    expect(document.querySelectorAll('.cards_item').length).toBe(2);
  });
  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(<RouterProvider router={getRouter([], '/')} />);
    expect(document.querySelectorAll('.cards_item').length).toBe(0);
    screen.debug();
    expect(document.querySelector('.messege')).not.toBe(null);
  });
});
