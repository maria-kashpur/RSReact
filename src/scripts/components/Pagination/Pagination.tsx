import { useCallback, useContext } from 'react';
import './paginstion.scss';
import { IPagination } from '../../pages/App/App';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';
import { arrow, duableArrow } from './data/arrowsIco';
import React from 'react';

interface IProps {
  pagination: IPagination;
}

const Pagination = React.memo(({ pagination }: IProps) => {
  const { paginationPage, setPaginationPage } = useContext(
    PotionsParamsContext
  ) as Required<IContext>;

  const handlePaginationClick = useCallback(
    (btn: 'start' | 'next' | 'prev' | 'end') => {
      let page = paginationPage;
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
      }
      setPaginationPage(page);
    },
    [pagination, paginationPage, setPaginationPage]
  );
  return (
    <div className="pagination">
      <div
        className={`pagination__start pagination__btn ${pagination.current <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('start')}
        data-testid="startPagination"
      >
        {duableArrow}
      </div>
      <div
        className={`pagination__prev pagination__btn ${pagination.current <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('prev')}
        data-testid="prevPagination"
      >
        {arrow}
      </div>
      <div className="pagination__num pagination__btn" data-testid="pagePagination">
        {paginationPage}
      </div>
      <div
        className={`pagination__next pagination__btn ${
          pagination.pages === pagination.current ? 'disabled' : ''
        }`}
        onClick={() => handlePaginationClick('next')}
        data-testid="nextPagination"
      >
        {arrow}
      </div>
      <div
        className={`pagination__end pagination__btn ${
          pagination.pages === pagination.current ? 'disabled' : ''
        }`}
        onClick={() => handlePaginationClick('end')}
        data-testid="endPagination"
      >
        {duableArrow}
      </div>
    </div>
  );
});

export default Pagination;
