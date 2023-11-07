import { PotionsResponse } from '../../api/types/potions';
import './cards.scss';
import CardPotion from './CardPotion/CardPotion';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../../contexts/CardsContext';

interface IProps {
  data: PotionsResponse['data'];
  variant: 'full' | 'mini';
}

export default function Cards({ variant }: IProps) {
  const data = useContext(CardsContext);

  return (
    <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>
      {data?.map((el) => (
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
