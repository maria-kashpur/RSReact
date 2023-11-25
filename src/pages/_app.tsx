import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import '@/styles/index.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Preloader from '@/components/Preloader/Preloader';
import Layout from '@/components/Layout/Layout';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        {loading && <Preloader />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}
