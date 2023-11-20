import { useState } from 'react';
import './search.scss';
import { arrowIco, resetIco, searchBtnIco } from './data/ico';
import { useNavigate } from 'react-router';
import React from 'react';
import { categories } from '../../data/searchCategories';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearch } from '../../store/reducers/potionSlice';
import { IQueryGetPotions } from '../../store/reducers/hpApi';
import s from './search.module.scss';

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
    <div className={s.search_wrap}>
      <label className={s.text_box}>
        <input
          className={s.text}
          data-testid="searchInput"
          type="text"
          required
          name="searchInput"
          value={currentSearch}
          onChange={(e) => {
            setCurrentSearch(e.target.value);
          }}
        />

        <span className={s.current_category}>
          SEARCH
          <br />
          {currentCategory.toUpperCase()}
        </span>
      </label>

      <button
        className={`${s.reset} ${currentSearch === '' ? '' : s.active}`}
        onClick={() => setCurrentSearch('')}
      >
        {resetIco}
      </button>

      <div className={s.categories_box} onClick={() => setOpenCategories(!openCategories)}>
        <div className={s.categories_bnt}>
          <div className={`${s.arrow_ico} ${openCategories ? s.active : ''}`}>{arrowIco}</div>
        </div>
        <ul className={`${s.categories_list} ${openCategories ? s.active : ''}`}>
          {categories.map((category: IQueryGetPotions['category'], index) => (
            <li
              key={`category_potion__${index}`}
              className={s.categories_list__item}
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

      <button className={s.search_btn} onClick={() => handleSearch()} data-testid="searchBtn">
        {searchBtnIco}
      </button>
    </div>
  );
});

export default Search;
