import { potionApi } from '@/store/reducers/hpApi';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';
import { getQuery } from '@/utils/getQuery';
import Layout from '@/components/Layout/Layout';

const Home = () => {
  return <Layout />;
};

export default Home;

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query } = ctx;
    const param = getQuery(query);
    await store.dispatch(potionApi.endpoints.getPotions.initiate(param));

    await Promise.all(store.dispatch(potionApi.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
