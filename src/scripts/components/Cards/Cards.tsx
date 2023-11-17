import './cards.scss';
import CardPotion from '../CardPotion/CardPotion';
import { NavLink, useLocation } from 'react-router-dom';
import { Potion } from '../../api/types/potions';
import { useAppSelector } from '../../store/store';

export default function Cards() {
  const { potions } = useAppSelector((state) => state.potionReducer);

  const location = useLocation();
  const variant = location.pathname === '/' ? 'full' : 'mini';

  const NoCardsMessege = (
    <p className="messege" data-testid="noCardsItem">
      No potions
    </p>
  );

  const template =
    potions.length > 0 ? (
      <div className={`cards ${variant === 'mini' ? 'mini' : ''}`}>
        {potions.map((el: Potion) => (
          <NavLink
            to={`/detail/${el.id}`}
            className={`cards_item`}
            data-testid="cardsItem"
            key={`${el.id}`}
            state={{ id: el.id }}
          >
            <CardPotion cardData={el} />
          </NavLink>
        ))}
      </div>
    ) : (
      NoCardsMessege
    );

  return template;
}
