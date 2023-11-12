import { act, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../../../scripts/router/router';
import { PotionsReqParams } from '../../../scripts/api/types/potions';
import HpApi from '../../../scripts/api/HpApi';
import { fakeRes } from '../../data/fakeRes';
import { mockCardResp } from '../../data/mockCardResp';

describe('Testing Detailed Card component', async () => {
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

  test('clicking the close button hides the component', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/detail/78f43f9e-fb3a-4d27-99cb-b4d7674ef208?page=1&limit=29'],
      initialIndex: 1,
    });
    await act(async () => render(<RouterProvider router={router} />));
    expect(screen.getByTestId('cardDetailBox')).toBeInTheDocument();
    const closeBtn = screen.getByTestId('cardDetailClose');
    await act(async () => fireEvent.click(closeBtn));
    const cardBox = document.querySelector('cardDetailBox');
    if (cardBox) throw Error('Card box is not null');
    expect(cardBox).toBe(null);
  });
});
