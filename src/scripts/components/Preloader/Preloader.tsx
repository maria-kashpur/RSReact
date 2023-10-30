import { Component } from 'react';
import './preloader.scss';

export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader">
        <span className="preloader__ico"></span>
      </div>
    );
  }
}
