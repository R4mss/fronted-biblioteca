import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Home from "./view/inicio/Home"
import Busqueda from './view/biblioteca/prestamo/Busqueda';
import SolicitudesPrestamo from './view/biblioteca/prestamo/SolicitudesPrestamos';
// 


const router = createBrowserRouter([
  {
    path: '/inicio',
    element: <Navigate to="biblioteca" replace />
  },
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'biblioteca',
        element: <Home />
      },
      {
        path: 'busqueda-libro',
        element: <Busqueda />
      },
      {
        path: 'solicitudes',
        element: <SolicitudesPrestamo />
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