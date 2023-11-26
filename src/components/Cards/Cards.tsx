import s from './cards.module.scss';
import CardPotion from '../CardPotion/CardPotion';
import { Potion } from '@/types/potions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getQuery, getQueryForLink } from '@/utils/getQuery';
import { useGetPotionsQuery } from '@/store/reducers/hpApi';

export default function Cards() {
  const router = useRouter();
  const query = getQuery(router.query);
  const { data } = useGetPotionsQuery(query);
  const potions = data?.potions;
  const variant = router.pathname === '/' ? 'full' : 'mini';

  const NoCardsMessege = (
    <div className={s.messege} data-testid="noCardsItem">
      No potions
    </div>
  );

  const template =
    potions && potions.length > 0 ? (
      <div className={`${s.cards} ${variant === 'mini' ? s.mini : ''}`}>
        {potions.map((el: Potion) => (
          <Link
            href={{
              pathname: `/detail/${el.id}`,
              query: {
                ...getQueryForLink(router.query),
              },
            }}
            key={`${el.id}`}
            className={s.cards_item}
          >
            <CardPotion cardData={el} />
          </Link>
        ))}
      </div>
    ) : (
      NoCardsMessege
    );

  return template;
}
