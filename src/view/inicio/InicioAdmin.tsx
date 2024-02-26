import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.store';

import { EstudianteLoginRest, TrabajadorLoginRest } from '../../network/rest/services.network';
import { ValidarEstudianteExistente } from '../../network/rest/idiomas.network';

import Response from '../../model/class/response.model.class';
import RestError from '../../model/class/resterror.model.class';
import RespValue from '../../model/interfaces/RespValue.model.interface';

import EstudianteLogin from '../../model/interfaces/login/estudiante.login';
import TrabajadorLogin from '../../model/interfaces/login/trabajador.login';

import { logout } from '../../store/authSlice.store';

import Contenido from "./Contenido";
import PrimerLogin from "./PrimerLogin";


const InicioAdmin = () => {

    const dispatch = useDispatch();

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [primerLogin, setPrimerLogin] = useState<boolean>(false);

    const [infoPrimerLogin, setInfoPrimerLogin] = useState<EstudianteLogin>();

    const [cargando, setCargando] = useState<boolean>(true);

    const [informacion, setInformacion] = useState<EstudianteLogin | TrabajadorLogin>();


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
            } else {
                const response = await EstudianteLoginRest<EstudianteLogin>(codigo);
                if (response instanceof Response) {
                    setInformacion(response.data as EstudianteLogin);
                    setInfoPrimerLogin(response.data as EstudianteLogin);
                    setCargando(false);

                    validarPrimerLogin(codigo)
                }

                if (response instanceof RestError) {
                    dispatch(logout());
                }
            }
        }

        load();

    }, []);

    const validarPrimerLogin = async (codigo: string) => {

        const validar = await ValidarEstudianteExistente<RespValue>(codigo)

        if (validar instanceof Response) {
            if (validar.data.value == codigo) {
                setPrimerLogin(false)
                //console.log('existe')
            } else {
                setPrimerLogin(true)
                //console.log('no existe')
            }
        }
        if (validar instanceof RestError) {
            console.log(validar.getMessage())
        }
    }

    return (

        <Contenido cargando={cargando} informacion={informacion} />

    )
}

export default InicioAdmin