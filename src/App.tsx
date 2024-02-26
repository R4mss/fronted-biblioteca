import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.store';
import Cargar from './view/cargar/Cargar';

import router from './Rutas';

function App() {

    const cargando = useSelector((state: RootState) => state.autenticacion.cargando);

    if (cargando) {
        return <Cargar />;
    }

    return (

        <RouterProvider router={router} />

    );

}

export default App