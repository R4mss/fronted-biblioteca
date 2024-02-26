import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CENTRO_IDIOMAS_API_APP,
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


export async function ValidarTokenRest<Void>(signal = null): Promise<Response<Void> | RestError> {
    return await Resolve.create<Void>(instance.get<Void>("/Aplicacion/validarToken", { signal: signal! }));
}



export async function ListarIdioma<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Idioma/ListarIdioma", { signal: abortController?.signal }));
}

export async function ListarSede<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Sede/ListarSede", { signal: abortController?.signal }));
}

export async function ListarModalidad<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Modalidad/ListarModalidad", { signal: abortController?.signal }));
}

export async function ListarPrograma<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Programa/ListarPrograma", { signal: abortController?.signal }));
}

export async function ListarTurno<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Turno/ListarTurno", { signal: abortController?.signal }));
}

export async function ListarPeriodo<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Periodo/ListarPeriodo", { signal: abortController?.signal }));
}

export async function ListarTipoEstudio<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/TipoEstudio/ListarTipoEstudio", { signal: abortController?.signal }));
}

export async function ListarAula<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Aula/ListarAula", { signal: abortController?.signal }));
}

export async function ListarSeccion<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Seccion/ListarSeccion", { signal: abortController?.signal }));
}


//Horario
export async function ListarHorarioPag<ListasPag>(IdiomaId: number, SedeId: string, ModalidadId: number, PeriodoId: string, TipEstudioId: number, posPagina: number, filaPagina: number, abortController: AbortController | null = null): Promise<Response<ListasPag> | RestError> {
    return await Resolve.create(instance.get<ListasPag>(`/Horario/ListarHorarioPag/${IdiomaId}/${SedeId}/${ModalidadId}/${PeriodoId}/${TipEstudioId}/${posPagina}/${filaPagina}`, { signal: abortController?.signal }));
}

export async function ListarHorarioDetalleId<Listas>(HorarioId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create(instance.get<Listas>(`/Horario/ListarHorarioDetalleId/${HorarioId}`, { signal: abortController?.signal }));
}

export async function InsertarActualizarHorario<RespValue>(mode: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarActualizarHorario/${mode} `, params, { signal: abortController?.signal }));
}

export async function InsertarActualizarHorarioDetalle<RespValue>(mode: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarActualizarHorarioDetalle/${mode} `, params, { signal: abortController?.signal }));
}

export async function InsertarHorarioAsignatura<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarHorarioAsignatura`, params, { signal: abortController?.signal }));
}

////
export async function ActualizarHorarioAsignatura<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/ActualizarHorarioAsignatura`, params, { signal: abortController?.signal }));
}


export async function InsertarHorarioDetalle<RespValue>(params: object[], abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarHorarioDetalle/`, params, { signal: abortController?.signal }));
}

export async function ActualizarHorarioDetalle<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/ActualizarHorarioDetalle/`, params, { signal: abortController?.signal }));
}
/////////////////////

export async function ListarHorarioDisponibleEst<Listas>(EstudianteId: string, AsiId: string, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create(instance.get<Listas>(`/Horario/ListarHorariosDisponiblesEst/${EstudianteId}/${AsiId}`, { signal: abortController?.signal }));
}


// Asignatura

export async function ListarAsignatura<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Asignatura/ListarAsignatura", { signal: abortController?.signal }));
}

export async function ListarAsignaturaPreMatriculaEstudiante<Listas>(EstudianteId: string, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create(instance.get<Listas>(`/Asignatura/ListarAsignaturaPreMatriculaEstudiante/${EstudianteId}`, { signal: abortController?.signal }));
}


// Estudiante

export async function ValidarEstudianteExistente<RespValue>(codigo: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>("/Estudiante/ValidarEstudianteExistente/" + codigo, { signal: signal! }));
}

