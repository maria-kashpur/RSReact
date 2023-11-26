import CardDetail from '@/components/CardDetail/CardDetail';
import Layout from '@/components/Layout/Layout';
import { potionApi } from '@/store/reducers/hpApi';
import { wrapper } from '@/store/store';
import { getQuery } from '@/utils/getQuery';
import { GetServerSideProps } from 'next';

export default function Detail() {
  return (
    <Layout>
      <CardDetail />
    </Layout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query, params } = ctx;
    const param = getQuery(query);
    await store.dispatch(potionApi.endpoints.getPotions.initiate(param));

    const id = params?.id;
    await store.dispatch(potionApi.endpoints.getPotion.initiate(`${id}`));

    await Promise.all(store.dispatch(potionApi.util.getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
