import { Link, useParams } from 'react-router-dom';
import s from './card_detail.module.scss';
import { useEffect, useState } from 'react';
import HpApi from '../../api/HpApi';
import { PotionResponse } from '../../api/types/potions';
import defoultIco from '../../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';
import { createAttributes } from './createAttributes';
import { closeIco } from '../../data/closeIco';

export default function CardDetail() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [card, setCard] = useState<PotionResponse['data'] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await HpApi.getPotion(`${id}`);
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
    <div className={`${s.box} cardDetailBox`} data-testid="cardDetailBox">
      <Link to={'/'} className={s.close_btn} data-testid="cardDetailClose">
        {closeIco}
      </Link>

      {isLoaded ? (
        <div className={s.content}>
          <div className={s.content__img}>
            <img
              data-testid="cardDetailImg"
              src={`${card?.attributes.image || defoultIco}`}
              alt="image"
            />
          </div>
          <div className={s.content__text}>
            <h2 className={s.content_text__title} data-testid="cardDetailName">
              {card?.attributes.name}
            </h2>
            <div className={s.detail} data-testid="cardDetailDetail">
              {Object.entries(createAttributes(card)).map(([title, content]) => (
                <div key={title} className={`${s.item}`}>
                  <div className={s.item__title} data-testid="DetailTitle">
                    {title}:
                  </div>
                  <div className={s.item__content} data-testid="DetailValue">
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h3 data-testid="cardDetailLoading">loading...</h3>
      )}
    </div>
  );
}
