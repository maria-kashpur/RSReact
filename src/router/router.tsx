import { createBrowserRouter } from 'react-router-dom';
import App from '../scripts/components/App/App';
import ErrorPage from '../scripts/api/pages/ErrorPage/ErrorPage';
import CardDetail from '../scripts/components/CardDetail/CardDetail';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
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
