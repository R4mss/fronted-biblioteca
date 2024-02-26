import CustomModal from "../../../../component/Modal.component"
import { useEffect, useRef, useState, ChangeEvent } from "react"

import { useSelector } from "react-redux"
import { RootState } from '../../../../store/configureStore.store'

import Response from "../../../../model/class/response.model.class"
import RestError from "../../../../model/class/resterror.model.class"
import { Types } from "../../../../model/enum/types.model.enum"

import Idioma from "../../../../model/interfaces/idioma/idioma"
import Sede from "../../../../model/interfaces/sede/sede"
import Modalidad from "../../../../model/interfaces/modalidad/modalidad"
import Periodo from "../../../../model/interfaces/periodo/periodo"
import Aula from "@/model/interfaces/aula/aula"

import Turno from "../../../../model/interfaces/turno/turno"
import Programa from "../../../../model/interfaces/programa/programa"
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio"

import Listas from "../../../../model/interfaces/Listas.model.interface"
import { ListarIdioma, ListarModalidad, ListarSede, ListarPeriodo, ListarPrograma, ListarTurno, InsertarActualizarHorario, ListarTipoEstudio, ListarAula } from "../../../../network/rest/idiomas.network"

import RespValue from "../../../../model/interfaces/RespValue.model.interface"
import Sweet from '../../../../model/interfaces/Sweet.mode.interface'



type Props = {
    isOpenModal: boolean,
    idHorario: number,
    idIdioma: number,
    idSede: string,
    idModalidad: number,
    idPeriodo: string,
    idAula: number,

    seccion: string,

    idTurno: number,
    idPrograma: number,
    idTipoEstudio: number,

    estado: number,

    nombreIdioma: string,
    nombreSede: string
    nombreModalidad: string,
    nombrePeriodo: string,
    nombreTipoEstudio: string,

    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModal: () => void
    loadinit: () => void
}

