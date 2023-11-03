import { Link, useParams } from 'react-router-dom';
import s from './card_detail.module.scss';
import { useEffect, useState } from 'react';
import HpApi from '../../api/HpApi';
import { PotionResponse } from '../../api/types/potions';
import defoultIco from '../../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';

function createAttributes(card: PotionResponse['data'] | null) {
  if (!card) return {};

  return {
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
}

const closeIco = (
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
);

export default function CardDetail() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [card, setCard] = useState<PotionResponse['data'] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await HpApi.getPotion(`${id}`);
      //const res = potions;
      if (!res) return;
      setCard(() => res.data);
      setIsLoaded(() => true);
    };
    getData();
    return () => {
      setCard(null);
    };
  }, [id]);

  return (
    <div className={`${s.box}`}>
      <Link to={'/'} className={s.close_btn}>
        {closeIco}
      </Link>
      {isLoaded ? (
        <div className={s.content}>
          <div className={s.content__img}>
            <img src={`${card?.attributes.image || defoultIco}`} alt="image" />
          </div>
          <div className={s.content__text}>
            <h2 className={s.content_text__title}>{card?.attributes.name}</h2>
            <div className={s.detail}>
              {Object.entries(createAttributes(card)).map(([title, content]) => (
                <div key={title} className={`${s.item}`}>
                  <div className={s.item__title}>{title}:</div>
                  <div className={s.item__content}>{content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
