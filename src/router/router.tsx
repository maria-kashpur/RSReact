import { createBrowserRouter } from 'react-router-dom';
import Main from '../components/pages/Main/Main';
import UncontroledForm from '../components/pages/UnControledForm/UncontroledForm';
import ControledForm from '../components/pages/ControledForm/ControledForm';

export const routes = [
  {
    path: '/',
    element: <Main />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/uncontrolled',
    element: <UncontroledForm />,
  },
  {
    path: 'controlled',
    element: <ControledForm />,
  },
];

const router = createBrowserRouter(routes);

export default router;
