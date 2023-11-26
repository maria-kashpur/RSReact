import { Component, ReactNode } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorPage />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px auto',
            }}
          >
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'gold',
                border: '1px solid gold',
                borderRadius: '10px',
                padding: '10px',
              }}
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
