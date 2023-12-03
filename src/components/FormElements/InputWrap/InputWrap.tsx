import { ChangeEvent, forwardRef } from 'react';

interface IProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  id: string;
  value?: string | number;
  placeholder: string;
  error: string;
  name: string;
  children?: React.ReactNode;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputWrap = forwardRef<HTMLInputElement, IProps>(
  ({ label, id, error, children, type, name, defaultValue, onChange, ...props }: IProps, ref) => {
    return (
      <div className="item">
        <label htmlFor={id} className="item__name">
          {label}
        </label>
        <div className="item__value">
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            defaultValue={defaultValue || ''}
            onChange={onChange}
            {...props}
          />
          {children}
          <div className="error_messege">{error}</div>
        </div>
      </div>
    );
  }
);

export default InputWrap;
