import { Potion } from '../../api/types/potions';
import s from './cardPotion.module.scss';
interface IProps {
  cardData: Potion;
}
import defoultCardIco from '../../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';
import { useLocation } from 'react-router';

export default function CardPotion({ cardData }: IProps) {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'full' : 'mini';

  return (
    <div className={`${s.potion_card} ${variant === 'mini' ? s.mini : ''}`}>
      <div className={s.potion_card__ico}>
        <img src={cardData.attributes.image || defoultCardIco} alt="potion" />
      </div>
      <div className={s.potion_card__description}>
        <h3>{cardData.attributes.name}</h3>
        {cardData.attributes.difficulty ? (
          <div className={s.potion_card__difficulty} data-testid="potion_card__difficulty">
            difficulty: {cardData.attributes.difficulty}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
