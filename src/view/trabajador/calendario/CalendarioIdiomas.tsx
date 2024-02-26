
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

//import Idioma from "../../../model/interfaces/idioma/idioma";
import Periodo from "../../../model/interfaces/periodo/periodo";
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarPeriodo, ListarTipoEstudio, ListarCalendarioFiltrosPag } from "../../../network/rest/idiomas.network";

import ListasPag from "../../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../../component/Paginacion.component";
import { LoaderSvg } from "../../../component/Svg.component";

import { convertirFormatoFechaSql, convertirNumeroAMes } from '../../../helper/herramienta.helper'
import CalendarioPag from "@/model/interfaces/calendario/calendarioPag";
import InsertarCalendario from "./modal/InsertarCalendario";
import EditarCalendario from "./modal/EditarCalendario";
import toast from "react-hot-toast";

type FechasCalendario = {
    f_cal_ini: string
    f_cal_fin: string
    f_mat_ini: string
    f_mat_fin: string
    f_asigHora_ini: string
    f_asigHora_fin: string
    f_clases_ini: string
    f_clases_fin: string
    f_nota_ini: string
    cal_activo: number
}

const CalendarioIdiomas = () => {

    const listaReporte = ['75247846', '41262007']
    const usuarioActual = JSON.parse(window.localStorage.getItem("codigo") || "");
    const usuarioPermitido = listaReporte.includes(usuarioActual);

    const navigate = useNavigate()

    //const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    // const [comboBoxAula, setComboBoxAula] = useState<Aula[]>([])

    const [idIdioma, setIdIdioma] = useState<number>(1)
    const [idCalendario, setIdCalendario] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)
    const [valuePeriodo, SetValuePeriodo] = useState<string>("-")

    //const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreTipoEstudio, setNombreTipoEstudio] = useState("")

    const [editarIdPeriodo, setEditarIdPeriodo] = useState<number>(0)
    const [editarIdTipoEstudio, setEditarIdTipoEstudio] = useState<number>(0)
    const [editarNombrePeriodo, setEditarNombrePeriodo] = useState("")
    const [editarNombreTipoEstudio, setEditarNombreTipoEstudio] = useState("")

    const refIdioma = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)

    const abortController = useRef(new AbortController());

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);

    const [calendarioLista, setCalendarioLista] = useState<CalendarioPag[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [mensajeCarga, setMensajeCarga] = useState<boolean>(true)

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState<boolean>(false);
    const [datosEditar, setDatosEditar] = useState<FechasCalendario | null>(null)

    useEffect(() => {
        //LoadDataIdioma()
        LoadDataPeriodo()
        LoadDataTipoEstudio()
        setMensajeCarga(true)
    }, [])

    /*const LoadDataIdioma = async () => {

        setComboBoxIdioma([])

        const response = await ListarIdioma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxIdioma(response.data.resultado as Idioma[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }*/

    const LoadDataPeriodo = async () => {

        setComboBoxPeriodo([])

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

        setComboBoxTipoEstudio([])

        const response = await ListarTipoEstudio<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const NuevoHorario = () => {
        if (idIdioma == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refIdioma.current?.focus();
            return
        }
        if (idPeriodo == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refTipoEstudio.current?.focus()
            return
        }
        handleOpenModal()
    }


    // Tabla
    const loadInit = async () => {

        /*if (idIdioma == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refIdioma.current?.focus();
            return
        }

        if (idPeriodo == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refPeriodo.current?.focus();
            return
        }

        if (idTipoEstudio == 0) {
            toast.error("Tiene que seleccionar todos los campos")
            refTipoEstudio.current?.focus();
            return
        }*/

        if (loading) return;

        setMensajeCarga(false)

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idPeriodo, idTipoEstudio);
    }

    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    const onEventPaginacion = () => {

        if (loading) return;

        fillTable(idIdioma, idPeriodo, idTipoEstudio);
    }


    const fillTable = async (idIdioma: number, idPeriodo: number, idTipoEstudio: number) => {

        setLoading(true)

        setCalendarioLista([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await ListarCalendarioFiltrosPag<ListasPag>(idIdioma, idPeriodo, idTipoEstudio, posPagina, filaPagina);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setCalendarioLista(response.data.resultado as CalendarioPag[])
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

            setCalendarioLista([]);
            setLoading(false);
        }
    }


    /*const handleOpenModuloDetalle = (idiomaNombre: string, idiomaId: number, horarioId: number, item: HorarioPag) => {
        setNombreIdioma(idiomaNombre)
        setIdIdioma(idiomaId)
        setIdHorario(horarioId)
        setIdTipoEstudio(item.tipEstudioId)
    }*/

    // Nuevo
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    // Editar
    const handleOpenModalEditar = (idiomaId: number, idCalendario: number, tipEstudioId: number, periodoId: number, nombrePeriodo: string, nombreTipoEstudio: string, fechas: FechasCalendario) => {
        setEditarIdPeriodo(periodoId)
        setIdCalendario(idCalendario)
        setIdIdioma(idiomaId)
        setEditarIdTipoEstudio(tipEstudioId)
        setDatosEditar(fechas)
        setEditarNombrePeriodo(nombrePeriodo)
        setEditarNombreTipoEstudio(nombreTipoEstudio)
    
        setIsOpenModalEditar(true)
    }

    const handleCloseModalEditar = () => {
        setIsOpenModalEditar(false);
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        <InsertarCalendario
                            idiomaId={idIdioma}
                            periodoId={idPeriodo}
                            tipoEstudioId={idTipoEstudio}
                            valuePeriodo={valuePeriodo}
                            //nombreIdioma={nombreIdioma}
                            nombreTipoEstudio={nombreTipoEstudio}
                            show={isOpenModal}
                            hide={handleCloseModal}
                            init={loadInit}
                        />

                        <EditarCalendario
                            calendarioId={idCalendario}
                            idiomaId={idIdioma}
                            periodoId={editarIdPeriodo}
                            tipoEstudioId={editarIdTipoEstudio}
                            valuePeriodo={editarNombrePeriodo}
                            //nombreIdioma={nombreIdioma}
                            nombreTipoEstudio={editarNombreTipoEstudio}
                            fechas={datosEditar}
                            show={isOpenModalEditar}
                            hide={handleCloseModalEditar}
                            init={loadInit}
                        />
                        {
                            usuarioPermitido ? (
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">
                                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                        <div className="m-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                                <div className="text-sm">
                                                    <p>No tiene permisos para este modulo</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <div className="p-1 bg-Solid">
                                    <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro Calendario</h2>

                                    <div className="w-full">

                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
                                            {/*<div>
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

                                                        const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                                        if (selectedIdioma) {
                                                            setNombreIdioma(selectedIdioma.idiomaNombre);
                                                        } else {
                                                            setNombreIdioma("");
                                                        }
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
                                            </div>*/}

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

                                                        const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                                        if (selectedPeriodo) {
                                                            SetValuePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                                        } else {
                                                            SetValuePeriodo("-");
                                                        }
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
                                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                    Tipo Estudio <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                </label>
                                                <select
                                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                    ref={refTipoEstudio}
                                                    value={idTipoEstudio}
                                                    onChange={(event) => {
                                                        const selectedTipoEstudioId = event.currentTarget.value;
                                                        setIdTipoEstudio(parseInt(selectedTipoEstudioId));

                                                        const selectedTipoEstudio = comboBoxTipoEstudio.find(item => item.tipEstudioId.toString() === selectedTipoEstudioId);

                                                        if (selectedTipoEstudio) {
                                                            setNombreTipoEstudio(`${selectedTipoEstudio.tipoEstudio}`);
                                                        } else {
                                                            setNombreTipoEstudio("");
                                                        }
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
                                                <label
                                                    className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                >
                                                    Opciones
                                                </label>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400 gap-2"
                                                        onClick={loadInit}
                                                    >
                                                        <i className="bi bi-search" /> BUSCAR
                                                    </button>
                                                    <button
                                                        className="flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400 gap-2"
                                                        onClick={NuevoHorario}
                                                    >
                                                        <i className="bi bi-plus-circle-fill" /> NUEVO
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative overflow-auto rounded-md my-6">
                                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                                <thead className="align-bottom">
                                                    <tr>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Año</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">T. Estudio</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">
                                                            <div className="flex flex-col gap-2">
                                                                <span>Proceso</span>
                                                                <span>Inicio - Fin</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">
                                                            <div className="flex flex-col gap-2">
                                                                <span>Matrícula</span>
                                                                <span>Inicio - Fin</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">
                                                            <div className="flex flex-col gap-2">
                                                                <span>Clases</span>
                                                                <span>Inicio - Fin</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">
                                                            <div className="flex flex-col gap-2">
                                                                <span>Notas</span>
                                                                <span>Inicio - Fin</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Estado</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Opciones</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {

                                                        loading ? (
                                                            <tr className="text-center bg-white border-b">
                                                                <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                                                    <div className="flex items-center justify-center">
                                                                        <LoaderSvg /> <span>Cargando datos...</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            calendarioLista.length == 0 ?
                                                                (
                                                                    <tr className="text-center bg-white border-b">
                                                                        <td colSpan={9} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td>
                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    calendarioLista.map((item, index) => {

                                                                        return (
                                                                            <tr key={index} className="bg-white border-b">
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio + ' - ' + convertirNumeroAMes(item.mes)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tipoEstudio}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_cal_ini)} - {convertirFormatoFechaSql(item.f_cal_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_mat_ini)} - {convertirFormatoFechaSql(item.f_mat_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_clases_ini)} - {convertirFormatoFechaSql(item.f_clases_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_nota_ini)} - {/*convertirFormatoFechaSql(item.f_nota_ini)*/}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                    {
                                                                                        item.cal_activo ?
                                                                                            <span className="text-xs font-semibold p-1 px-2 bg-green-500 text-white rounded">
                                                                                                Activo
                                                                                            </span> :
                                                                                            <span className="text-xs font-semibold p-1 px-2 bg-red-500 text-white rounded">
                                                                                                INACTIVO
                                                                                            </span>
                                                                                    }
                                                                                </td>

                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                    <button
                                                                                        title="Editar"
                                                                                        className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                                        onClick={() => handleOpenModalEditar(item.idiomaId, item.calendarioId, item.tipEstudioId, item.periodoId, item.anio + ' - ' + item.mes, item.tipoEstudio,
                                                                                            {
                                                                                                f_cal_ini: item.f_cal_ini,
                                                                                                f_cal_fin: item.f_cal_fin,
                                                                                                f_mat_ini: item.f_mat_ini,
                                                                                                f_mat_fin: item.f_mat_fin,
                                                                                                f_asigHora_ini: item.f_asigHora_ini,
                                                                                                f_asigHora_fin: item.f_asigHora_fin,
                                                                                                f_clases_ini: item.f_clases_ini,
                                                                                                f_clases_fin: item.f_clases_fin,
                                                                                                f_nota_ini: item.f_nota_ini,
                                                                                                cal_activo: item.cal_activo
                                                                                            }
                                                                                        )}
                                                                                    >
                                                                                        <i className="bi bi-pencil-fill text-sm"></i>

                                                                                    </button>
                                                                                    {" "}
                                                                                    <button
                                                                                        title="Detalle"
                                                                                        className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                    //onClick={() => handleOpenModuloDetalle(item.idiomaNombre, item.sede, item.modalidad, item.idiomaId, item.horarioId, item)}
                                                                                    >
                                                                                        <i className="bi bi-calendar4-week text-sm"></i>

                                                                                    </button>
                                                                                    {" "}
                                                                                    {/* <button
                                                                                            title="Borrar"
                                                                                            className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md px-2 py-1"
                                                                
                                                                                        >
                                                                                            <i className="bi bi-trash3-fill text-sm"></i>
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

export default CalendarioIdiomas
