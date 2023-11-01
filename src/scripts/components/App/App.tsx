import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import HpApi from '../../api/HpApi';
import { PotionsReqParams, PotionsResponse } from '../../api/types/potions';
import Pagination from '../Pagination/Pagination';
import defineNumberOfPages from '../Pagination/defineNumberOfPages';
import BtnError from '../BtnError/BtnError';
import Loader from '../Preloader/Preloader';
import './app.scss';
// import { potions } from '../data/potions';
import InputNumber from '../InputNumber/InputNumber';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';

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

const lsPotionParams = localStorage.getItem('potionsParams');

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  const defaultPotionParams = {
    sort: { param: 'ASC', attribute: 'name' },
    filters: undefined,
    pagination: {
      limit: limit !== null && typeof +limit === 'number' ? +limit : 30,
      page: page !== null && typeof +page === 'number' ? +page : 1,
    },
  };

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<PotionsResponse['data'] | null>(null);
  const [params, setParams] = useState<PotionsReqParams>(
    lsPotionParams && searchParams.size === 0 ? JSON.parse(lsPotionParams) : defaultPotionParams
  );
  const [pagination, setPagination] = useState<{
    current: number;
    last: number;
    next: number;
    pages: number;
  }>({
    current: 1,
    last: 0,
    next: 0,
    pages: 0,
  });

  useEffect(() => {
    const getData = async () => {
      setIsLoaded(false);

      const res = await HpApi.getPotions(params);
      //const res = potions;
      if (!res) return;
      setItems(res.data);
      setPagination({
        current: res.meta.pagination.current,
        last: res.meta.pagination.last ? res.meta.pagination.last : 0,
        next: res.meta.pagination.next ? res.meta.pagination.next : 0,
        pages: res.meta.pagination.records
          ? defineNumberOfPages(res.meta.pagination.records, params.pagination?.limit)
          : 0,
      });
      setSearchParams({ page: `${params.pagination.page}`, limit: `${params.pagination.limit}` });
      setIsLoaded(true);
    };
    getData();
  }, [params, setSearchParams]);

  const saveParamsInLS = (params: string) => {
    localStorage.setItem('potionsParams', params);
  };

  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    let page = params.pagination.page;
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
        page = pagination.pages;
        break;
      default:
        break;
    }
    const newParams = { ...params };
    newParams.pagination.page = page;
    setParams(newParams);
    saveParamsInLS(JSON.stringify(newParams));
  };

  const handleSendParams = async (filter: PotionsReqParams['filters']) => {
    const newParams = {
      ...params,
      filters: filter,
      pagination: {
        page: 1,
        limit: params.pagination.limit,
      },
    };
    setParams(newParams);
    saveParamsInLS(JSON.stringify(newParams));
  };

  const handleChangePagitionLimit = (value: number) => {
    const newParams = { ...params };
    newParams.pagination.limit = value;
    newParams.pagination.page = 1;
    setParams(() => newParams);
    saveParamsInLS(JSON.stringify(newParams));
  };

  const template = (
    <div className="content conteiner">
      <div className="content__header">
        <h1 className="content__title">Potions</h1>
        <BtnError />
        <Search categories={categories} params={params} hundleSendParams={handleSendParams} />
      </div>
      <div className="content__main_wrap">
        <div className="content__main">
          <InputNumber
            value={params.pagination.limit}
            minValue={1}
            title={'Cards limit on the page:'}
            maxValue={100}
            action={handleChangePagitionLimit}
          />
          {isLoaded && items?.length !== 0 ? (
            <Pagination
              pagination={pagination}
              handlePaginationClick={handlePaginationClick}
              params={params.pagination}
            />
          ) : (
            ''
          )}
          {items ? <Cards data={items} variant={'full'} /> : <div>get data...</div>}
        </div>
        <Outlet />
      </div>
    </div>
  );

  return (
    <>
      {isLoaded ? '' : <Loader />}
      {template}
    </>
  );
}
