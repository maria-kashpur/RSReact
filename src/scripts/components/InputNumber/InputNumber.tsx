import { useState } from 'react';
import s from './input_number.module.scss';

interface IProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  action?: (value: number) => void;
  title?: string;
}

export default function InputNumber({ value, minValue, maxValue, title, action }: IProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const hundleClick = (act: '+' | '-' | number) => {
    let newValue = currentValue;
    switch (act) {
      case '+':
        newValue = newValue + 1;
        break;
      case '-':
        newValue = newValue - 1;
        break;
      default:
        break;
    }
    if (typeof act === 'number') {
      newValue = act;
    }
    setCurrentValue(() => newValue);
    if (action) action(newValue);
  };

  return (
    <div className={s.wrap}>
      {title ? <h2 className={s.title}>{title}</h2> : ''}
      <div className={s.number}>
        <button
          className={`${s['number-minus']} ${value === minValue ? `${s.disabled}` : ''}`}
          type="button"
          onClick={() => hundleClick('-')}
        >
          -
        </button>
        <input
          type="number"
          min={minValue}
          max={maxValue}
          readOnly={true}
          value={currentValue}
          onChange={(e) => {
            hundleClick(+e.target.value);
          }}
        />
        <button
          className={`${s['number-plus']} ${value === maxValue ? 'disabled' : ''}`}
          type="button"
          onClick={() => hundleClick('+')}
        >
          +
        </button>
      </div>
    </div>
  );
}
