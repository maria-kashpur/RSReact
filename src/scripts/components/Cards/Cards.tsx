import './cards.scss';
import CardPotion from '../CardPotion/CardPotion';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../../providers/CardsProvider';
import { Potion } from '../../api/types/potions';
import { IContext } from '../../providers/CardsProvider';

export default function Cards() {
  const { data } = useContext(CardsContext) as IContext;
  const location = useLocation();
  const variant = location.pathname === '/' ? 'full' : 'mini';

  const cards = data?.map((el: Potion) => (
    <NavLink
      to={`/detail/${el.id}`}
      className={`cards_item`}
      data-testid="cardsItem"
      key={`${el.id}`}
      state={{ id: el.id }}
    >
      <CardPotion cardData={el} />
    </NavLink>
  ));

  return data.length > 0 ? (
    <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>{cards}</div>
  ) : (
    <p className="messege" data-testid="noCardsItem">
      {' '}
      No results were found for your request
    </p>
  );
}
