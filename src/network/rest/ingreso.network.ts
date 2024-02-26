// import axios from 'axios';
// import Response from '../../model/class/response.model.class';
// import Resolve from '../../model/class/resolve.model.class';
// import RestError from '../../model/class/resterror.model.class';
//import Data from '../../model/interfaces/ingreso/data.model.interface';

// const instance = axios.create({
//     baseURL: import.meta.env.VITE_SERVICES_API_APP,
//     timeout: 10000,
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     }
// });

// instance.interceptors.request.use((config) => {
//     const storage = window.localStorage as Storage;
//     const token = storage.getItem('token');
//     if (token !== null) {
//         config.headers.Authorization = 'Bearer ' + JSON.parse(token);
//     }
//     return config;
// });

// export async function BuscarIngresoPersona<Responde>(data: Data, abortController: AbortController | null = null): Promise<Response<Responde> | RestError> {
//     if(abortController){}
//     return await Resolve.create<Responde>(instance.post<Responde>("/buscareingresopersona", data));
// }