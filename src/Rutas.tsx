import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

// Estudiante
import HomeEstudiante from './view/estudiante/HomeEstudiante';
import MatriculaInterna from './view/estudiante/matricula/MatriculaInterna';
import MatriculaExterna from './view/estudiante/matricula/MatriculaExterna';
import MatriculaHorario from './view/estudiante/matricula/MatriculaHorario';

// Trabajador
import HorarioIdiomas from './view/trabajador/horario/HorarioIdiomas';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
// import InicioDocente from './view/docente/InicioDocente';
import ListaAulas from './view/docente/notas/ListasAulas';
import ReporteNotas from './view/docente/notas/ReporteNotas';
import ListaClasesAsignados from './view/docente/ListaClasesAsignados';
import ReporteDeNotas from './view/docente/ReporteDeNotas';
import VistaHorarioDocente from './view/docente/VistaHorarioDocente';
import SubirNotas from './view/docente/SubirNotas';
import VistaHorarioEstudiante from './view/estudiante/horarios/VistaHorariosEstudiante';
import SeleccionDeIdiomas from './view/estudiante/horarios/SeleccionDeIdiomas';
import ComponenteNotas from './view/estudiante/Notas/ComponenteNotas';
import VidaAcademica from './view/estudiante/VidaAcademica';
import Consolidado from './view/estudiante/Consolidado';
import Boleta from './view/estudiante/Boleta-notas';
import Inasistencia from './view/estudiante/inasistencia';
import ResultadoPostulante from './view/estudiante/resultados-postulante';
import Reportes from './view/trabajador/horario/Reportes';
import ReportesFiltros from './view/trabajador/reporte/RepHorarioAsignatura';
import ReportesModalidad from './view/trabajador/horario/ReportesModalidad';

//Notas Trabajador
import BuscarAulasAsignaturas from './view/trabajador/nota/BuscarAulasAsignaturas'
import BuscarAulasAsignaturasExcel from './view/trabajador/nota/BuscarAulasAsignaturasExcel';

import CalendarioIdiomas from './view/trabajador/calendario/CalendarioIdiomas';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.store';



