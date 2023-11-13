import { useContext, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import Cards from '../../components/Cards/Cards';
import { PotionsResponse } from '../../api/types/potions';
import Pagination from '../../components/Pagination/Pagination';
import BtnError from '../../components/BtnError/BtnError';
import Loader from '../../components/Preloader/Preloader';
import './app.scss';
import InputNumber from '../../components/InputNumber/InputNumber';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { loader } from './loader';
import { CardsContextProvider } from '../../providers/CardsProvider';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';
import { saveParamsInLS } from '../../utils/localStorage';
import { createParams } from '../../utils/createParams';
import React from 'react';

export interface IPagination {
  current: number;
  pages: number;
}

const App = React.memo(() => {
  const { searchCategory, paginationLimit, paginationPage, searchValue, setSearchParams } =
    useContext(PotionsParamsContext) as Required<IContext>;

  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [items, setItems] = useState<PotionsResponse['data']>([]);

  const [pagination, setPagination] = useState<IPagination | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = createParams(searchCategory, paginationLimit, paginationPage, searchValue);
    setIsLoaded(() => false);
    loader(params).then(({ items, pagination }) => {
      setItems(() => items);
      setPagination(() => pagination);
      setSearchParams({ page: `${params.pagination.page}`, limit: `${params.pagination.limit}` });
      setIsLoaded(() => true);
      saveParamsInLS(JSON.stringify(params));
    });
  }, [paginationLimit, paginationPage, searchCategory, searchValue, setSearchParams]);

  const template = (
    <div className="content conteiner">
      <div className="content__header">
        <h1 className="content__title">Potions</h1>
        <BtnError />
        <Search />
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
          <InputNumber minValue={1} title={'Cards limit on the page:'} maxValue={100} />
          {isLoaded && pagination && items.length > 0 ? <Pagination pagination={pagination} /> : ''}
          {isLoaded ? <Cards /> : ''}
        </div>
        <Outlet />
      </div>
    </div>
  );

  return (
    <CardsContextProvider data={items}>
      {isLoaded ? '' : <Loader />}
      {template}
    </CardsContextProvider>
  );
});

export default App;
