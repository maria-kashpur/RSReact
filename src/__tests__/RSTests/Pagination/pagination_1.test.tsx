import { act, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../../../scripts/router/router';
import { PotionsReqParams } from '../../../scripts/api/types/potions';
import HpApi from '../../../scripts/api/HpApi';
import { fakeRes } from '../../data/fakeRes';
import { mockCardResp } from '../../data/mockCardResp';

describe('Testing Pagination - Make sure the component updates URL query parameter when page changes', async () => {
  beforeAll(async () => {
    vi.mock('../../../scripts/pages/App/loader', () => {
      return {
        loader: vi.fn(async (params: PotionsReqParams) => {
          const items = fakeRes.data;
          const pagination = {
            current: params.pagination.page,
            pages: 18,
          };
          return { items, pagination };
        }),
      };
    });

    vi.spyOn(HpApi, 'getPotion').mockReturnValue(new Promise((resolve) => resolve(mockCardResp)));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('start btn updates URL', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));
    const start = screen.getByTestId('startPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(start));
    expect(router.state.location.search).toMatch('page=1');
  });

  test('prev btn updates URL', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));
    const prev = screen.getByTestId('prevPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(prev));
    expect(router.state.location.search).toMatch('page=3');
  });

  test('next btn updates URL', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));
    const next = screen.getByTestId('nextPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(next));
    expect(router.state.location.search).toMatch('page=5');
  });

  test('end btn updates URL', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });

    await act(async () => render(<RouterProvider router={router} />));
    const end = screen.getByTestId('endPagination');
    expect(router.state.location.search).toMatch('page=4');
    await act(async () => fireEvent.click(end));
    expect(router.state.location.search).toMatch('page=18');
  });
});
