
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

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarSede, ListarPeriodo, ListarHorarioPag, ListarTipoEstudio } from "../../../network/rest/idiomas.network";

import useSweerAlert from "../../../component/hooks/useSweetAlert"

import HorarioPag from "../../../model/interfaces/horario/horarioPag";
import ListasPag from "../../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../../component/Paginacion.component";
import { LoaderSvg } from "../../../component/Svg.component";
import ModalHorarioAgregar from "./modal/HorarioAgregar";
import ModalHorarioEditar from "./modal/HorarioEditar";

import ModalVerCalendario from "./modal/VerCalendario";

import { convertirFormatoFechaSql, convertirFormatoHoraSql } from '../../../helper/herramienta.helper'
import ModuloHorarioDetalle from "./HorarioDetalle";


const HorarioIdiomas = () => {

    const listaReporte = ['75247846', '41262007']
    const usuarioActual = JSON.parse(window.localStorage.getItem("codigo") || "");
    const usuarioPermitido = listaReporte.includes(usuarioActual);

    const navigate = useNavigate()

    const sweet = useSweerAlert();

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    // const [comboBoxAula, setComboBoxAula] = useState<Aula[]>([])

    const [idHorario, setIdHorario] = useState<number>(0)

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<string>("0")
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const [idAula, setIdAula] = useState<number>(0)
    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [seccion, setSeccion] = useState<string>("")

    const [estado, setEstado] = useState<number>(0)


    const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreSede, setNombreSede] = useState<string>("")
    const [nombreModalidad, setNombreModalidad] = useState<string>("")
    const [nombrePeriodo, setNombrePeriodo] = useState<string>("")
    const [nombreTipoEstudio, setNombreTipoEstudio] = useState("")


    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)


    const abortController = useRef(new AbortController());
    const abortControllerNuevo = useRef(new AbortController());
    const abortControllerEditar = useRef(new AbortController());

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);

    const [horarioLista, setHorarioLista] = useState<HorarioPag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [mensajeCarga, setMensajeCarga] = useState<boolean>(true)

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);
    const [isOpenCalendario, setIsOpenCalendario] = useState(false);

    const [moduloDetalle, setModuloDetalle] = useState(false);

    const [itemHorario, setItemHorario] = useState<HorarioPag>()

    useEffect(() => {

        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()
        LoadDataTipoEstudio()


        setMensajeCarga(true)

    }, [])

    const LoadDataIdioma = async () => {

        setComboBoxIdioma([])

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

        setComboBoxSede([])

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

        setComboBoxModalidad([])

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
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == "0") {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }


        handleOpenModal()
    }

    const EditarHorario = (horarioId: number, idiomaId: number, sedeId: string, modalidadId: number, periodoId: string, turnoId: number, programaId: number, tipEstudioId: number, estado: number, idAula: number, seccion: string) => {
        setIdHorario(horarioId)

        setIdIdioma(idiomaId)
        setIdSede(sedeId)
        setIdModalidad(modalidadId)
        setIdPeriodo(periodoId)
        setIdTurno(turnoId)
        setIdPrograma(programaId)
        setIdTipoEstudio(tipEstudioId)
        setEstado(estado)
        setSeccion(seccion)

        setIdAula(idAula)

        handleOpenModalEditar()
    }

    const VerCalendario = () => {
        handleOpenModalCalendario()
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
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == "0") {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }


        if (loading) return;

        setMensajeCarga(false)

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio);
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
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == "0") {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }
        // if (idAula == 0) {
        //     refAula.current?.focus()
        //     return
        // }

        if (loading) return;

        fillTable(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio);
    }

    const fillTable = async (idIdioma: number, idSede: string, idModalidad: number, idPeriodo: string, idTipoEstudio: number) => {
        setLoading(true)

        setHorarioLista([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await ListarHorarioPag<ListasPag>(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio, posPagina, filaPagina);
        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setHorarioLista(response.data.resultado as HorarioPag[])
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

            setHorarioLista([]);
            setLoading(false);
        }
    }


    const handleOpenModuloDetalle = (idiomaNombre: string, sedeNombre: string, modalidadNombre: string, idiomaId: number, horarioId: number, item: HorarioPag) => {
        setModuloDetalle(true)

        setNombreIdioma(idiomaNombre)
        setNombreSede(sedeNombre)
        setNombreModalidad(modalidadNombre)
        setIdIdioma(idiomaId)
        setIdHorario(horarioId)
        setIdTipoEstudio(item.tipEstudioId)

        setItemHorario(item)
    }

    const handleCloseModuloDetalle = () => {
        setModuloDetalle(false)
    }


    // Nuevo
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    // Editar
    const handleOpenModalEditar = () => {
        setIsOpenModalEditar(true);
    };

    const handleCloseModalEditar = () => {
        setIsOpenModalEditar(false);
    };

    //Calendario
    const handleOpenModalCalendario = () => {
        setIsOpenCalendario(true);
    };

    const handleCloseModalCalendario = () => {
        setIsOpenCalendario(false);
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        {
                            moduloDetalle == true ? (
                                <ModuloHorarioDetalle
                                    idHorario={idHorario}
                                    idIdioma={idIdioma}
                                    idTipoEstudio={idTipoEstudio}
                                    itemHorario={itemHorario}

                                    sweet={sweet}
                                    abortControl={abortControllerNuevo.current}
                                    handleCloseModuloDetalle={handleCloseModuloDetalle} />
                            ) : (

                                <>

                                    <ModalHorarioAgregar
                                        isOpenModal={isOpenModal}
                                        idIdioma={idIdioma}
                                        idSede={idSede}
                                        idModalidad={idModalidad}
                                        idPeriodo={idPeriodo}
                                        idTipoEstudio={idTipoEstudio}

                                        nombreIdioma={nombreIdioma}
                                        nombreSede={nombreSede}
                                        nombreModalidad={nombreModalidad}
                                        nombrePeriodo={nombrePeriodo}
                                        nombreTipoEstudio={nombreTipoEstudio}

                                        sweet={sweet}
                                        abortControl={abortControllerNuevo.current}
                                        handleCloseModal={handleCloseModal} />

                                    <ModalHorarioEditar
                                        isOpenModal={isOpenModalEditar}
                                        idHorario={idHorario}
                                        idIdioma={idIdioma}
                                        idSede={idSede}
                                        idModalidad={idModalidad}
                                        idPeriodo={idPeriodo}
                                        idTipoEstudio={idTipoEstudio}
                                        seccion={seccion}

                                        idAula={idAula}
                                        idTurno={idTurno}
                                        idPrograma={idPrograma}


                                        estado={estado}

                                        nombreIdioma={nombreIdioma}
                                        nombreSede={nombreSede}
                                        nombreModalidad={nombreModalidad}
                                        nombrePeriodo={nombrePeriodo}
                                        nombreTipoEstudio={nombreTipoEstudio}

                                        loadinit={loadInit}

                                        sweet={sweet}
                                        abortControl={abortControllerEditar.current}
                                        handleCloseModal={handleCloseModalEditar} />

                                    <ModalVerCalendario
                                        isOpenModal={isOpenCalendario}
                                        handleCloseModal={handleCloseModalCalendario}
                                    />


                                    {
                                        usuarioPermitido ? (


                                            <>

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
                                            </>


                                        ) : (

                                            <div className="p-1 bg-Solid">
                                                <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Horarios</h2>

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

                                                                    const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                                                    if (selectedSede) {
                                                                        setNombreSede(selectedSede.sede);
                                                                    } else {
                                                                        setNombreSede("");
                                                                    }
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
                                                                    setIdPeriodo(selectedPeriodoId);

                                                                    const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                                                    if (selectedPeriodo) {
                                                                        setNombrePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                                                    } else {
                                                                        setNombrePeriodo("");
                                                                    }
                                                                }}
                                                            >
                                                                <option value={"0"}>- Seleccione -</option>
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
                                                                Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                            </label>
                                                            <select
                                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                                ref={refModalidad}
                                                                value={idModalidad}
                                                                onChange={(event) => {
                                                                    const selectedModalidadId = event.currentTarget.value;
                                                                    setIdModalidad(parseInt(selectedModalidadId));

                                                                    const selectedModalidad = comboBoxModalidad.find(item => item.modalidadId === parseInt(selectedModalidadId));

                                                                    if (selectedModalidad) {
                                                                        setNombreModalidad(selectedModalidad.modalidad);
                                                                    } else {
                                                                        setNombreModalidad("");
                                                                    }
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
                                                            <div className="relative flex flex-wrap justify-between">
                                                                <button
                                                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                                    onClick={loadInit}
                                                                >
                                                                    <i className="bi bi-search mr-1"></i> BUSCAR
                                                                </button>
                                                                <button
                                                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                                                    onClick={NuevoHorario}
                                                                >
                                                                    <i className="bi bi-plus-circle-fill mr-1"></i> NUEVO
                                                                </button>
                                                                <button
                                                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-orange-500 bg-orange-500 text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-400 active:ring-orange-400"
                                                                    onClick={VerCalendario}
                                                                >
                                                                    <i className="bi bi-calendar3-week mr-1"></i> Calendario
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative overflow-auto rounded-md my-6">
                                                        <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                                            <thead className="align-bottom">
                                                                <tr>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fecha / Hora</th>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Turno</th>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Programa</th>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Seccion</th>
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
                                                                        horarioLista.length == 0 ?
                                                                            (
                                                                                <tr className="text-center bg-white border-b">
                                                                                    <td colSpan={8} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td>
                                                                                </tr>
                                                                            )
                                                                            :
                                                                            (
                                                                                horarioLista.map((item, index) => {

                                                                                    return (
                                                                                        <tr key={index} className="bg-white border-b">
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.fechaRegistra)} {convertirFormatoHoraSql(item.fechaRegistra)}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.turno}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.programa}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.aula}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.seccion}</td>
                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.estado}</td>

                                                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                                <button
                                                                                                    title="Editar"
                                                                                                    className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                                                    onClick={() => EditarHorario(item.horarioId, item.idiomaId, item.sedeId, item.modalidadId, item.periodoId, item.turnoId, item.programaId, item.tipEstudioId, item.estado, item.aulasId, item.seccion)}
                                                                                                >
                                                                                                    <i className="bi bi-pencil-fill text-sm"></i>

                                                                                                </button>
                                                                                                {" "}
                                                                                                <button
                                                                                                    title="Detalle"
                                                                                                    className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                                    onClick={() => handleOpenModuloDetalle(item.idiomaNombre, item.sede, item.modalidad, item.idiomaId, item.horarioId, item)}
                                                                                                >
                                                                                                    <i className="bi bi-list text-sm"></i>

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


                                </>

                            )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default HorarioIdiomas
