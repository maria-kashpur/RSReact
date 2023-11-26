import { Potion } from '../../api/types/potions';

export function createAttributes(card?: Potion['attributes']) {
  if (!card) return {};

  return {
    characteristics: card.characteristics?.toLowerCase() || 'heaven knows',
    difficulty: card.difficulty?.toLowerCase() || 'heaven knows',
    effect: card.effect?.toLowerCase() || 'heaven knows',
    manufacturers: card.manufacturers?.toLowerCase() || 'heaven knows',
    inventors: card.inventors?.toLowerCase() || 'heaven knows',
    'side effects': card.side_effects?.toLowerCase() || 'heaven knows',
    ingredients:
      card.ingredients
        ?.toLowerCase()
        .split(',')
        .map((el, i, arr) => (
          <div key={`ingredients_${i}`}>
            {arr.length > 1 ? '*' : ''} {el}
          </div>
        )) || 'heaven knows',
  };
}
