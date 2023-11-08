import { useContext } from 'react';
import { saveParamsInLS } from '../App/data/localStorage';
import './paginstion.scss';
import { IPagination } from '../App/App';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';

const arrow = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 25a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l7.3-7.29-7.3-7.29a1 1 0 1 1 1.42-1.42l8 8a1 1 0 0 1 0 1.42l-8 8A1 1 0 0 1 12 25Z"
      data-name="Layer 2"
      fill="var(--main-text-color)"
      className="fill-231f20"
    ></path>
    <path d="M0 0h32v32H0z" fill="none"></path>
  </svg>
);

const duableArrow = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g data-name="Layer 2">
      <path
        d="M15.12 15.53 25 5.66a1 1 0 0 1 1.41 1.41l-9.06 9.06 8.8 8.8a1 1 0 0 1 0 1.41 1 1 0 0 1-1.42 0l-9.61-9.61a.85.85 0 0 1 0-1.2Z"
        fill="var(--main-text-color)"
        className="fill-231f20"
      ></path>
      <path
        d="m5.54 15.53 9.88-9.87a1 1 0 1 1 1.41 1.41l-9.06 9.06 8.8 8.8a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-9.62-9.61a.85.85 0 0 1 0-1.2Z"
        fill="var(--main-text-color)"
        className="fill-231f20"
      ></path>
    </g>
  </svg>
);

interface IProps {
  pagination: IPagination;
}

export default function Pagination({ pagination }: IProps) {
  const { params, setParams } = useContext(PotionsParamsContext) as IContext;
  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    if (!pagination) return;
    let page = params.pagination.page;
    switch (btn) {
      case 'start':
        page = 1;
        break;
      case 'prev':
        page = page - 1;
        break;
      case 'next':
        page = page + 1;
        break;
      case 'end':
        page = pagination.pages;
        break;
      default:
        break;
    }
    const newParams = { ...params };
    newParams.pagination.page = page;
    setParams(newParams);
    saveParamsInLS(JSON.stringify(newParams));
  };

  return (
    <div className="pagination">
      <div
        className={`pagination__start pagination__btn ${pagination.current <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('start')}
      >
        {duableArrow}
      </div>
      <div
        className={`pagination__prev pagination__btn ${pagination.current <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('prev')}
      >
        {arrow}
      </div>
      <div className="pagination__num pagination__btn">{params.pagination.page}</div>
      <div
        className={`pagination__next pagination__btn ${pagination.next === 0 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('next')}
      >
        {arrow}
      </div>
      <div
        className={`pagination__end pagination__btn ${pagination.next === 0 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('end')}
      >
        {duableArrow}
      </div>
    </div>
  );
}
