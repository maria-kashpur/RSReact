import { PotionsResponse } from '../../api/types/potions';
import './cards.scss';
import CardPotion from './CardPotion/CardPotion';

interface IProps {
  data: PotionsResponse['data'];
  variant: 'full' | 'mini';
}

export default function Cards({ data, variant }: IProps) {
  return (
    <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>
      {data.map((el, index) => (
        <div className="cards_item" key={`card_${index}`}>
          <CardPotion cardData={el} variant={variant} />
        </div>
      ))}
    </div>
  );
}
