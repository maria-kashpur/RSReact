import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PotionsResponse } from '../../api/types/potions';

interface IQueryGetPotions {
  page: number;
  limit: number;
  category:
    | 'name'
    | 'characteristics'
    | 'difficulty'
    | 'effect'
    | 'inventors'
    | 'ingredients'
    | 'manufacturers'
    | 'side_effects'
    | 'time';
  search: string;
}

interface IGetPotionsResponse {
  potions: PotionsResponse['data'];
  page: number;
  records: number;
}

const BASE_URL = 'https://api.potterdb.com/v1/';

export const potionApi = createApi({
  reducerPath: 'api/potions',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPotions: build.query<IGetPotionsResponse, IQueryGetPotions>({
      query: (params) => {
        const { page, limit, category, search } = params;
        const searchQuery =
          search === '' ? '' : `&filter[${category}__cont_any]=${search.split(' ').join('%20')}`;
        const pageQuery = `page[number]=${page}`;
        const limitQuery = `page[size]=${limit}`;
        const queryString = [pageQuery, limitQuery, searchQuery]
          .filter((el) => el !== '')
          .join('&');
        return `potions/?${queryString}`;
      },
      transformResponse: (response: PotionsResponse) => ({
        potions: response.data,
        page: response.meta.pagination.current,
        records: response.meta.pagination.records | 0,
      }),
    }),
  }),
});

export const { useGetPotionsQuery } = potionApi;
