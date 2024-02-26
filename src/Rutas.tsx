import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Home from "./view/inicio/Home"
// 


const router = createBrowserRouter([
  {
    path: '/inicio',
    element: <Navigate to="centro-idiomas" replace />
  },
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'centro-idiomas',
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
  {
    path: 'acceso',
    element: <Acceso />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
])

export default router;