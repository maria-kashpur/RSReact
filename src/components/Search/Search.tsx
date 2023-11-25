import { useState } from 'react';
import s from './search.module.scss';
import { arrowIco, resetIco, searchBtnIco } from './data/ico';
import { categories } from '../../data/searchCategories';
import { IQueryGetPotions } from '../../store/reducers/hpApi';
import { useRouter } from 'next/router';
import { getQuery } from '@/utils/getQuary';

const Search = () => {
  const router = useRouter();
  const { search, category, limit } = getQuery(router.query);
  const [currentCategory, setCurrentCategory] = useState<IQueryGetPotions['category']>(category);
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [openCategories, setOpenCategories] = useState<boolean>(false);

  const handleSearch = () => {
    if (currentSearch !== '') {
      router.push({
        pathname: '/',
        query: {
          limit: `${limit}`,
          page: `1`,
          search: currentSearch,
          category: currentCategory,
        },
      });
    } else {
      router.push('/', {
        pathname: '/',
        query: {
          page: `1`,
          limit: `${limit}`,
        },
      });
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
};

export default Search;
