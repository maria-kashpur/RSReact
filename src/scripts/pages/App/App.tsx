import Search from '../../components/Search/Search';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import BtnError from '../../components/BtnError/BtnError';
import './app.scss';
import InputNumber from '../../components/InputNumber/InputNumber';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPotionsQuery } from '../../store/reducers/hpApi';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  setPotions,
  setPages,
  setPage,
  setLimit,
  setPotionsIsLoading,
} from '../../store/reducers/potionSlice';

export interface IPagination {
  current: number;
  pages: number;
}

const App = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { limit, page, search, category } = useAppSelector((state) => state.potionReducer);
  const { data, isFetching } = useGetPotionsQuery({ page, limit, search, category });

  useEffect(() => {
    const limitUrl = searchParams.get('limit');
    const pageUrl = searchParams.get('page');
    if (!limitUrl || !pageUrl) {
      setSearchParams({ page: `${pageUrl || page}`, limit: `${limitUrl || limit}` });
    }
    if (limitUrl) dispatch(setLimit(+limitUrl));
    if (pageUrl) dispatch(setPage(+pageUrl));
  }, [dispatch, limit, page, searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(setPotions(data?.potions || []));
    dispatch(setPages(data?.pages || 1));
    dispatch(setPotionsIsLoading(isFetching));
  }, [data?.pages, data?.potions, dispatch, isFetching]);

  const location = useLocation();
  const navigate = useNavigate();

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
          <Pagination />
          <Cards />
        </div>
        <Outlet />
      </div>
    </div>
  );

  return template;
};

export default App;
