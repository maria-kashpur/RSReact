import { Component } from 'react';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';

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
export default class App extends Component {
  render() {
    return (
      <div className="content conteiner">
        <div className="content__header">
          <h1 className="content__title">Potions</h1>
          <Search categories={categories} />
        </div>
        <div className="content__main">
          <Cards />
        </div>
      </div>
    );
  }
}
