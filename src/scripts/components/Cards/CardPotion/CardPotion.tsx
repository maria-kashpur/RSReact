import { Potion } from '../../../api/types/potions';
import './cardPotion.scss';
interface IProps {
  cardData: Potion;
  variant: 'full' | 'mini';
}

export default function CardPotion({ cardData, variant }: IProps) {
  return (
    <div className={`potion_card ${variant === 'mini' ? 'mini' : ''}`}>
      <div className="potion_card__ico">
        <img
          src={
            cardData.attributes.image || '3808217_cauldron_halloween_pot_potion_witch_icon (1).svg'
          }
          alt="potion"
        />
      </div>
      <div className="potion_card__description">
        <h3>{cardData.attributes.name}</h3>
        {cardData.attributes.difficulty ? (
          <div className="potion_card__difficulty">
            difficulty: {cardData.attributes.difficulty}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
