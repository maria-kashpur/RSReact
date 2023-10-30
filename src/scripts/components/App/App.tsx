import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import HpApi from '../../api/HpApi';
import { PotionsReqParams, PotionsResponse } from '../../api/types/potions';
import Pagination from '../Pagination/Pagination';
import defineNumberOfPages from '../Pagination/defineNumberOfPages';
import BtnError from '../BtnError/BtnError';
import Loader from '../Preloader/Preloader';

const categories = [
  'characteristics',
  'difficulty',
  'effect',
  'inventors',
  'ingredients',
  'manufacturers',
  'name',
  'side_effects',
  'time',
];

interface IState {
  isLoaded: boolean;
  items: PotionsResponse['data'] | null;
  pagination: {
    current: number;
    last: number;
    next: number;
    pages: number;
  };
  params: PotionsReqParams;
}

const defaultPotionParams = {
  sort: { param: 'ASC', attribute: 'name' },
  filters: undefined,
  pagination: { limit: 30, page: 1 },
};
const lsPotionParams = localStorage.getItem('potionsParams');

export default function App() {
  const [state, setState] = useState<IState>({
    isLoaded: false,
    items: null,
    pagination: {
      current: 1,
      last: 0,
      next: 0,
      pages: 0,
    },
    params: lsPotionParams ? JSON.parse(lsPotionParams) : defaultPotionParams,
  });

  const getData = async () => {
    setState({ ...state, isLoaded: false });
    const res = await HpApi.getPotions(state.params);
    if (!res) return;
    const newState = {
      isLoaded: true,
      items: res.data,
      pagination: {
        current: res.meta.pagination.current,
        last: res.meta.pagination.last ? res.meta.pagination.last : 0,
        next: res.meta.pagination.next ? res.meta.pagination.next : 0,
        pages: res.meta.pagination.records
          ? defineNumberOfPages(res.meta.pagination.records, state.params.pagination?.limit)
          : 0,
      },
    };
    setState({ ...state, ...newState });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.params]);

  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    let page = state.params.pagination.page;
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
        page = state.pagination.pages;
        break;
      default:
        break;
    }
    const newParams = { ...state.params };
    newParams.pagination.page = page;
    setState({ ...state, params: newParams });
  };

  const handleSendParams = async (filter: PotionsReqParams['filters']) => {
    setState({
      ...state,
      params: {
        filters: filter,
        pagination: {
          page: 1,
          limit: state.params.pagination.limit,
        },
      },
    });
  };

  const template = (
    <div className="content conteiner">
      <div className="content__header">
        <h1 className="content__title">Potions</h1>
        <BtnError />
        <Search categories={categories} params={state.params} hundleSendParams={handleSendParams} />
      </div>
      <div className="content__main">
        <Pagination
          pagination={state.pagination}
          handlePaginationClick={handlePaginationClick}
          params={state.params.pagination}
        />
        {state.items ? <Cards data={state.items} /> : <div>get data...</div>}
      </div>
    </div>
  );

  return (
    <>
      {state.isLoaded ? '' : <Loader />}
      {template}
    </>
  );
}
