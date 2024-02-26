import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.store';

import { TrabajadorLoginRest } from '../../network/rest/service.network';

import Response from '../../model/class/response.model.class';
import RestError from '../../model/class/resterror.model.class';

import TrabajadorLogin from '../../model/interfaces/login/trabajador.login';

import { logout } from '../../store/authSlice.store';

import Contenido from "./Contenido";


const Inicio = () => {

    const dispatch = useDispatch();

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)


    const [cargando, setCargando] = useState<boolean>(true);

    const [informacion, setInformacion] = useState<TrabajadorLogin>();


    useEffect(() => {

        const load = async () => {
            if (codigo.length === 8) {
                const response = await TrabajadorLoginRest<TrabajadorLogin>(codigo);
                if (response instanceof Response) {
                    setInformacion(response.data as TrabajadorLogin);
                    setCargando(false);
                }

                if (response instanceof RestError) {
                    dispatch(logout());
                }
            }
        }

        load();

    }, []);

    return (

        <Contenido cargando={cargando} informacion={informacion} />

    )
}

export default Inicio