import { useState } from 'react';
import './search.scss';
import { APotionsFilter, PotionsReqParams } from '../../api/types/potions';
import { arrowIco, resetIco, searchBtnIco } from './ico';
interface IProps {
  categories: string[];
  hundleSendParams: (param: PotionsReqParams['filters'] | undefined) => void;
  params: PotionsReqParams;
}

export default function Search({ categories, hundleSendParams, params }: IProps) {
  const [currentCategory, setCurrentCategory] = useState<APotionsFilter>(
    params.filters && params.filters.length === 1 ? params.filters[0].attribute : 'name'
  );
  const [searchValue, setSearchValue] = useState<string | null>(
    params.filters && params.filters.length === 1 ? params.filters[0].what : ''
  );
  const [openCategories, setOpenCategories] = useState<boolean>(false);

  const heandleSearch = () => {
    if (searchValue === '') {
      hundleSendParams(undefined);
    } else {
      const param: PotionsReqParams['filters'] = [
        {
          attribute: currentCategory,
          predicate: 'cont_any',
          what: searchValue,
        },
      ];
      hundleSendParams(param);
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
