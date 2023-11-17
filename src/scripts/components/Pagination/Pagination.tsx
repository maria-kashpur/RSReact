import './paginstion.scss';
import { arrow, duableArrow } from './data/arrowsIco';
import { setPage } from '../../store/reducers/potionSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { pages, page, limit } = useAppSelector((state) => state.potionReducer);
  const [, setSearchParams] = useSearchParams();

  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    let currentPage = page;
    switch (btn) {
      case 'start':
        currentPage = 1;
        break;
      case 'prev':
        currentPage = page - 1;
        break;
      case 'next':
        currentPage = page + 1;
        break;
      case 'end':
        currentPage = pages;
        break;
    }
    setSearchParams({ page: `${currentPage}`, limit: `${limit}` });
    dispatch(setPage(currentPage));
  };

  return (
    <div className="pagination">
      <div
        className={`pagination__start pagination__btn ${page <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('start')}
        data-testid="startPagination"
      >
        {duableArrow}
      </div>
      <div
        className={`pagination__prev pagination__btn ${page <= 1 ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('prev')}
        data-testid="prevPagination"
      >
        {arrow}
      </div>
      <div className="pagination__num pagination__btn" data-testid="pagePagination">
        {page}
      </div>
      <div
        className={`pagination__next pagination__btn ${pages === page ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('next')}
        data-testid="nextPagination"
      >
        {arrow}
      </div>
      <div
        className={`pagination__end pagination__btn ${pages === page ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('end')}
        data-testid="endPagination"
      >
        {duableArrow}
      </div>
    </div>
  );
};

export default Pagination;
