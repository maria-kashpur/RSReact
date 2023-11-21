import s from './preloader.module.scss';

export default function Preloader() {
  return (
    <div className={s.preloader}>
      <span className={s.preloader__ico}></span>
    </div>
  );
}
