import { PotionsResponse } from '../../api/types/potions';
import './cards.scss';
import CardPotion from './CardPotion/CardPotion';
import { NavLink } from 'react-router-dom';

interface IProps {
  data: PotionsResponse['data'];
  variant: 'full' | 'mini';
}

export default function Cards({ data, variant }: IProps) {
  return (
    <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>
      {data.map((el) => (
        <NavLink
          to={`/detail/${el.id}`}
          className={`cards_item`}
          key={`${el.id}`}
          state={{ id: el.id }}
        >
          <CardPotion cardData={el} variant={variant} />
        </NavLink>
      ))}
    </div>
  );
}
