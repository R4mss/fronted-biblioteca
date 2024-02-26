import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_RUC_DNI,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    config.headers.key = apiKey;
    return config;
});

export async function ConsultarRuc<RucEmpresa>(ruc: string, signal = null): Promise<Response<RucEmpresa> | RestError> {
    return await Resolve.create<RucEmpresa>(instance.get<RucEmpresa>("/ruc/" + ruc, { signal: signal! }));
}

export async function ConsultarDni<DniPersona>(dni: string, signal = null): Promise<Response<DniPersona> | RestError> {
    return await Resolve.create<DniPersona>(instance.get<DniPersona>("/dni/" + dni, { signal: signal! }));
}