import { useState } from 'react';
import './search.scss';
import { arrowIco, resetIco, searchBtnIco } from './data/ico';
import { useNavigate } from 'react-router';
import React from 'react';
import { categories } from '../../data/searchCategories';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearch } from '../../store/reducers/potionSlice';
import { IQueryGetPotions } from '../../store/reducers/hpApi';

const Search = React.memo(() => {
  const dispatch = useAppDispatch();
  const { search, category } = useAppSelector((state) => state.potionReducer);

  const [currentCategory, setCurrentCategory] = useState<IQueryGetPotions['category']>(category);
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [openCategories, setOpenCategories] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setSearch({ currentSearch, currentCategory }));
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="search">
      <label className="search__text">
        <input
          data-testid="searchInput"
          type="text"
          required
          value={currentSearch}
          onChange={(e) => {
            setCurrentSearch(e.target.value);
          }}
        />

        <span className="search__current_category">
          SEARCH
          <br />
          {currentCategory.toUpperCase()}
        </span>
      </label>

      <button
        className={`search__reset ${currentSearch === '' ? '' : 'active'}`}
        onClick={() => setCurrentSearch('')}
      >
        {resetIco}
      </button>

      <div className="search__category" onClick={() => setOpenCategories(!openCategories)}>
        <div className="search__current_category">
          <span className={`arrow_ico ${openCategories ? 'active' : ''}`}>{arrowIco}</span>
        </div>
        <ul className={`search__categories ${openCategories ? 'active' : ''}`}>
          {categories.map((category: IQueryGetPotions['category'], index) => (
            <li
              key={`category_potion__${index}`}
              className="category__item"
              onClick={(e) => {
                if (!e.currentTarget.textContent) return;
                setCurrentCategory(e.currentTarget.textContent as IQueryGetPotions['category']);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <button className="search__btn" onClick={() => handleSearch()} data-testid="searchBtn">
        {searchBtnIco}
      </button>
    </div>
  );
});

export default Search;
