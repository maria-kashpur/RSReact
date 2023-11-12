import { useCallback, useContext, useState } from 'react';
import './search.scss';
import { APotionsFilter } from '../../api/types/potions';
import { arrowIco, resetIco, searchBtnIco } from './data/ico';
import { useNavigate } from 'react-router';
import { IContext, PotionsParamsContext } from '../../providers/HPParamsProvider';
import React from 'react';
import { categories } from '../../data/searchCategories';

const Search = React.memo(() => {
  const { searchCategory, setSearchCategory, searchValue, setSearchValue, setPaginationPage } =
    useContext(PotionsParamsContext) as Required<IContext>;

  const [currentCategory, setCurrentCategory] = useState<APotionsFilter>(searchCategory);
  const [value, setValue] = useState<string>(searchValue);

  const [openCategories, setOpenCategories] = useState<boolean>(false);

  const navigate = useNavigate();

  const heandleSearch = useCallback(() => {
    setSearchCategory(currentCategory);
    setSearchValue(value);
    setPaginationPage(1);
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [currentCategory, navigate, setPaginationPage, setSearchCategory, setSearchValue, value]);

  return (
    <div className="search">
      <label className="search__text">
        <input
          data-testid="searchInput"
          type="text"
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <span className="search__current_category">
          SEARCH
          <br />
          {currentCategory.toUpperCase()}
        </span>
      </label>

      <button
        className={`search__reset ${value === '' ? '' : 'active'}`}
        onClick={() => setValue('')}
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

      <button className="search__btn" onClick={() => heandleSearch()} data-testid="searchBtn">
        {searchBtnIco}
      </button>
    </div>
  );
});

export default Search;
