import CustomModal from "../../../../component/Modal.component";
import { useEffect, useRef, useState, ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { RootState } from '../../../../store/configureStore.store';

import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";

import Turno from "../../../../model/interfaces/turno/turno";
import Programa from "../../../../model/interfaces/programa/programa";

import Listas from "../../../../model/interfaces/Listas.model.interface";
import { ListarPrograma, ListarTurno, InsertarActualizarHorario, ListarAula } from "../../../../network/rest/idiomas.network";

import RespValue from "../../../../model/interfaces/RespValue.model.interface";
import Sweet from '../../../../model/interfaces/Sweet.mode.interface'
import Aula from "@/model/interfaces/aula/aula";


type Props = {
    isOpenModal: boolean,
    idIdioma: number,
    idSede: string,
    idModalidad: number,
    idPeriodo: string,
    idTipoEstudio: number,

    nombreIdioma: string,
    nombreSede: string
    nombreModalidad: string,
    nombrePeriodo: string,
    nombreTipoEstudio: string,

    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModal: () => void
}

const HorarioAgregar = (props: Props) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [comboBoxAula, setComboBoxAula] = useState<Aula[]>([])
    const [comboBoxTurno, setComboBoxTurno] = useState<Turno[]>([])
    const [comboBoxPrograma, setComboBoxPrograma] = useState<Programa[]>([])


    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [idAula, setIdAula] = useState<number>(0)
    const [seccion, setSeccion] = useState("")
    const [estado, setEstado] = useState<boolean>(true)


    const refTurno = useRef<HTMLSelectElement>(null)
    const refPrograma = useRef<HTMLSelectElement>(null)
    const refAula = useRef<HTMLSelectElement>(null)
    const refSeccion = useRef<HTMLInputElement>(null)

    useEffect(() => {
        LoadDataTurno()
        LoadDataPrograma()
        LoadDataAula()
    }, [])

    const LoadDataTurno = async () => {

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

        const response = await ListarPrograma<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxPrograma(response.data.resultado as Programa[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataAula = async () => {

        const response = await ListarAula<Listas>(props.abortControl)
        if (response instanceof Response) {

            setComboBoxAula(response.data.resultado as Aula[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const handleEstadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked);
    };


    const onRegistrarHorario = () => {


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
            "horarioId": 0,
            "turnoId": idTurno,
            "idiomaId": props.idIdioma,
            "programaId": idPrograma,
            "sedeId": props.idSede,
            "modalidadId": props.idModalidad,
            "periodoId": props.idPeriodo,
            "aulasId": idAula,
            "tipEstudioId": props.idTipoEstudio,
            "seccion": seccion,
            "estado": estado ? 1 : 0,
            "usuarioRegistra": codigo,
            "fechaRegistra": new Date().toISOString(),
            "usuarioModifica": codigo,
            "fechaModifica": new Date().toISOString()
        }

        props.sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                props.sweet.openInformation("Mensaje", "Procesando información...")

                const response = await InsertarActualizarHorario<RespValue>("CREAR", params, props.abortControl);

                if (response instanceof Response) {

                    if (response.data.value == "procesado") {
                        props.sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleCloseModal() });
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
                    setIdTurno(0)
                    setIdPrograma(0)
                    setIdAula(0)
                    setEstado(true)
                    setSeccion("")
                }}
                onClose={props.handleCloseModal}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Nuevo Horario</h6>
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
                                        comboBoxAula.filter(item => item.modalidadId === props.idModalidad)
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


                                {/* <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refSeccion}
                                    value={idSeccion}
                                    onChange={(event) => {
                                        setIdSeccion(parseInt(event.currentTarget.value));
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxSeccion.map((item, index) => {
                                            return (
                                                <option key={index} value={item.seccionId}>
                                                    {item.nombreSeccion}
                                                </option>
                                            );


                                        })
                                    }
                                </select> */}
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
                            onClick={onRegistrarHorario}
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

export default HorarioAgregar