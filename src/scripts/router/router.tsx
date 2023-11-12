import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App/App';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import CardDetail from '../pages/CardDetail/CardDetail';
import { PotionsParamsProvider } from '../providers/HPParamsProvider';

export const routes = [
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
];

const router = createBrowserRouter(routes, {
  basename: '/RSReact',
});

export default router;
