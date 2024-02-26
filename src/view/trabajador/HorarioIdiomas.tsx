
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";

import Idioma from "../../model/interfaces/idioma/idioma";
import Sede from "../../model/interfaces/sede/sede";
import Modalidad from "../../model/interfaces/modalidad/modalidad";
import Turno from "../../model/interfaces/turno/turno";
import Programa from "../../model/interfaces/programa/programa";
import Periodo from "../../model/interfaces/periodo/periodo";
import TipoEstudio from "../../model/interfaces/tipo-estudio/tipoEstudio";

import Listas from "../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarPeriodo, ListarPrograma, ListarSede, ListarTipoEstudio, ListarTurno } from "../../network/rest/idiomas.network";
import CustomModal from "../../component/Modal.component";

const HorarioIdiomas = () => {

    const navigate = useNavigate()

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);

    const [idIdioma, setIdIdioma] = useState<string>("0")
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)

    const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreSede, setNombreSede] = useState<string>("")
    const [nombreModalidad, setNombreModalidad] = useState<string>("")

    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)

    const abortController = useRef(new AbortController());

    //Modal
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [comboBoxTurno, setComboBoxTurno] = useState<Turno[]>([])
    const [comboBoxPrograma, setComboBoxPrograma] = useState<Programa[]>([])
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])

    // const [idTurno, setIdTurno] = useState<number>(0)
    // const [idPrograma, setIdPrograma] = useState<number>(0)
    // const [idPeriodo, setIdPeriodo] = useState<number>(0)
    // const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const refTurno = useRef<HTMLSelectElement>(null)
    const refPrograma = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)

    const [estado, setEstado] = useState<boolean>(true)

    const anioActual = new Date().getFullYear();

    const abortControllerModal = useRef(new AbortController());

    useEffect(() => {
        DataIdioma()
        DataSede()
        DataModalidad()
    }, [])

    const DataIdioma = async () => {

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

    const DataSede = async () => {

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

    const DataModalidad = async () => {

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

    const NuevoHorario = () => {
        if (idIdioma == "0") {
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

        handleOpenModal()
    }

    //Modal

    const handleOpenModal = () => {
        setIsOpenModal(true);

        DataTurno()
        DataPrograma()
        DataPeriodo()
        DataTipoEstudio()

        //console.log(estado)
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const DataTurno = async () => {

        setComboBoxTurno([])

        const response = await ListarTurno<Listas>(abortControllerModal.current)
        if (response instanceof Response) {
            setComboBoxTurno(response.data.resultado as Turno[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const DataPrograma = async () => {

        setComboBoxPrograma([])

        const response = await ListarPrograma<Listas>(abortControllerModal.current)
        if (response instanceof Response) {
            setComboBoxPrograma(response.data.resultado as Programa[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const DataPeriodo = async () => {

        setComboBoxPeriodo([])

        const response = await ListarPeriodo<Listas>(abortControllerModal.current)
        if (response instanceof Response) {
            setComboBoxPeriodo(response.data.resultado as Periodo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const DataTipoEstudio = async () => {

        setComboBoxTipoEstudio([])

        const response = await ListarTipoEstudio<Listas>(abortControllerModal.current)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const handleEstadoActivoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked)
        // setEstado(!estado);
        //console.log(estado)
    };

    // const registrarHorario  = () => {

    //     if(idTurno == 0){
    //         refTurno.current?.focus()
    //         return
    //     }
    //     if(idPrograma == 0){
    //         refPrograma.current?.focus()
    //         return
    //     }
    //     if(idPeriodo == 0){
    //         refPeriodo.current?.focus()
    //         return
    //     }
    //     if(idTipoEstudio == 0){
    //         refTipoEstudio.current?.focus()
    //         return
    //     }

    // }


    return (
        <>

            {/* Modal */}
            <CustomModal
                isOpen={isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {

                }}
                onClose={handleCloseModal}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Nuevo Horario</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={handleCloseModal}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full p-4">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="m-2">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        <div className="text-sm">
                                            <p>Idioma: <span className="text-blue-700 font-bold">{nombreIdioma}</span></p>
                                            <p>Modalidad: <span className="text-blue-700 font-bold ">{nombreModalidad}</span></p>
                                        </div>
                                        <div className="text-sm">
                                            <p>Sede: <span className="text-blue-700 font-bold">{nombreSede}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Turno <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refTurno}
                                // value={idIdioma}
                                // onChange={(event) => {
                                //     const selectedIdiomaId = event.currentTarget.value;
                                //     setIdIdioma(selectedIdiomaId);

                                //     const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                //     if (selectedIdioma) {
                                //         setNombreIdioma(selectedIdioma.idiomaNombre);
                                //     } else {
                                //         setNombreIdioma("");
                                //     }
                                // }}
                                >
                                    <option value={0}>- Seleccione -</option>
                                    {
                                        comboBoxTurno.map((item, index) => {
                                            return (
                                                <option key={index} value={item.turnoId}>
                                                    {item.turno}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Programa <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refPrograma}
                                >
                                    <option value="0">- Seleccione -</option>
                                    {
                                        comboBoxPrograma.map((item, index) => {
                                            return (
                                                <option key={index} value={item.programaId}>
                                                    {item.programa}
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
                                >
                                    <option value="0">- Seleccione -</option>
                                    {
                                        comboBoxPeriodo.map((item, index) => {

                                            if (item.anio === anioActual) {
                                                return (
                                                    <option key={index} value={item.periodoId}>
                                                        {item.anio} - {item.mes}
                                                    </option>
                                                );
                                            }

                                            return null;
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Tipo Estudio <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refTipoEstudio}
                                >
                                    <option value="0">- Seleccione -</option>
                                    {
                                        comboBoxTipoEstudio.map((item, index) => {
                                            return (
                                                <option key={index} value={item.tipEstudioId}>
                                                    {item.tipoEstudio}
                                                </option>
                                            );

                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Estado
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        value={estado.toString()}
                                        checked={estado == true ? true : false}
                                        onChange={handleEstadoActivoChange} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{`${estado == true ? 'activo' : 'inactivo'}`}</span>
                                </label>
                            </div>
                        </div>


                    </div>
                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                        >
                            <i className="bi bi-floppy mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={handleCloseModal}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                </div>

            </CustomModal>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Horarios</h2>

                            <div className="w-full">

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
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
                                                setIdIdioma(selectedIdiomaId);

                                                const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                                if (selectedIdioma) {
                                                    setNombreIdioma(selectedIdioma.idiomaNombre);
                                                } else {
                                                    setNombreIdioma("");
                                                }
                                            }}
                                        >
                                            <option value="0">- Seleccione -</option>
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
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Opciones
                                        </label>
                                        <div className="relative flex flex-wrap">
                                            <button
                                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                            >
                                                <i className="bi bi-search mr-1"></i> BUSCAR
                                            </button>
                                            <button
                                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                                onClick={NuevoHorario}
                                            >
                                                <i className="bi bi-plus-circle-fill mr-1"></i> NUEVO
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-auto rounded-md my-6">
                                    <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                        <thead className="align-bottom">
                                            <tr>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Idioma</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidas</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Editar</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/*

                                                loading ? (
                                                    <tr className="text-center bg-white border-b">
                                                        <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                                            <div className="flex items-center justify-center">
                                                                <LoaderSvg /> <span>Cargando datos...</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    listaEstudiantes.length == 0 ?
                                                        (
                                                            <tr className="text-center bg-white border-b">
                                                                <td colSpan={8} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                                            </tr>
                                                        )
                                                        :
                                                        (
                                                            listaEstudiantes.map((item, index) => {

                                                                return (
                                                                    <tr key={index} className="bg-white border-b">
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.codigo} <br /> <span>&nbsp;{item.estudiante}</span></td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.fecha_ingreso} <br /> <span>&nbsp;{item.hora_ingreso}</span></td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.fecha_salida} <br /> <span>&nbsp;{item.hora_salida}</span></td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.puerta_ingreso}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.puerta_salida}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.usuario_condicion} <br /> <span>&nbsp;{item.diferencia_horas}</span></td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                            <button
                                                                                title="Ver historial"
                                                                                className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                                                onClick={() => onEventDetalle(item.codigo)}
                                                                            >
                                                                                <i className="bi bi-list-ul text-sm"></i>

                                                                            </button>

                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        )
                                                )
                                            */
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                                    <div>

                                        {/* <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span> */}

                                    </div>
                                    <nav className="bg-white rounded-md">
                                        <ul className="flex">

                                            {/* <Paginacion
                                                loading={loading}
                                                restart={restart.current}
                                                paginacion={paginacion.current}
                                                totalPaginacion={totalPaginacion.current}
                                                fillTable={paginacionTable}
                                            /> */}

                                        </ul>
                                    </nav>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default HorarioIdiomas
