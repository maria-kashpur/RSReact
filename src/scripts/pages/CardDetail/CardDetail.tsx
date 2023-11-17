import { Link, useParams } from 'react-router-dom';
import s from './card_detail.module.scss';
import defoultIco from '../../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';
import { closeIco } from '../../data/closeIco';
import { useGetPotionQuery } from '../../store/reducers/hpApi';
import { createAttributes } from './createAttributes';

export default function CardDetail() {
  const { id } = useParams();
  const { data, isFetching } = useGetPotionQuery(`${id}`);

  return (
    <div className={`${s.box} cardDetailBox`} data-testid="cardDetailBox">
      <Link to={'/'} className={s.close_btn} data-testid="cardDetailClose">
        {closeIco}
      </Link>

      {!isFetching ? (
        <div className={s.content}>
          <div className={s.content__img}>
            <img data-testid="cardDetailImg" src={`${data?.image || defoultIco}`} alt="image" />
          </div>
          <div className={s.content__text}>
            <h2 className={s.content_text__title} data-testid="cardDetailName">
              {data?.name}
            </h2>
            <div className={s.detail} data-testid="cardDetailDetail">
              {Object.entries(createAttributes(data?.attributes)).map(([title, content]) => (
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
        <h3 data-testid="cardDetailLoading" style={{ textAlign: 'center' }}>
          loading...
        </h3>
      )}
    </div>
  );
}
