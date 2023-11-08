import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import ErrorPage from '../api/pages/ErrorPage/ErrorPage';
import CardDetail from '../components/CardDetail/CardDetail';
import { PotionsParamsProvider } from '../providers/HPParamsProvider';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <PotionsParamsProvider>
          <App />
        </PotionsParamsProvider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'detail/:id',
          element: <CardDetail />,
        },
      ],
    },
  ],
  {
    basename: '/RSReact',
  }
);

export default router;
