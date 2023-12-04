import s from './passwordStrength.module.scss';

interface IProps {
  strength: number;
  visible?: boolean;
}

export default function PasswordStrength({ strength, visible }: IProps) {
  return (
    <div className={`${s.wrapper} ${visible ? s.visible : ''}`}>
      <div className={s.range} style={{ width: `${100 - strength}%` }}></div>
    </div>
  );
}