/*
const seleccionarRutas = (tipoUsuario: any) => {
  if (tipoUsuario === 'admin') {
    return rutasAdmin;
  } else if (tipoUsuario === 'est') {
    return rutasEstudiante;
  } else {
    // Si el tipo de usuario no es válido, podrías redirigir a una página de acceso denegado o hacer algo más
    return [];
  }
};


// Definir las rutas según el tipo de usuario
const rutasAdmin = [
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'centro-idiomas',
        element: <HomeEstudiante />
      },
      {
        path: 'horario-idiomas',
        element: <HorarioIdiomas />
      },
      {
        path: 'reportes',
        element: <Reportes />
      },
      {
        path: 'reportes-filtros',
        element: <ReportesFiltros />
      },
      {
        path: 'buscar-aulas-asignaturas',
        element: <BuscarAulasAsignaturas />
      },
      {
        path: 'buscar-aulas-asignaturas-excel',
        element: <BuscarAulasAsignaturasExcel />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
];

const rutasEstudiante = [
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'centro-idiomas',
        element: <HomeEstudiante />
      },
      {
        path: 'matricula-interna',
        element: <MatriculaInterna />
      },
      {
        path: '*',
        element: <Navigate to="centro-idiomas" replace />
      },
    ]
  },
];

const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)

// Crear las rutas según el tipo de usuario
const rutas = seleccionarRutas(tipoUsuario);
// Crear el navegador de rutas
const router = createBrowserRouter([
  // Otras rutas que siempre están disponibles
  {
    path: '/inicio',
    element: <Navigate to="centro-idiomas" replace />
  },
  {
    path: '/',
    element: <Navigate to="centro-idiomas" replace />,
  },
  // ... otras rutas generales

  // Rutas dinámicas según el tipo de usuario
  ...rutas,

  // Rutas que siempre están disponibles
  {
    path: 'acceso',
    element: <Acceso />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
  {
    path: 'notas',
    element: <ComponenteNotas />,
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
]);

export default router;
*/

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
        element: <HomeEstudiante />
      },
      {
        path: 'vista-horario-estudiante',
        element: <VistaHorarioEstudiante />
      },
      {
        path: 'seleccion-idioma',
        element: <SeleccionDeIdiomas />
      },
      {
        path: 'matricula-interna',
        element: <MatriculaInterna />
      },
      {
        path: 'vida-academica',
        element: <VidaAcademica />
      },
      {
        path: 'matricula-externa',
        element: <MatriculaExterna />
      },
      {
        path: 'consolidado',
        element: <Consolidado />
      },
      {
        path: 'boleta-notas',
        element: <Boleta />
      },
      {
        path: 'inasistencia',
        element: <Inasistencia />
      },
      {
        path: 'resultados-postulante',
        element: <ResultadoPostulante />
      },

      {
        path: 'horario',
        element: <MatriculaHorario />
      },


      {
        path: 'reportes',
        element: <Reportes />
      },
      {
        path: 'reportes-filtros',
        element: <ReportesFiltros />
      },
      {
        path: 'reportesModalidad',
        element: <ReportesModalidad />
      },

      {
        path: 'horario-idiomas',
        element: <HorarioIdiomas />
      },

      {
        path: 'clases-asignadas',
        element: <ListaClasesAsignados />
      },
      {
        path: 'notas-reporte-subir',
        element: <ReporteNotas />
      },
      {
        path: 'reporte-notas',
        element: <ReporteDeNotas />
      },
      {
        path: 'vista-horario',
        element: <VistaHorarioDocente />
      },
      {
        path: 'subir-notas',
        element: <SubirNotas />
      },
      {
        path: 'lista-aulas',
        element: <ListaAulas />
      },
      {
        path: 'buscar-aulas-asignaturas',
        element: <BuscarAulasAsignaturas />
      },
      {
        path: 'buscar-aulas-asignaturas-excel',
        element: <BuscarAulasAsignaturasExcel />
      },
      {
        path:'calendario',
        element: <CalendarioIdiomas/>
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
    path: 'notas',
    element: <ComponenteNotas />
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
])
export default router;


/*
import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

// Obtener el tipo de usuario del localStorage
const tipoUsuario = localStorage.getItem('tipoUsuario');
const tipoUser = window.localStorage.getItem("tipoUsuario")?.replace(/"/g, '');

// Definir las rutas según el tipo de usuario
const rutasAdmin = [
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
        element: <HomeEstudiante />
      },
      {
        path: 'horario-idiomas',
        element: <HorarioIdiomas />
      },
      {
        path: 'reportes',
        element: <Reportes />
      },
      {
        path: 'reportes-filtros',
        element: <ReportesFiltros />
      },
      {
        path: 'buscar-aulas-asignaturas',
        element: <BuscarAulasAsignaturas />
      },
      {
        path: 'buscar-aulas-asignaturas-excel',
        element: <BuscarAulasAsignaturasExcel />
      },
    ]
  }
];

const rutasEstudiante = [
  {
    path: '/inicio',
    element: <Navigate to="centro-idiomas" replace />
  },
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        path: 'matricula-interna',
        element: <MatriculaInterna />
      },
    ]
  }
];

// Función para seleccionar las rutas según el tipo de usuario
const seleccionarRutas = (tipoUsuario) => {
  if (tipoUsuario === 'administrador') {
    return rutasAdmin;
  } else if (tipoUsuario === 'estudiante') {
    return rutasEstudiante;
  } else {
    // Si el tipo de usuario no es válido, podrías redirigir a una página de acceso denegado o hacer algo más
    return [];
  }
};

// Crear las rutas según el tipo de usuario
const rutas = seleccionarRutas(tipoUsuario);

// Crear el navegador de rutas
const router = createBrowserRouter([
  // Otras rutas que siempre están disponibles
  {
    path: '/inicio',
    element: <Navigate to="centro-idiomas" replace />,
  },
  // ... otras rutas generales

  // Rutas dinámicas según el tipo de usuario
  ...rutas,

  // Rutas que siempre están disponibles
  {
    path: 'acceso',
    element: <Acceso />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: 'notas',
    element: <ComponenteNotas />,
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
]);

export default router;
*/