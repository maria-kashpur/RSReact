import { Component } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
// import HpApi from '../../api/HpApi';
import { PotionsResponse } from '../../api/types/potions';
import { potions } from '../../data/potions';

const categories = [
  'characteristics',
  'difficulty',
  'effect',
  'inventors',
  'ingredients',
  'manufacturers',
  'name',
  'side effects',
  'time',
];

interface IState {
  isLoaded: boolean;
  items: PotionsResponse['data'];
}
export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount(): void {
    const getData = async () => {
      try {
        this.setState({
          isLoaded: true,
          items: potions.data,
        });

        // const res = await HpApi.getPotions();
        // this.setState({
        //   isLoaded: true,
        //   items: res.data,
        // });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }

  render() {
    return (
      <div className="content conteiner">
        <div className="content__header">
          <h1 className="content__title">Potions</h1>
          <Search categories={categories} />
        </div>
        <div className="content__main">
          <Cards data={this.state.items} />
        </div>
      </div>
    );
  }
}
