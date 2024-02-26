import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Idioma from "../../../model/interfaces/idioma/idioma";
import Sede from "../../../model/interfaces/sede/sede";
import Modalidad from "../../../model/interfaces/modalidad/modalidad";
import Periodo from "../../../model/interfaces/periodo/periodo";
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio";
import Asignatura from "@/model/interfaces/asignatura/asignatura";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarSede, ListarPeriodo, ListarTipoEstudio, ListarAsignatura, MatriculadosHorariosAsignaturasPag } from "../../../network/rest/idiomas.network";

import ListasPag from "../../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../../component/Paginacion.component";
import { LoaderSvg } from "../../../component/Svg.component";
import { convertirFormatoFechaSql, convertirFormatoHoraSql, convertirNumeroAMes, denominacionHorario } from "@/helper/herramienta.helper";
import RegistrarNotasGeneral from "./RegistrarNotasGeneral";
import RegistrarAsistenciaGeneral from "../asistencia/RegistrarAsistenciaGeneral";


const BuscarAulasAsignaturas = () => {

    const navigate = useNavigate()

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    const [comboBoxAsignatura, setComboBoxAsignatura] = useState<Asignatura[]>([])


    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const [idAsignatura, setIdAsignatura] = useState("0")

    const [item, setItem] = useState<number>(0)
    const [idHorarioAsig, setIdHorarioAsig] = useState<number>(0)


    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)


    const abortController = useRef(new AbortController());

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(20);

    const [listaMatriculasAsignatura, setListaMatriculasAsignatura] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [mensajeCarga, setMensajeCarga] = useState<boolean>(true)

    const [moduloRegistroNotas, setModuloRegistroNotas] = useState<boolean>(false)
    const [moduloRegistroAsistencia, setModuloRegistroAsistencia] = useState<boolean>(false)

    const [sigla, setSigla] = useState("")


    useEffect(() => {

        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()
        LoadDataTipoEstudio()

        setMensajeCarga(true)

    }, [])

    const LoadDataIdioma = async () => {

        const response = await ListarIdioma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxIdioma(response.data.resultado as Idioma[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataSede = async () => {

        const response = await ListarSede<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxSede(response.data.resultado as Sede[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataModalidad = async () => {

        const response = await ListarModalidad<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxModalidad(response.data.resultado as Modalidad[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataPeriodo = async () => {

        const response = await ListarPeriodo<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxPeriodo(response.data.resultado as Periodo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataTipoEstudio = async () => {

        const response = await ListarTipoEstudio<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataAsignatura = async (idIdioma: number) => {


        setComboBoxAsignatura([])

        const response = await ListarAsignatura<Listas>(abortController.current)
        if (response instanceof Response) {

            const data = response.data.resultado as Asignatura[]
            const filteredData = data.filter(asignatura => asignatura.idiomaId == idIdioma);

            setComboBoxAsignatura(filteredData)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    // Tabla
    const loadInit = async () => {


        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }

        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }

        if (loading) return;

        setMensajeCarga(false)

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio, idAsignatura);
    }

    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    const onEventPaginacion = () => {

        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }

        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }

        if (loading) return;

        fillTable(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio, idAsignatura);
    }

    const fillTable = async (idIdioma: number, idSede: string, idModalidad: number, idPeriodo: number, idTipoEstudio: number, idAsignatura: string) => {
        setLoading(true)

        setListaMatriculasAsignatura([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await MatriculadosHorariosAsignaturasPag<ListasPag>(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio, idAsignatura, posPagina, filaPagina);
        if (response instanceof Response) {

            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setListaMatriculasAsignatura(response.data.resultado as any[])
            setLoading(false);
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            if (response.getStatus() == 401) {
                return;
            }

            if (response.getStatus() == 403) {
                return;
            }

            setListaMatriculasAsignatura([]);
            setLoading(false);
        }
    }


    const handleOpenModuloDetalle = (item: any, idHorarioAsignatura: number, formaSigla: string) => {

        setModuloRegistroNotas(true)

        setItem(item)
        setIdHorarioAsig(idHorarioAsignatura)
        setSigla(formaSigla)

    }

    const handleCloseModuloDetalle = () => {
        setModuloRegistroNotas(false)
    }

    const handleOpenModuloAsistencia = (item: any, idHorarioAsignatura: number) => {
        setModuloRegistroAsistencia(true)

        setItem(item)
        setIdHorarioAsig(idHorarioAsignatura)
    }

    const handleCloseModuloAsistencia = () => {
        setModuloRegistroAsistencia(false)
    }


    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        {
                            (moduloRegistroNotas || moduloRegistroAsistencia) ?
                                (
                                    moduloRegistroNotas ?
                                        <RegistrarNotasGeneral
                                            item={item}
                                            idHorarioAsignatura={idHorarioAsig}
                                            sigla={sigla}
                                            handleCloseModuloDetalle={handleCloseModuloDetalle}
                                        />
                                        :
                                        <RegistrarAsistenciaGeneral
                                            item={item}
                                            idHorarioAsignatura={idHorarioAsig}
                                            handleCloseModuloAsistencia={handleCloseModuloAsistencia}
                                        />
                                ) : (
                                    <div className="p-1 bg-Solid">
                                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Buscar Aulas Asignaturas</h2>

                                        <div className="w-full">

                                            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refIdioma}
                                                        value={idIdioma}
                                                        onChange={(event) => {
                                                            const selectedIdiomaId = event.currentTarget.value;
                                                            setIdIdioma(parseInt(selectedIdiomaId));

                                                            LoadDataAsignatura(parseInt(selectedIdiomaId))
                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxIdioma.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.idiomaId}>
                                                                        {item.idiomaNombre}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Sede <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refSede}
                                                        value={idSede}
                                                        onChange={(event) => {
                                                            const selectedSedeId = event.currentTarget.value;
                                                            setIdSede(selectedSedeId);
                                                        }}
                                                    >
                                                        <option value="0">- Seleccione -</option>
                                                        {
                                                            comboBoxSede.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.sedeId}>
                                                                        {item.sede}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                        Periodo <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refPeriodo}
                                                        value={idPeriodo}
                                                        onChange={(event) => {
                                                            const selectedPeriodoId = event.currentTarget.value;
                                                            setIdPeriodo(parseInt(selectedPeriodoId));

                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxPeriodo.map((item, index) => {


                                                                return (
                                                                    <option key={index} value={item.periodoId}>
                                                                        {item.anio} - {item.mes}
                                                                    </option>
                                                                );

                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Modalidad
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refModalidad}
                                                        value={idModalidad}
                                                        onChange={(event) => {
                                                            const selectedModalidadId = event.currentTarget.value;
                                                            setIdModalidad(parseInt(selectedModalidadId));
                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxModalidad.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.modalidadId}>
                                                                        {item.modalidad}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                        Tipo Estudio
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refTipoEstudio}
                                                        value={idTipoEstudio}
                                                        onChange={(event) => {
                                                            const selectedTipoEstudioId = event.currentTarget.value;
                                                            setIdTipoEstudio(parseInt(selectedTipoEstudioId));
                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxTipoEstudio.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.tipEstudioId}>
                                                                        {item.tipoEstudio}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                        Asignatura
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        value={idAsignatura}
                                                        onChange={(event) => {

                                                            if (idIdioma == 0) {
                                                                refIdioma.current?.focus()
                                                                return
                                                            }

                                                            setIdAsignatura(event.currentTarget.value)

                                                        }}
                                                    >
                                                        <option value={"0"}>- Seleccione -</option>
                                                        {
                                                            comboBoxAsignatura.map((item, index) => {

                                                                return (
                                                                    <option key={index} value={item.asiId}>
                                                                        {item.asignatura} - {item.asiNivel}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Opciones
                                                    </label>
                                                    <div className="relative flex flex-wrap">
                                                        <button
                                                            className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                            onClick={loadInit}
                                                        >
                                                            <i className="bi bi-search mr-1"></i> BUSCAR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative overflow-auto rounded-md my-6">
                                                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                                    <thead className="align-bottom">

                                                        <tr>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sigla</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidad</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">T. Estudio</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Seccion</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Turno</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Asignatura</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Cant/Cap</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Dias</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Inicio</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Fin</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Opcion</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {

                                                            loading ? (
                                                                <tr className="text-center bg-white border-b">
                                                                    <td colSpan={15} className="text-sm p-2 border-b border-solid">
                                                                        <div className="flex items-center justify-center">
                                                                            <LoaderSvg /> <span>Cargando datos...</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                listaMatriculasAsignatura.length == 0 ?
                                                                    (
                                                                        <tr className="text-center bg-white border-b">
                                                                            <td colSpan={15} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td>
                                                                        </tr>
                                                                    )
                                                                    :
                                                                    (
                                                                        listaMatriculasAsignatura.map((item, index) => {

                                                                            let cantDias = item.cantDias
                                                                            let tipoEst = item.tipEstudioId
                                                                            let denominacionH: string | undefined

                                                                            if (tipoEst == 1 || tipoEst == 4) {
                                                                                if (cantDias == 5) {
                                                                                    denominacionH = denominacionHorario.intensivoLV.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion
                                                                                }
                                                                                if (cantDias == 2) {
                                                                                    denominacionH = denominacionHorario.intensivoSD.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion

                                                                                }
                                                                            }
                                                                            if (tipoEst == 2 || tipoEst == 3) {
                                                                                denominacionH = denominacionHorario.superintensivoLV.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion

                                                                            }

                                                                            const codAsig = item.asiId.substring(0, 3)
                                                                            const codNivel = parseInt(item.asiNivel)
                                                                            const codModalidad = item.modalidad.charAt(0);
                                                                            const codTipoEst = tipoEst == 1 ? 'I'
                                                                                : tipoEst == 2 ? 'SI'
                                                                                    : tipoEst == 4 ? 'IQ'
                                                                                        : tipoEst == 3 ? 'SIQ' : '0'

                                                                            const codDias = cantDias == 5 ? 'LV'
                                                                                : cantDias == 2 ? 'SD' : '0'

                                                                            const codPer = convertirNumeroAMes(item.mes)?.substring(0, 3);
                                                                            const codAnio = item.anio.toString().slice(-2);

                                                                            const formaSigla = `${codAsig}${codNivel}-${codModalidad}${codTipoEst}-${codDias}-${item.aula}-${denominacionH}-${codAnio}${codPer}`


                                                                            return (
                                                                                <tr key={index} className="bg-white border-b" title={` ${convertirFormatoFechaSql(item.fechaRegistra)} ${convertirFormatoHoraSql(item.fechaRegistra)} `}>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{formaSigla}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.sede}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio} - {item.mes}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tipoEstudio}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.aula}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.seccion}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.turno}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.asignatura}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.cantidad}/{item.capacidad}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.dias}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaInicio.slice(0, -3)}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaFin.slice(0, -3)}</td>
                                                                                    
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid flex justify-center gap-2">
                                                                                        <button
                                                                                            title="Listas de Estudiantes"
                                                                                            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                            onClick={() => handleOpenModuloDetalle(item, item.horarioAsigId,formaSigla)}
                                                                                        >
                                                                                            <i className="bi bi-list text-sm"></i>

                                                                                        </button>
                                                                                        {/* <button
                                                                                            title="Asistencia"
                                                                                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                                            onClick={() => handleOpenModuloAsistencia(item, item.horarioAsigId)}
                                                                                        >
                                                                                            <i className="bi bi-list-check text-sm"></i>
                                                                                        </button> */}
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    )
                                                            )

                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                                                <div>

                                                    <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span>

                                                </div>
                                                <nav className="bg-white rounded-md">
                                                    <ul className="flex">

                                                        <Paginacion
                                                            loading={loading}
                                                            restart={restart.current}
                                                            paginacion={paginacion.current}
                                                            totalPaginacion={totalPaginacion.current}
                                                            fillTable={paginacionTable}
                                                        />

                                                    </ul>
                                                </nav>
                                            </div>

                                        </div>

                                    </div>

                                )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default BuscarAulasAsignaturas
