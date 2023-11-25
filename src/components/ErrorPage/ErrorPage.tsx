import s from './error_page.module.scss';
import Image from 'next/image';
import img from '../../assets/images/harry-potter-4077473_1280.png';

export default function ErrorPage() {
  return (
    <div className={s.not_found}>
      <div className={s.not_found__box}>
        <div className={s.not_found__item}></div>
        <div className={s.not_found__item}>
          <Image src={img} alt="error icon" height={519} width={510} priority={true}></Image>
        </div>
      </div>
      <div className={s.not_found__messege}>The error was raised and handled</div>
    </div>
  );
}
