import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVICES_API_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
});

export async function LoginRest<Login>(params: object, signal = null): Promise<Response<Login> | RestError> {
    return await Resolve.create<Login>(instance.post<Login>("/Login", params, { signal: signal! }));
}

export async function EstudianteLoginRest<EstudianteLogin>(codigo: string, signal = null): Promise<Response<EstudianteLogin> | RestError> {
    return await Resolve.create<EstudianteLogin>(instance.get<EstudianteLogin>("/MostrarFacultad/" + codigo, { signal: signal! }));
}

export async function TrabajadorLoginRest<TrabajadorLogin>(dni: string, signal = null): Promise<Response<TrabajadorLogin> | RestError> {
    return await Resolve.create<TrabajadorLogin>(instance.get<TrabajadorLogin>("/Soporte/obtenerDatosTrabajadorPorDni/" + dni, { signal: signal! }));
}

export async function ValidarTokenRest<Void>(signal = null): Promise<Response<Void> | RestError> {
    return await Resolve.create<Void>(instance.get<Void>("/Aplicacion/validarToken", { signal: signal! }));
}

