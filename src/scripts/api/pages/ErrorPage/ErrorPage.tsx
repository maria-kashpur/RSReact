import { Component } from 'react';
import './error_page.scss';

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="not_found">
        <div className="not_found__box">
          <div className="not_found__item"></div>
          <div className="not_found__item">
            <img src="harry-potter-4077473_1280.png" alt="error icon" />
          </div>
        </div>
        <div className="not_found__messege">The error was raised and handled</div>
      </div>
    );
  }
}
