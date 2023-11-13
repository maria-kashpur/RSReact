import { PotionResponse } from '../../api/types/potions';

export function createAttributes(card: PotionResponse['data'] | null) {
  if (!card) return {};

  return {
    characteristics: card.attributes.characteristics?.toLowerCase() || 'heaven knows',
    difficulty: card.attributes.difficulty?.toLowerCase() || 'heaven knows',
    effect: card.attributes.effect?.toLowerCase() || 'heaven knows',
    manufacturers: card.attributes.manufacturers?.toLowerCase() || 'heaven knows',
    inventors: card.attributes.inventors?.toLowerCase() || 'heaven knows',
    'side effects': card.attributes.side_effects?.toLowerCase() || 'heaven knows',
    ingredients:
      card.attributes.ingredients
        ?.toLowerCase()
        .split(',')
        .map((el, i, arr) => (
          <div key={`ingredients_${i}`}>
            {arr.length > 1 ? '*' : ''} {el}
          </div>
        )) || 'heaven knows',
  };
}