export async function InsertarDatosEstudiantePrimerLogin<RespValue>(EstudianteId: string, IdiomaId: number, ProgramaId: number, ModalidadId: number, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post<RespValue>(`/Estudiante/InsertarDatosEstudiantePrimerLogin/${EstudianteId}/${IdiomaId}/${ProgramaId}/${ModalidadId}`, { signal: signal! }));
}

export async function EstudianteHorariosMatriculados<Listas>(HorarioAsigId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Estudiante/EstudianteHorariosMatriculados/${HorarioAsigId}`, { signal: abortController?.signal }));
}

export async function RegistroMatriculasEstudianteId<Listas>(EstudianteId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Estudiante/RegistroMatriculasEstudianteId/${EstudianteId}`, { signal: abortController?.signal }));
}

// Docente

export async function ListarDocenteIdiomasBusqueda<Listas>(busqueda: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarDocenteIdiomasBusqueda/${busqueda}`, { signal: abortController?.signal }));
}


// Pago
export async function PagadoMatriculaLista<Listas>(EstudianteId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Pago/PagoMatriculaLista/${EstudianteId}`, { signal: abortController?.signal }));
}

export async function PagadoPensionLista<Listas>(EstudianteId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Pago/PagoPensionLista/${EstudianteId}`, { signal: abortController?.signal }));
}


// Matricula
export async function ValidarMatriculaExistente<RespValue>(EstudianteId: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>(`/Matricula/ValidarMatriculaExistente/${EstudianteId}`, { signal: signal! }));
}

export async function CiclosMatriculablesIdiomas<Listas>(EstudianteId: string, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create(instance.get<Listas>(`/Matricula/CiclosMatriculablesIdiomas/${EstudianteId}`, { signal: abortController?.signal }));
}

export async function ValidezMatriculaMeses<RespValue>(EstudianteId: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>(`/Matricula/ValidezMatriculaMeses/${EstudianteId}`, { signal: signal! }));
}

export async function InsertarMatricula<RespValue>(TipEstId: number, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post<RespValue>(`/Matricula/InsertarMatricula/${TipEstId}`, params, { signal: abortController?.signal }));
}

export async function InsertarMatriculaDetalle<RespValue>(estudianteId: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post<RespValue>(`/Matricula/InsertarMatriculaDetalle/${estudianteId}`, params, { signal: abortController?.signal }));
}

export async function MatriculaExistentePeriodo<RespValue>(estudianteId: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>(`/Matricula/MatriculaExistentePeriodo/${estudianteId}`, { signal: signal! }));
}

export async function AsignaturasMatriculadosEstudiante<Listas>(estudianteId: string, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Matricula/AsignaturasMatriculadosEstudiante/${estudianteId}`, { signal: signal! }));
}

export async function ExistenteMatriculaPeriodoTipoEstudio<Listas>(estudianteId: string, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Matricula/ExistenteMatriculaPeriodoTipoEstudio/${estudianteId}`, { signal: signal! }));
}
//
export async function InsertarMatriculaSegundoCuarto<RespValue>(estudianteId: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post<RespValue>(`/Matricula/InsertarMatriculaSegundoCuarto/${estudianteId}`, params, { signal: abortController?.signal }));
}

// Notas
export async function MatriculadosHorariosAsignaturasPag<ListasPag>(idiomaId: number, sedeId: string, modalidadId: number, periodoId: number, tipEstudioId: number, asiId:string, posPagina: number, filaPagina: number, abortController: AbortController | null = null): Promise<Response<ListasPag> | RestError> {
    return await Resolve.create(instance.get<ListasPag>(`/Nota/MatriculadosHorariosAsignaturasPag/${idiomaId}/${sedeId}/${modalidadId}/${periodoId}/${tipEstudioId}/${asiId}/${posPagina}/${filaPagina}`, { signal: abortController?.signal }));
}

export async function ListarPreRegistroNotas<Listas>(HorarioAsigId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Nota/ListarPreRegistroNotas/${HorarioAsigId}`, { signal: abortController?.signal }));
}