const HorarioEditar = (props: Props) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxAula, setComboBoxAula] = useState<Aula[]>([])

    const [comboBoxTurno, setComboBoxTurno] = useState<Turno[]>([])
    const [comboBoxPrograma, setComboBoxPrograma] = useState<Programa[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>('0')
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<string>('0')
    const [idAula, setIdAula] = useState<number>(0)

    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)
    const [seccion, setSeccion] = useState("")

    const [estado, setEstado] = useState<boolean>(false)

    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refAula = useRef<HTMLSelectElement>(null)
    const refSeccion = useRef<HTMLInputElement>(null)

    const refTurno = useRef<HTMLSelectElement>(null)
    const refPrograma = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)


    const abortController = useRef(new AbortController());


    useEffect(() => {
        setIdIdioma(props.idIdioma || 0)
        setIdSede(props.idSede || '0')
        setIdModalidad(props.idModalidad || 0)
        setIdPeriodo(props.idPeriodo || '0')
        setIdAula(props.idAula || 0)
        setIdTurno(props.idTurno || 0)
        setIdPrograma(props.idPrograma || 0)
        setIdTipoEstudio(props.idTipoEstudio || 0)
        setEstado(!!props.estado || false)
        setSeccion(props.seccion || '')

    }, [props.idIdioma, props.idSede, props.idModalidad, props.idPeriodo, props.idAula, props.idTurno, props.idPrograma, props.idTipoEstudio]);

    useEffect(() => {
        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()
        LoadDataAula()

        LoadDataTurno()
        LoadDataPrograma()
        LoadDataTipoEstudio()

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

    const LoadDataAula = async () => {

        setComboBoxAula([])

        const response = await ListarAula<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxAula(response.data.resultado as Aula[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataTurno = async () => {

        setComboBoxTurno([])

        const response = await ListarTurno<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxTurno(response.data.resultado as Turno[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataPrograma = async () => {

        setComboBoxPrograma([])

        const response = await ListarPrograma<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxPrograma(response.data.resultado as Programa[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const LoadDataTipoEstudio = async () => {

        setComboBoxTipoEstudio([])

        const response = await ListarTipoEstudio<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const handleEstadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked);
    };



    const onEditarHorario = () => {

        //event.preventDefault()
        if (idIdioma == 0) {
            refIdioma.current?.focus()
            return
        }

        if (idSede == '0') {
            refSede.current?.focus()
            return
        }

        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == '0') {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }
        if (idTurno == 0) {
            refTurno.current?.focus()
            return
        }
        if (idPrograma == 0) {
            refPrograma.current?.focus()
            return
        }
        if (idAula == 0) {
            refAula.current?.focus()
            return
        }



        const params = {
            "horarioId": props.idHorario,
            "turnoId": idTurno,
            "idiomaId": idIdioma,
            "programaId": idPrograma,
            "sedeId": idSede,
            "modalidadId": idModalidad,
            "periodoId": idPeriodo,
            "aulasId": idAula,
            "tipEstudioId": idTipoEstudio,
            "seccion": seccion,
            "estado": estado ? 1 : 0,
            "usuarioRegistra": codigo,
            "fechaRegistra": new Date().toISOString(),
            "usuarioModifica": codigo,
            "fechaModifica": new Date().toISOString(),
        }

        props.sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                props.sweet.openInformation("Mensaje", "Procesando información...")

                const response = await InsertarActualizarHorario<RespValue>("ACTUALIZAR", params, props.abortControl);

                if (response instanceof Response) {

                    if (response.data.value == "procesado") {
                        props.sweet.openSuccess("Mensaje", response.data.value as string, () => { props.loadinit(); props.handleCloseModal() });
                    }

                }


                if (response instanceof RestError) {

                    if (response.getType() === Types.CANCELED) return;

                    if (response.getStatus() == 401) {
                        // dispatch(logout());
                        return;
                    }

                    if (response.getStatus() == 403) {
                        return;
                    }

                    props.sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleCloseModal() });
                }
            }
        })

    }


    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {

                }}
                onClose={props.handleCloseModal}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Editar Horario 
                        {/* - {props.idHorario} */}
                        </h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModal}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="m-2">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        <div className="text-sm">
                                            <p>Idioma: <span className="text-blue-700 font-bold">{props.nombreIdioma}</span></p>
                                            <p>Modalidad: <span className="text-blue-700 font-bold ">{props.nombreModalidad}</span></p>
                                            <p>Tipo de Estudio: <span className="text-blue-700 font-bold ">{props.nombreTipoEstudio}</span></p>
                                        </div>
                                        <div className="text-sm">
                                            <p>Sede: <span className="text-blue-700 font-bold">{props.nombreSede}</span></p>
                                            <p>Periodo: <span className="text-blue-700 font-bold">{props.nombrePeriodo}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refIdioma}
                                    value={idIdioma}
                                    onChange={(event) => {
                                        setIdIdioma(parseInt(event.currentTarget.value));
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
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Sede <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refSede}
                                    value={idSede}
                                    onChange={(event) => {
                                        setIdSede(event.currentTarget.value);
                                    }}
                                >
                                    <option value={0}>- Seleccione -</option>
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
                                    Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refModalidad}
                                    value={idModalidad}
                                    onChange={(event) => {
                                        setIdModalidad(parseInt(event.currentTarget.value));
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
                                    Periodo <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refPeriodo}
                                    value={idPeriodo}
                                    onChange={(event) => {
                                        setIdPeriodo(event.currentTarget.value);
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
                                        setIdTipoEstudio(parseInt(event.currentTarget.value));
                                    }}
                                >
                                    <option value={0}>- Seleccione -</option>
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
                                    Turno <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refTurno}
                                    value={idTurno}
                                    onChange={(event) => {
                                        setIdTurno(parseInt(event.currentTarget.value));
                                    }}
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
                                    value={idPrograma}
                                    onChange={(event) => {
                                        setIdPrograma(parseInt(event.currentTarget.value));
                                    }}
                                >
                                    <option value={0}>- Seleccione -</option>
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
                                    Aula <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refAula}
                                    value={idAula}
                                    onChange={(event) => {
                                        setIdAula(parseInt(event.currentTarget.value));
                                    }}
                                >
                                    <option value={0}>- Seleccione -</option>
                                    {
                                        comboBoxAula.filter(item => item.modalidadId === idModalidad)
                                            .map((item, index) => (
                                                <option key={index} value={item.aulasId}>
                                                    {item.nombre}
                                                </option>
                                            ))

                                    }

                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Sección
                                </label>
                                <input
                                    maxLength={3}
                                    type="text"
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-white"
                                    ref={refSeccion}
                                    value={seccion}
                                    onChange={(e) =>
                                        setSeccion(e.target.value)
                                    }
                                />

                                
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
                            onClick={onEditarHorario}
                        >
                            <i className="bi bi-floppy mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.handleCloseModal}
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

export default HorarioEditar