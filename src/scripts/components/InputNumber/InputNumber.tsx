import s from './input_number.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setLimit } from '../../store/reducers/potionSlice';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  minValue?: number;
  maxValue?: number;
  title?: string;
}

export default function InputNumber({ minValue, maxValue, title }: IProps) {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.potionReducer);

  const hundleClick = (act: '+' | '-' | number) => {
    let newValue = limit;
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

    setSearchParams({ page: `1`, limit: `${newValue}` });
    dispatch(setLimit(newValue));
  };

  return (
    <div className={s.wrap} data-testid="pagintionWrap">
      {title ? <h2 className={s.title}>{title}</h2> : ''}
      <div className={s.number}>
        <button
          className={`${s['number-minus']} ${limit === minValue ? `${s.disabled}` : ''}`}
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
          name="limitInput"
          max={maxValue}
          readOnly={true}
          value={limit}
          onChange={(e) => {
            hundleClick(+e.target.value);
          }}
        />
        <button
          className={`${s['number-plus']} ${limit === maxValue ? 'disabled' : ''}`}
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
