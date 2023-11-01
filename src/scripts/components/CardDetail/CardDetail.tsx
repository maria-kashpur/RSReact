import { potions } from '../data/potions';
import s from './card_detail.module.scss';

const card = potions.data[40];

const attributes = {
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

export default function CardDetail() {
  return (
    <div className={s.box}>
      <button className={s.close_btn}>
        <svg
          className="bi bi-x-lg"
          fill="currentColor"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            fillRule="evenodd"
          />
          <path
            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div className={s.content}>
        <div className={s.content__img}>
          <img
            src={`${
              card.attributes.image || '3808217_cauldron_halloween_pot_potion_witch_icon (1).svg'
            }`}
            alt="image"
          />
        </div>
        <div className={s.content__text}>
          <h2 className={s.content_text__title}>{card.attributes.name}</h2>
          <div className={s.detail}>
            {Object.entries(attributes).map(([title, content]) => (
              <div key={title} className={`${s.item}`}>
                <div className={s.item__title}>{title}:</div>
                <div className={s.item__content}>{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
