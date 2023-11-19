import { render, screen } from '@testing-library/react';
import CardPotion from '../scripts/components/CardPotion/CardPotion';
import { BrowserRouter } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe('Tests for the CardPotion component', () => {
  test('shoud show cards', () => {
    const fakeData = {
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
    };
    renderWithRouter(<CardPotion cardData={fakeData} />, {
      route: '/',
    });
    const img = document.querySelector('img');
    expect(img).instanceOf(Image);
    expect(img?.src).toBe(fakeData.attributes.image);
    expect(screen.getByText(/Beginner to Moderate/i)).toBeInTheDocument();
  });

  test('shoud show cards', () => {
    const fakeData = {
      id: 'c7d04b00-e0a5-4c78-8a11-59e2ab5827ce',
      type: 'potion',
      attributes: {
        slug: 'anti-paralysis-potion',
        characteristics: 'Pink in colour',
        difficulty: null,
        effect: 'Cured paralysis',
        image: null,
        inventors: null,
        ingredients: null,
        manufacturers: null,
        name: 'Anti-Paralysis Potion',
        side_effects: null,
        time: null,
        wiki: 'https://harrypotter.fandom.com/wiki/Anti-Paralysis_Potion',
      },
      links: {
        self: '/v1/potions/c7d04b00-e0a5-4c78-8a11-59e2ab5827ce',
      },
    };

    const { container } = renderWithRouter(<CardPotion cardData={fakeData} />, {
      route: '/',
    });
    const difficulty = container.querySelector('.potion_card__difficulty');
    expect(difficulty).toBe(null);
    const img = container.querySelector('img');
    expect(img).not.toBe(null);
    expect(img?.src).toContain('3808217_cauldron_halloween_pot_potion_witch_icon');
  });
});
