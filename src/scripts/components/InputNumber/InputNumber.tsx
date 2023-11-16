import { useCallback, useContext, useState } from 'react';
import s from './input_number.module.scss';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';
import { useAppSelector } from '../../store/store';

interface IProps {
  minValue?: number;
  maxValue?: number;
  title?: string;
}

export default function InputNumber({ minValue, maxValue, title }: IProps) {
  const { setPaginationPage, paginationLimit, setPaginationLimit } = useContext(
    PotionsParamsContext
  ) as Required<IContext>;
  const [currentValue, setCurrentValue] = useState(paginationLimit);

  const { limit } = useAppSelector((state) => state.potionReducer);
  console.log(limit);

  const handleChangePagitionLimit = useCallback(
    (value: number) => {
      setPaginationPage(1);
      setPaginationLimit(value);
    },
    [setPaginationLimit, setPaginationPage]
  );

  const hundleClick = useCallback(
    (act: '+' | '-' | number) => {
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
    },
    [currentValue, handleChangePagitionLimit]
  );

  return (
    <div className={s.wrap} data-testid="pagintionWrap">
      {title ? <h2 className={s.title}>{title}</h2> : ''}
      <div className={s.number}>
        <button
          className={`${s['number-minus']} ${currentValue === minValue ? `${s.disabled}` : ''}`}
          type="button"
          onClick={() => hundleClick('-')}
          data-testid="decreaseInputLimit"
        >
          -
        </button>
        <input
          data-testid="inputLimit"
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
          data-testid="increaseInputLimit"
          type="button"
          onClick={() => hundleClick('+')}
        >
          +
        </button>
      </div>
    </div>
  );
}