export async function InsertarNotasHorarioAsignatura<RespValue>(codigo: string, params: object[], abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Nota/InsertarNotasHorarioAsignatura/${codigo}`, params, { signal: abortController?.signal }));
}

export async function ActualizarNotaIndividual<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Nota/ActualizarNotaIndividual`, params, { signal: abortController?.signal }));
}

export async function NotasEstudianteDetMatriculaId<Listas>(DetMatriculaId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Nota/NotasEstudianteDetMatriculaId/${DetMatriculaId}`, { signal: abortController?.signal }));
}

export async function NotaFinalEstudianteDetMatriculaId<RespValue>(DetMatriculaId: number, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.get<RespValue>(`/Nota/NotaFinalEstudianteDetMatriculaId/${DetMatriculaId}`, { signal: abortController?.signal }));
}


//Asistencia
export async function ListarPreRegistroAsistencia<Listas>(HorarioAsigId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Asistencia/ListarPreRegistroAsistencia/${HorarioAsigId}`, { signal: abortController?.signal }));
}

export async function InsertarAsistenciaHorarioAsignaturaFecha<RespValue>(codigo: string, params: object[], abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Asistencia/InsertarAsistenciaHorarioAsignaturaFecha/${codigo}`, params, { signal: abortController?.signal }));
}

export async function InsertarAsistenciaHorarioEspecifico<RespValue>(codigo: string, params: object[], abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Asistencia/InsertarAsistenciaHorarioAsignaturaFecha/${codigo}`, params, { signal: abortController?.signal }));
}

// Calendario
export async function RangoMatriculaCalendario<Listas>(signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Calendario/RangoMatriculaCalendario`, { signal: signal! }));
}

export async function ListarCalendariosActivos<Listas>(signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Calendario/ListarCalendariosActivos`, { signal: signal! }));
}

export async function ListarCalendarioFiltrosPag<ListasPag>(IdiomaId: number, PeriodoId: number, TipEstudioId: number, posPagina: number, filaPagina: number, abortController: AbortController | null = null): Promise<Response<ListasPag> | RestError> {
    return await Resolve.create(instance.get<ListasPag>(`/Calendario/ListarCalendarioFiltrosPag/${IdiomaId}/${PeriodoId}/${TipEstudioId}/${posPagina}/${filaPagina}`, { signal: abortController?.signal }));
}

export async function InsertarCalendarioPeriodo<RespValue>(codigo: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Calendario/InsertarCalendarioPeriodo/${codigo}`, params, { signal: abortController?.signal }));
}

export async function ActualizarCalendarioPeriodo<RespValue>(codigo: string, calendarioId: number, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Calendario/ActualizarCalendarioPeriodo/${codigo}/${calendarioId}`, params, { signal: abortController?.signal }));
}



// Reportes
export async function ReporteMatricula<Listas>(abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Matricula/ReporteMatricula`, { signal: abortController?.signal }));
}

export async function ReporteHorarioAsignatura<Listas>(idiomaId: number, sedeId: string, modalidadId: number, periodoId: number, tipEstudioId: number, idAsignatura: string, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteHorarioAsignatura/${idiomaId}/${sedeId}/${modalidadId}/${periodoId}/${tipEstudioId}/${idAsignatura}`, { signal: abortController?.signal }));
}

export async function ReporteMatriculadosXHorarioAsigId<Listas>(HorarioAsigId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteMatriculadosXHorarioAsigId/${HorarioAsigId}`, { signal: abortController?.signal }));
}

// export async function ReporteMatricula<ListasPag>(IdiomaId: number, SedeId: string, ModalidadId: number, PeriodoId: string, TipEstudioId: number, posPagina:number, filaPagina:number, abortController: AbortController | null = null): Promise<Response<ListasPag> | RestError> {
//     return await Resolve.create(instance.get<ListasPag>(`/Matricula/ReporteMatricula/${IdiomaId}/${SedeId}/${ModalidadId}/${PeriodoId}/${TipEstudioId}/${posPagina}/${filaPagina}`, { signal: abortController?.signal }));
// }











