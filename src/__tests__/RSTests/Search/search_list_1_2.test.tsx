import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../../../scripts/router/router';
import { PotionsReqParams } from '../../../scripts/api/types/potions';
import HpApi from '../../../scripts/api/HpApi';
import { fakeRes } from '../../data/fakeRes';
import { mockCardResp } from '../../data/mockCardResp';

describe.shuffle('Testing Search', async () => {
  beforeAll(async () => {
    vi.mock('../../../scripts/pages/App/loader', () => {
      return {
        loader: vi.fn(async (params: PotionsReqParams) => {
          const items = fakeRes.data;
          const pagination = {
            current: params.pagination.page,
            pages: 1,
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

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?page=4&limit=29'],
      initialIndex: 1,
    });
    await act(async () => render(<RouterProvider router={router} />));
    await act(async () => localStorage.removeItem('potionsParams'));
    expect(localStorage.getItem('potionsParams')).toBe(null);
    const searchInput = screen.getByTestId('searchInput');
    await act(async () => fireEvent.change(searchInput, { target: { value: 'sss' } }));
    const searchBtn = screen.getByTestId('searchBtn');
    await act(async () => fireEvent.click(searchBtn));
    expect(localStorage.getItem('potionsParams')).not.toBe(null);
    let ls;
    waitFor(() => {
      ls = localStorage.getItem('potionsParams');
    });
    expect(ls).toMatch(`"what":"sss"`);
  });

  // test('the component retrieves the value from the local storage upon mounting.', async () => {
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ['/?page=4&limit=29'],
  //     initialIndex: 1,
  //   });
  //   await act(async () => render(<RouterProvider router={router} />));
  //   const input = screen.getByTestId('searchInput') as HTMLInputElement;
  //   expect(input.value).toEqual('sss');
  // });
});
