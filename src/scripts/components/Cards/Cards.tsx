import './cards.scss';
import CardPotion from './CardPotion/CardPotion';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../../providers/CardsProvider';
import { Potion } from '../../api/types/potions';

export default function Cards() {
  const { data, variant } = useContext(CardsContext);

  const cards = data?.map((el: Potion) => (
    <NavLink
      to={`/detail/${el.id}`}
      className={`cards_item`}
      key={`${el.id}`}
      state={{ id: el.id }}
    >
      <CardPotion cardData={el} />
    </NavLink>
  ));

  return data.length > 0 ? (
    <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>{cards}</div>
  ) : (
    <p className="messege"> No results were found for your request</p>
  );
}
