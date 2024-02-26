import CustomModal from "../../../../component/Modal.component";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";
import { colorSelect, keyNumberInteger } from '../../../../helper/herramienta.helper'

import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { useSelector } from "react-redux";
import { RootState } from '../../../../store/configureStore.store';
import { ActualizarHorarioAsignatura, ListarAsignatura, ListarDocenteIdiomasBusqueda } from "@/network/rest/idiomas.network";

//import RespValue from "@/model/interfaces/RespValue.model.interface";
import Asignatura from "@/model/interfaces/asignatura/asignatura";
import DocenteInfo from "@/model/interfaces/docente/docenteInfo";
import Listas from "@/model/interfaces/Listas.model.interface";
import RespValue from "@/model/interfaces/RespValue.model.interface";

type HorarioDetActual = {
    horarioId: number
    horarioAsigId: number
    asiId: string
    asiNivel: string
    capacidad: number
    color: string
    docenteId: string
    visible: boolean
}

type Props = {
    isOpenModal: boolean
    idIdioma: number
    listaHorario: object[]
    horarioActual: HorarioDetActual

    abortControl: AbortController
    loadInit: () => void
    handleClose: () => void
}

const HorarioGeneralEditar = (props: Props) => {

    const datosGeneral = props.horarioActual

    //console.log(datosGeneral)

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [comboBoxAsignatura, setComboBoxAsignatura] = useState<Asignatura[]>([])
    const [comboBoxDocente, setComboBoxDocente] = useState<DocenteInfo[]>([])

    const [asiId, setAsiId] = useState<string>("")
    const [docenteId, setDocenteId] = useState<string>("")
    const [capacidad, setCapacidad] = useState<number>(0)
    const [color, setColor] = useState<string>("0")
    const [nivel, setNivel] = useState<string>("")
    const [estado, setEstado] = useState<boolean>(false)

    const sweet = useSweerAlert();

    const refAsignatura = useRef<HTMLSelectElement>(null)
    const refColor = useRef<HTMLSelectElement>(null)
    const refCapacidad = useRef<HTMLInputElement>(null)

    const [searchTermDocente, setSearchTermDocente] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isDisabledInput, setIsDisabledInput] = useState(false)
    const refInputBusqueda = useRef<HTMLInputElement>(null)

    //const abortController = useRef(new AbortController());

    useEffect(() => {
        LoadDataAsignatura()
    }, [])

    useEffect(() => {
        if (datosGeneral) {
            setAsiId(datosGeneral.asiId)
            setNivel(datosGeneral.asiNivel)
            setDocenteId(datosGeneral.docenteId ?? "")  
            setCapacidad(datosGeneral.capacidad)
            setColor(datosGeneral.color)
            setEstado(datosGeneral.visible)
        }
    }, [datosGeneral]);


    const LoadDataAsignatura = async () => {

        setComboBoxAsignatura([])

        const response = await ListarAsignatura<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxAsignatura(response.data.resultado as Asignatura[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataDocente = async (buscar: string) => {

        setComboBoxDocente([])

        const response = await ListarDocenteIdiomasBusqueda<Listas>(buscar, props.abortControl)
        if (response instanceof Response) {
            setComboBoxDocente(response.data.resultado as DocenteInfo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const handleEstadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked);
    };

    const onActualizaRHorarioGeneral = () => {
        if (asiId == "0") {
            refAsignatura.current?.focus()
            return
        }
        if (capacidad == 0) {
            refCapacidad.current?.focus()
            return
        }
        if (color == "0") {
            refColor.current?.focus()
            return
        }

        const params = {
            "horarioAsigId": props.horarioActual.horarioAsigId,
            "horarioId": props.horarioActual.horarioId,
            "asignaturaId": props.horarioActual.asiId,
            "docenteId": docenteId,
            "capacidad": capacidad,
            "color": color,
            "visible": estado ? 1 : 0,
            "usuarioRegistra": codigo,
            "fechaRegistra": new Date().toISOString(),
            "usuarioModifica": codigo,
            "fechaModifica": new Date().toISOString(),
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                console.log(params)

                sweet.openInformation("Mensaje", "Procesando información...")

                const response = await ActualizarHorarioAsignatura<RespValue>(params, props.abortControl);

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleClose() });
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return;

                    sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleClose() });
                }

                props.loadInit()
            }
        })

    }

    //Input Docentes
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermDocente(event.target.value);
    };

    const handleSearchInput = () => {
        if (searchTermDocente.trim() == '') {
            refInputBusqueda.current?.focus()
            return
        }

        LoadDataDocente(searchTermDocente)

        setIsSearching(true);
    };

    const handleListClick = (docente: DocenteInfo) => {

        setDocenteId(docente.numdocuttraba)
        setSearchTermDocente(docente.numdocuttraba + ' - ' + `${docente.apepatttraba} ${docente.apemattraba} ${docente.nomttraba}`);

        setIsSearching(false); // Oculta la lista al seleccionar un elemento
        setIsDisabledInput(true)
    };

    const handleClearInput = () => {
        setIsDisabledInput(false)
        setSearchTermDocente("")
        setDocenteId("")
    }

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {

                }}
                onClose={props.handleClose}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Editar Horario aea</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleClose}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Asignatura <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refAsignatura}
                                    value={asiId}
                                    onChange={(event) => {
                                        setAsiId(event.currentTarget.value);

                                        const filterNivel = comboBoxAsignatura.filter((item) => event.currentTarget.value == item.asiId)

                                        setNivel(filterNivel[0]?.asiNivel)

                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxAsignatura.map((item, index) => {

                                            if (item.idiomaId === props.idIdioma) {
                                                return (
                                                    <option key={index} value={item.asiId}>
                                                        {item.asignatura}
                                                    </option>
                                                );
                                            }
                                            return null;

                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Nivel
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-gray-100"
                                    value={nivel} />

                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Capacidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <input
                                    type="text"
                                    maxLength={3}
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center"
                                    ref={refCapacidad}
                                    value={capacidad}
                                    onChange={(event) => {
                                        if (event.target.value.trim().length > 0) {
                                            setCapacidad(parseInt(event.currentTarget.value));
                                        } else {
                                            setCapacidad(0);
                                        }
                                    }}
                                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberInteger(event)}
                                />
                            </div>

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Color <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refColor}
                                    value={color}
                                    onChange={(event) => {
                                        setColor(event.currentTarget.value);
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        colorSelect.map((item, index) => {
                                            return (
                                                <option key={index} value={item.codColor} style={{ backgroundColor: item.codColor }}>
                                                    {item.nombreColor}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>


                            <div className="col-span-2">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Instructor
                                </label>
                                <div className="relative flex flex-wrap">
                                    <input
                                        type="text"
                                        className={`relative flex-auto rounded-l border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 p-1 ${isDisabledInput && 'bg-gray-100'}`}
                                        placeholder="Ingrese el dni o apellidos para buscar"
                                        style={{ fontSize: '12px' }}
                                        disabled={isDisabledInput}
                                        ref={refInputBusqueda}
                                        value={searchTermDocente}
                                        onChange={handleSearch}
                                    />
                                    {
                                        isDisabledInput === false ? (
                                            <button
                                                title="Buscar"
                                                className="flex items-center rounded-r border-md border-gray-500 bg-gray-500 text-white px-2 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                onClick={handleSearchInput}
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                        ) : (
                                            <button
                                                title="Limpiar"
                                                className="flex items-center rounded-r border-md border-red-500 bg-red-500 text-white px-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                                onClick={handleClearInput}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        )
                                    }

                                </div>
                                {isSearching && (
                                    <ul
                                        className="absolute mt-1 bg-blue-50 border border-gray-00 rounded-md shadow-md overflow-y-auto z-10 max-h-36"
                                    >
                                        {comboBoxDocente.map((docente) => (
                                            <li
                                                key={docente.numdocuttraba} className="border-b border-gray-300 py-0 px-6 text-xs cursor-pointer"
                                                onClick={() => handleListClick(docente)}
                                            >
                                                <span className="font-semibold">{docente.numdocuttraba}</span> {docente.apepatttraba} {docente.apemattraba} {docente.nomttraba}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Estado
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={estado}
                                        onChange={handleEstadoChange} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{`${estado == true ? 'activo' : 'inactivo'}`}</span>
                                </label>
                            </div>


                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                            onClick={onActualizaRHorarioGeneral}
                        >
                            <i className="bi bi-floppy-fill mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.handleClose}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                    <div className="relative flex flex-wrap justify-center mt-4">
                        <span className="text-xs mb-2">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div>
                </div>

            </CustomModal>
        </>
    )
}

export default HorarioGeneralEditar