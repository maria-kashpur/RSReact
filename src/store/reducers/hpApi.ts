import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import defineNumberOfPages from '../../utils/defineNumberOfPages';
import { Potion, PotionResponse, PotionsResponse } from '@/types/potions';
import { setPages, setPotion, setPotions } from './potionSlice';

export interface IQueryGetPotions {
  page: number;
  limit: number;
  category: string;
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPotions: build.query<IGetPotionsResponse, IQueryGetPotions>({
      query: (params) => {
        const { page, limit, category, search } = params;
        console.log(params);
        const searchQuery =
          search === ''
            ? ''
            : `&filter[${category.split('_').join(' ')}_cont_any]=${search.split(' ').join('%20')}`;
        const pageQuery = `page[number]=${page}`;
        const limitQuery = `page[size]=${limit}`;
        const queryString = [pageQuery, limitQuery, searchQuery]
          .filter((el) => el !== '')
          .join('&');
        console.log(queryString);
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        dispatch(setPotions(data.data.potions));
        dispatch(setPages(data.data.pages));
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        dispatch(
          setPotion({
            attributes: data.data.attributes,
            image: data.data.image,
            name: data.data.name,
          })
        );
      },
    }),
  }),
});

export const {
  useGetPotionsQuery,
  useGetPotionQuery,
  util: { getRunningQueriesThunk },
} = potionApi;

export const { getPotions, getPotion } = potionApi.endpoints;
