import { PotionsResponse } from '../../api/types/potions';
import './cards.scss';
import CardPotion from './CardPotion/CardPotion';

interface IProps {
  data: PotionsResponse['data'];
}

export default function Cards({ data }: IProps) {
  return (
    <div className="cards">
      {data.map((el, index) => (
        <div className="cards_item" key={`card_${index}`}>
          <CardPotion cardData={el} />
        </div>
      ))}
    </div>
  );
}
