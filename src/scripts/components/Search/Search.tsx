import { Component } from 'react';
import './search.scss';

const resetIco = (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width={20}>
    <path fill="none" d="M0 0h256v256H0z"></path>
    <path
      stroke="#d1bd26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
      d="M200 56 56 200M200 200 56 56"
      fill="#d1bd26"
      className="fill-000000 stroke-000000"
    ></path>
  </svg>
);

const searchBtnIco = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width={30}>
    <g data-name="Layer 3">
      <path
        d="M11 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8ZM28 29.74a3 3 0 0 1-1.93-.7l-6.13-5.14a3 3 0 0 1 3.86-4.6l6.13 5.14a3 3 0 0 1-1.93 5.3Zm-6.13-9.14h-.09a1 1 0 0 0-.55 1.77l6.13 5.14a1 1 0 0 0 1.41-.12 1 1 0 0 0 .23-.73 1 1 0 0 0-.36-.68l-6.13-5.15a1 1 0 0 0-.64-.23Z"
        fill="#c7a23e"
        className="fill-101820"
      ></path>
      <path
        d="M20 21a1 1 0 0 1-.64-.23L17 18.82a1 1 0 0 1 1.28-1.54l2.34 1.95a1 1 0 0 1 .13 1.41A1 1 0 0 1 20 21Z"
        fill="#c7a23e"
        className="fill-101820"
      ></path>
    </g>
  </svg>
);

const arrowIco = (
  <svg
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={20}
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="#c2983e"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-000000"
    ></path>
  </svg>
);

interface IProps {
  categories: string[];
  hundleSendParams: () => void;
}

interface IState {
  readonly currentCategory: string;
  readonly searchValue: string | null;
  readonly openCategories: boolean;
}

export default class Search extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      currentCategory: 'name',
      searchValue: localStorage.getItem('searchPotionsValue')
        ? localStorage.getItem('searchPotionsValue')
        : '',
      openCategories: false,
    };
  }

  render() {
    return (
      <div className="search">
        <label className="search__text">
          <input
            type="text"
            required
            value={this.state.searchValue ? this.state.searchValue : ''}
            onChange={(e) => {
              this.setState({ searchValue: e.target.value });
            }}
          />

          <span className="search__current_category">
            SEARCH
            <br />
            {this.state.currentCategory.toUpperCase()}
          </span>
        </label>
        <button
          className={`search__reset ${this.state.searchValue === '' ? '' : 'active'}`}
          onClick={() => {
            this.setState({ searchValue: '' });
          }}
        >
          {resetIco}
        </button>
        <div
          className="search__category"
          onClick={() => this.setState({ openCategories: !this.state.openCategories })}
        >
          <div className="search__current_category">
            <span className={`arrow_ico ${this.state.openCategories ? 'active' : ''}`}>
              {arrowIco}
            </span>
          </div>
          <ul className={`search__categories ${this.state.openCategories ? 'active' : ''}`}>
            {this.props.categories.map((el, index) => (
              <li
                key={`category_potion__${index}`}
                className="category__item"
                onClick={(e) => {
                  if (!e.currentTarget.textContent) return;
                  this.setState({ currentCategory: e.currentTarget.textContent });
                }}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <button className="search__btn" onClick={() => this.props.hundleSendParams()}>
          {searchBtnIco}
        </button>
      </div>
    );
  }
}
