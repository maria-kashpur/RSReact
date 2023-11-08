import { useContext, useState } from 'react';
import './search.scss';
import { APotionsFilter, PotionsReqParams } from '../../api/types/potions';
import { arrowIco, resetIco, searchBtnIco } from './ico';
import { useNavigate } from 'react-router';
import { saveParamsInLS } from '../App/data/localStorage';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';

export default function Search() {
  const { categories, setParams, params } = useContext(PotionsParamsContext) as IContext;

  const [currentCategory, setCurrentCategory] = useState<APotionsFilter>(
    params.filters && params.filters.length === 1 ? params.filters[0].attribute : 'name'
  );
  const [searchValue, setSearchValue] = useState<string | null>(
    params.filters && params.filters.length === 1 ? params.filters[0].what : ''
  );
  const [openCategories, setOpenCategories] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const heandleSearch = () => {
    if (searchValue === '') {
      handleSendParams(undefined);
    } else {
      const param: PotionsReqParams['filters'] = [
        {
          attribute: currentCategory,
          predicate: 'cont_any',
          what: searchValue,
        },
      ];
      handleSendParams(param);
    }
  };

  return (
    <div className="search">
      <label className="search__text">
        <input
          type="text"
          required
          value={searchValue ? searchValue : ''}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <span className="search__current_category">
          SEARCH
          <br />
          {currentCategory.toUpperCase()}
        </span>
      </label>
      <button
        className={`search__reset ${searchValue === '' ? '' : 'active'}`}
        onClick={() => setSearchValue('')}
      >
        {resetIco}
      </button>
      <div className="search__category" onClick={() => setOpenCategories(!openCategories)}>
        <div className="search__current_category">
          <span className={`arrow_ico ${openCategories ? 'active' : ''}`}>{arrowIco}</span>
        </div>
        <ul className={`search__categories ${openCategories ? 'active' : ''}`}>
          {categories.map((el, index) => (
            <li
              key={`category_potion__${index}`}
              className="category__item"
              onClick={(e) => {
                if (!e.currentTarget.textContent) return;
                setCurrentCategory(
                  e.currentTarget.textContent.split(' ').join('_') as APotionsFilter
                );
              }}
            >
              {el.split('_').join(' ')}
            </li>
          ))}
        </ul>
      </div>
      <button className="search__btn" onClick={() => heandleSearch()}>
        {searchBtnIco}
      </button>
    </div>
  );
}
