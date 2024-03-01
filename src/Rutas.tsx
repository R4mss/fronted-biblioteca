import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Home from "./view/inicio/Home"
import Busqueda from './view/biblioteca/prestamo/Busqueda';
import BusquedaBien from './view/laboratorio/prestamo/BusquedaBien';
import SolicitudesPrestamo from './view/biblioteca/prestamo/SolicitudesPrestamos';
import HomeLaboratorio from './view/laboratorio/HomeLabortario';
import SolicitudesPrestamosBien from './view/laboratorio/prestamo/SolicitudesPresamosBien';
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
      //biblioteca
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
      
      //laboratorio
      {
        path: 'Laboratorio',
        element: <HomeLaboratorio />
      },
      {
        path: 'busqueda-bien',
        element: <BusquedaBien />
      },
      {
        path: 'solicitudes-bien',
        element: <SolicitudesPrestamosBien />
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