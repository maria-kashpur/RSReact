// import { Link, useParams } from 'react-router-dom';
import s from './card_detail.module.scss';
import defoultCardIco from '../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';
import { closeIco } from '../../data/closeIco';
import { useGetPotionQuery } from '../../store/reducers/hpApi';
import { createAttributes } from './createAttributes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function CardDetail() {
  const { query } = useRouter();
  const id = query.id;
  const { data, isFetching } = useGetPotionQuery(`${id}`);

  return (
    <div className={`${s.box} cardDetailBox`} data-testid="cardDetailBox">
      <Link href={'/'} className={s.close_btn} data-testid="cardDetailClose">
        {closeIco}
      </Link>

      {!isFetching ? (
        <div className={s.content}>
          <div className={s.content__img}>
            {data?.image === null ? (
              <Image src={defoultCardIco} alt={'potion'} width={268} height={200} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data?.image} alt="potion" />
            )}
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
