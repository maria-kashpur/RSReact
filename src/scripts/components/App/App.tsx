import { Component } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import HpApi from '../../api/HpApi';
import { PotionsReqParams, PotionsResponse } from '../../api/types/potions';
import Pagination from '../Pagination/Pagination';
import defineNumberOfPages from '../Pagination/defineNumberOfPages';
import BtnError from '../BtnError/BtnError';
import Loader from '../Preloader/Preloader';

const categories = [
  'characteristics',
  'difficulty',
  'effect',
  'inventors',
  'ingredients',
  'manufacturers',
  'name',
  'side_effects',
  'time',
];

interface IState {
  isLoaded: boolean;
  items: PotionsResponse['data'] | null;
  pagination: {
    current: number;
    last: number;
    next: number;
    pages: number;
  };
  params: PotionsReqParams;
}

const defaultPotionParams = {
  sort: { param: 'ASC', attribute: 'name' },
  filters: undefined,
  pagination: { limit: 30, page: 1 },
};
const lsPotionParams = localStorage.getItem('potionsParams');
export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null,
      pagination: {
        current: 1,
        last: 0,
        next: 0,
        pages: 0,
      },
      params: lsPotionParams ? JSON.parse(lsPotionParams) : defaultPotionParams,
    };
  }

  public handlePaginationClick = (btn: 'start' | 'next' | 'prev' | 'end') => {
    let page = this.state.params.pagination.page;
    switch (btn) {
      case 'start':
        page = 1;
        break;
      case 'prev':
        page = page - 1;
        break;
      case 'next':
        page = page + 1;
        break;
      case 'end':
        page = this.state.pagination.pages;
        break;
      default:
        break;
    }
    const newParams = { ...this.state.params };
    newParams.pagination.page = page;
    this.setState({ params: newParams });
  };

  public handleSendParams = async (filter: PotionsReqParams['filters']) => {
    this.setState((state) => ({
      params: {
        filters: filter,
        pagination: {
          page: 1,
          limit: state.params.pagination.limit,
        },
      },
    }));
  };

  public async getData() {
    this.setState({ isLoaded: false });
    const res = await HpApi.getPotions(this.state.params);
    if (!res) return;
    this.setState((state) => ({
      items: res.data,
      pagination: {
        current: res.meta.pagination.current,
        last: res.meta.pagination.last ? res.meta.pagination.last : 0,
        next: res.meta.pagination.next ? res.meta.pagination.next : 0,
        pages: res.meta.pagination.records
          ? defineNumberOfPages(res.meta.pagination.records, state.params.pagination?.limit)
          : 0,
      },
    }));
    this.setState({ isLoaded: true });
  }

  componentDidMount(): void {
    this.getData();
  }

  componentDidUpdate(_prevProps: unknown, prevState: { params: PotionsReqParams }) {
    if (prevState.params !== this.state.params) {
      this.getData();
      localStorage.setItem('potionsParams', JSON.stringify(this.state.params));
    }
  }

  render() {
    const template = (
      <div className="content conteiner">
        <div className="content__header">
          <h1 className="content__title">Potions</h1>
          <BtnError />
          <Search
            categories={categories}
            params={this.state.params}
            hundleSendParams={this.handleSendParams.bind(this)}
          />
        </div>
        <div className="content__main">
          <Pagination
            pagination={this.state.pagination}
            handlePaginationClick={this.handlePaginationClick}
            params={this.state.params.pagination}
          />
          {this.state.items ? <Cards data={this.state.items} /> : <div>get data...</div>}
        </div>
      </div>
    );

    return (
      <>
        {this.state.isLoaded ? '' : <Loader />}
        {template}
      </>
    );
  }
}
