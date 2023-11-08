import { useContext, useState } from 'react';
import s from './input_number.module.scss';
import { saveParamsInLS } from '../App/data/localStorage';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';

interface IProps {
  minValue?: number;
  maxValue?: number;
  title?: string;
}

export default function InputNumber({ minValue, maxValue, title }: IProps) {
  const { params, setParams } = useContext(PotionsParamsContext) as IContext;
  const [currentValue, setCurrentValue] = useState(params.pagination.limit);

  const handleChangePagitionLimit = (value: number) => {
    const newParams = { ...params };
    newParams.pagination.limit = value;
    newParams.pagination.page = 1;
    setParams(() => newParams);
    saveParamsInLS(JSON.stringify(newParams));
  };

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
    handleChangePagitionLimit(newValue);
  };

  return (
    <div className={s.wrap}>
      {title ? <h2 className={s.title}>{title}</h2> : ''}
      <div className={s.number}>
        <button
          className={`${s['number-minus']} ${currentValue === minValue ? `${s.disabled}` : ''}`}
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
          className={`${s['number-plus']} ${currentValue === maxValue ? 'disabled' : ''}`}
          type="button"
          onClick={() => hundleClick('+')}
        >
          +
        </button>
      </div>
    </div>
  );
}
