import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Potion, PotionResponse, PotionsResponse } from '../../api/types/potions';
import defineNumberOfPages from '../../utils/defineNumberOfPages';

export interface IQueryGetPotions {
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
    | 'side effects'
    | 'time';
  search: string;
}

interface IGetPotionsResponse {
  potions: PotionsResponse['data'];
  page: number;
  pages: number;
}
interface IGetPotionResponse {
  image: string | null;
  name: string | null;
  attributes: Potion['attributes'];
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
          search === ''
            ? ''
            : `&filter[${category.split('_').join(' ')}_cont_any]=${search.split(' ').join('%20')}`;
        const pageQuery = `page[number]=${page}`;
        const limitQuery = `page[size]=${limit}`;
        const queryString = [pageQuery, limitQuery, searchQuery]
          .filter((el) => el !== '')
          .join('&');
        return `potions/?${queryString}`;
      },
      transformResponse: (response: PotionsResponse, _meta, arg) => {
        const pages = defineNumberOfPages(response.meta.pagination.records, arg.limit);
        return {
          potions: response.data,
          page: response.meta.pagination.current,
          pages,
        };
      },
    }),
    getPotion: build.query<IGetPotionResponse, string | number>({
      query: (id) => {
        return `potions/${id}`;
      },
      transformResponse: (response: PotionResponse) => {
        return {
          name: response.data.attributes.name,
          image: response.data.attributes.image,
          attributes: response.data.attributes,
        };
      },
    }),
  }),
});

export const { useGetPotionsQuery, useGetPotionQuery } = potionApi;
