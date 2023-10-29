import { Component } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
// import HpApi from '../../api/HpApi';
import { PotionsReqParams, PotionsResponse } from '../../api/types/potions';
import { potions } from '../../data/potions';
import Pagination from '../Pagination/Pagination';
import defineNumberOfPages from '../Pagination/defineNumberOfPages';

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
  items: PotionsResponse['data'];
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
  pagination: { limit: 4, page: 1 },
};
export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    const lsPotionParams = localStorage.getItem('potionsParams');
    this.state = {
      isLoaded: false,
      items: [],
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
    localStorage.setItem('potionsParams', JSON.stringify(newParams));
  };

  public hundleSendParams = (filter: PotionsReqParams['filters']) => {
    console.log(filter);
    const newParams = { ...this.state.params };
    newParams.filters = filter;
    newParams.pagination.page = 1;
    this.setState({ params: newParams });
    localStorage.setItem('potionsParams', JSON.stringify(newParams));
  };

  componentDidMount(): void {
    const getData = async () => {
      const res = potions;
      // const res = await HpApi.getPotions();
      this.setState({
        isLoaded: true,
        items: res.data,
        pagination: {
          current: res.meta.pagination.current,
          last: res.meta.pagination.last ? res.meta.pagination.last : 0,
          next: res.meta.pagination.next ? res.meta.pagination.next : 0,
          pages: res.meta.pagination.records
            ? defineNumberOfPages(res.meta.pagination.records, this.state.params.pagination?.limit)
            : 0,
        },
      });
    };
    getData();
  }

  render() {
    console.log(this.state.params);
    return (
      <div className="content conteiner">
        <div className="content__header">
          <h1 className="content__title">Potions</h1>
          <Search
            categories={categories}
            params={this.state.params}
            hundleSendParams={this.hundleSendParams.bind(this)}
          />
        </div>
        <div className="content__main">
          <Pagination
            pagination={this.state.pagination}
            handlePaginationClick={this.handlePaginationClick}
            params={this.state.params.pagination}
          />
          <Cards data={this.state.items} />
        </div>
      </div>
    );
  }
}
