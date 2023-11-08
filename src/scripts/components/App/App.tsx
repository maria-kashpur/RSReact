import { useContext, useEffect, useState } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import { PotionsResponse } from '../../api/types/potions';
import Pagination from '../Pagination/Pagination';
import BtnError from '../BtnError/BtnError';
import Loader from '../Preloader/Preloader';
import './app.scss';
import InputNumber from '../InputNumber/InputNumber';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { loader } from './loader';
import { CardsContextProvider } from '../../providers/CardsProvider';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';

export interface IPagination {
  current: number;
  last: number;
  next: number;
  pages: number;
}

export default function App() {
  const { params, setSearchParams } = useContext(PotionsParamsContext) as IContext;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<PotionsResponse['data']>([]);

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
          {isLoaded && pagination && items && items.length > 0 ? (
            <Pagination pagination={pagination} />
          ) : (
            ''
          )}
          {isLoaded ? <Cards /> : ''}
          {/* {items && items.length === 0 ? (
            <p className="messege"> No results were found for your request</p>
          ) : (
            ''
          )} */}
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
}
