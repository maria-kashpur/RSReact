import { ChangeEvent, forwardRef, useState } from 'react';
import ico from '../../../assets/eye.svg';
import './password.scss';

interface IProps {
  label: string;
  id: string;
  value?: string | number;
  placeholder: string;
  error: string;
  name: string;
  children?: React.ReactNode;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Password = forwardRef<HTMLInputElement, IProps>(
  ({ label, id, error, children, name, defaultValue, onChange, ...props }: IProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="item">
        <label htmlFor={id} className="item__name">
          {label}
        </label>
        <div className="item__value">
          <div className="password_wrap">
            <input
              ref={ref}
              type={showPassword ? 'text' : 'password'}
              id={id}
              name={name}
              defaultValue={defaultValue || ''}
              onChange={onChange}
              {...props}
            />
            <div
              className={`eye_ico ${showPassword ? '' : 'unactive'}`}
              onClick={() => {
                setShowPassword(() => !showPassword);
              }}
            >
              <img src={ico} alt="eye ico" />
            </div>
          </div>

          {children}
          <div className="error_messege">{error}</div>
        </div>
      </div>
    );
  }
);

export default Password;
