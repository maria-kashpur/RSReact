import './btn_erroe.scss';
import { Component } from 'react';

export default class BtnError extends Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) throw Error('button Error');
    return (
      <div className="error_btn_box">
        <button className="btn-error" onClick={() => this.setState({ hasError: true })}>
          <img src="dementor_png_by_shutupdemi_d6w1fnh-pre.png" alt="dementor" />
        </button>
      </div>
    );
  }
}
