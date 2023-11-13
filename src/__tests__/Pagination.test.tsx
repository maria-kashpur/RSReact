import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../scripts/components/Pagination/Pagination';
import { PotionsParamsProvider } from '../scripts/providers/HPParamsProvider';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorPage from '../scripts/pages/ErrorPage/ErrorPage';
import { IPagination } from '../scripts/pages/App/App';

function getRouter(params: string, pagination: IPagination) {
  const routes = [
    {
      path: '/',
      element: (
        <PotionsParamsProvider>
          <Pagination pagination={pagination} />
        </PotionsParamsProvider>
      ),
      errorElement: <ErrorPage />,
    },
  ];
  return createMemoryRouter(routes, {
    initialEntries: [`/?${params}`],
    initialIndex: 1,
  });
}

describe('Testsing Pagination component', () => {
  let start: HTMLElement;
  let prev: HTMLElement;
  let page: HTMLElement;
  let next: HTMLElement;
  let end: HTMLElement;
  const pagination = {
    current: 2,
    pages: 6,
  };
  beforeEach(() => {
    render(<RouterProvider router={getRouter('page=2&limit=30', pagination)} />);
    start = screen.getByTestId('startPagination');
    prev = screen.getByTestId('prevPagination');
    page = screen.getByTestId('pagePagination');
    next = screen.getByTestId('nextPagination');
    end = screen.getByTestId('endPagination');
  });

  test('show all pagination elements', () => {
    expect(start).toBeInTheDocument();
    expect(prev).toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(end).toBeInTheDocument();
    expect(page.innerHTML).toBe('2');
  });

  test('show pagination buttons change page', () => {
    expect(page.innerHTML).toBe('2');
    fireEvent.click(next);
    expect(page.innerHTML).toBe('3');
    fireEvent.click(next);
    expect(page.innerHTML).toBe('4');
    fireEvent.click(prev);
    expect(page.innerHTML).toBe('3');
    fireEvent.click(start);
    expect(page.innerHTML).toBe('1');
    fireEvent.click(end);
    expect(page.innerHTML).toBe('6');
  });
});
