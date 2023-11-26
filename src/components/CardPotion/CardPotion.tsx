import s from './cardPotion.module.scss';
import defoultCardIco from '../../assets/images/3808217_cauldron_halloween_pot_potion_witch_icon (1).svg';
import { Potion } from '@/types/potions';
interface IProps {
  cardData: Potion;
}
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CardPotion({ cardData }: IProps) {
  const router = useRouter();
  const variant = router.pathname === '/' ? 'full' : 'mini';

  return (
    <div className={`${s.potion_card} ${variant === 'mini' ? s.mini : ''}`}>
      <div className={s.potion_card__ico}>
        {cardData.attributes.image === null ? (
          <Image src={defoultCardIco} alt={'potion'} width={268} height={200} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cardData.attributes.image} alt="potion" />
        )}
      </div>
      <div className={s.potion_card__description}>
        <span>{cardData.attributes.name}</span>
        {cardData.attributes.difficulty ? (
          <div className={s.potion_card__difficulty} data-testid="potion_card__difficulty">
            difficulty: {cardData.attributes.difficulty}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
