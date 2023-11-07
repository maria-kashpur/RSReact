import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import { PotionsReqParams, PotionsResponse } from '../../api/types/potions';
import Pagination from '../Pagination/Pagination';
import BtnError from '../BtnError/BtnError';
import Loader from '../Preloader/Preloader';
import './app.scss';
// import { potions } from '../data/potions';
import InputNumber from '../InputNumber/InputNumber';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { loader } from './loader';
import { lsPotionParams, saveParamsInLS } from './data/localStorage';
import { categories } from './data/searchCategories';
import { getDefaultPotionParams } from './data/getDefaultPotionParams';
import { CardsContext } from '../../contexts/CardsContext';

interface IPagination {
  current: number;
  last: number;
  next: number;
  pages: number;
}

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<PotionsResponse['data'] | null>([]);
  const [params, setParams] = useState<PotionsReqParams>(
    lsPotionParams && searchParams.size === 0
      ? JSON.parse(lsPotionParams)
      : getDefaultPotionParams(searchParams.get('limit'), searchParams.get('page'))
  );
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(() => false);
    loader(params).then(({ items, pagination }) => {
      setItems(() => items);
      setPagination(() => pagination);
      setSearchParams({ page: `${params.pagination.page}`, limit: `${params.pagination.limit}` });
      setIsLoaded(() => true);
    });
  }, [params, setSearchParams]);

  const handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    if (!pagination) return;
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
    if (location.pathname !== '/') {
      navigate('/');
    }
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
        <div
          className={`content__main ${location.pathname !== '/' ? 'blur' : ''}`}
          onClick={(e) => {
            if (location.pathname !== '/') {
              e.stopPropagation();
              navigate('/');
            }
          }}
        >
          <InputNumber
            value={params.pagination.limit}
            minValue={1}
            title={'Cards limit on the page:'}
            maxValue={100}
            action={handleChangePagitionLimit}
          />
          {isLoaded && pagination && items && items.length > 0 ? (
            <Pagination
              pagination={pagination}
              handlePaginationClick={handlePaginationClick}
              params={params.pagination}
            />
          ) : (
            ''
          )}
          {isLoaded && items ? (
            <Cards data={items} variant={location.pathname === '/' ? 'full' : 'mini'} />
          ) : (
            ''
          )}
          {items && items.length === 0 ? (
            <p className="messege"> No results were found for your request</p>
          ) : (
            ''
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );

  return (
    <CardsContext.Provider value={items}>
      {isLoaded ? '' : <Loader />}
      {template}
    </CardsContext.Provider>
  );
}
