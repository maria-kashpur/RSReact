import { arrow, duableArrow } from './data/arrowsIco';
import { useRouter } from 'next/router';
import { useGetPotionsQuery } from '@/store/reducers/hpApi';
import { getQuery } from '@/utils/getQuery';

export default function Pagination() {
  const router = useRouter();
  const { page } = getQuery(router.query);
  const { data } = useGetPotionsQuery(getQuery(router.query));

  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    let currentPage = +page;
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
        currentPage = data?.pages || 1;
        break;
    }
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: currentPage,
      },
    });
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
        className={`pagination__next pagination__btn ${data?.pages === page ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('next')}
        data-testid="nextPagination"
      >
        {arrow}
      </div>
      <div
        className={`pagination__end pagination__btn ${data?.pages === page ? 'disabled' : ''}`}
        onClick={() => handlePaginationClick('end')}
        data-testid="endPagination"
      >
        {duableArrow}
      </div>
    </div>
  );
}
