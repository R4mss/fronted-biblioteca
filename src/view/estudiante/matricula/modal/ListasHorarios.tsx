import CustomModal from "@/component/Modal.component";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import HorarioDisponible from "@/model/interfaces/horario/horarioDisponible";
import CiclosInfo from "@/model/interfaces/matricula/ciclosInfo";
import { InsertarMatricula, InsertarMatriculaDetalle, InsertarMatriculaSegundoCuarto, ListarHorarioDisponibleEst } from "@/network/rest/idiomas.network";
import { RootState } from "@/store/configureStore.store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import RespValue from "@/model/interfaces/RespValue.model.interface";
import { useNavigate } from "react-router-dom";
import { convertirNumeroAMes } from "@/helper/herramienta.helper";

type Props = {

    show: boolean;
    cicloMatriculable: CiclosInfo[]
    asigId: string
    hide: () => void;

};

const ListasHorario = (props: Props) => {

    const sweet = useSweerAlert();
    const navigate = useNavigate()

    /*const [expandirTD,
        //setExpandirTD
    ] = useState<number | null>(null);*/

    /*const handleExpandirTD = (horarioId: number) => {
        setExpandirTD((prev) => (prev === horarioId ? null : horarioId));
    };*/

    const [listarHorarioDisponible, setListarHorarioDisponible] = useState<any[]>([]);
    const [tiempoRestante, setTiempoRestante] = useState<number>(60);
    const showRef = useRef<boolean>(props.show);

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    useEffect(() => {
        let temporizador: NodeJS.Timeout;

        const cerrarModal = () => {
            props.hide();
            // Reiniciar el tiempo restante cuando se cierra el modal
            setTiempoRestante(60);
        };

        if (props.show) {
            showRef.current = true;
            temporizador = setInterval(() => {
                setTiempoRestante((prevTiempo) => {
                    if (prevTiempo === 0) {
                        clearInterval(temporizador);
                        cerrarModal();
                    }
                    return prevTiempo > 0 ? prevTiempo - 1 : 0;
                });
            }, 1000);
        } else {
            showRef.current = false;
        }

        return () => {
            clearInterval(temporizador);
        };
    }, [props.show, props.hide]);

    const loadInit = async () => {

        setListarHorarioDisponible([])

        const response = await ListarHorarioDisponibleEst<Listas>(codigo, props.asigId)

        if (response instanceof Response) {
            setListarHorarioDisponible(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const listaHorarios: (HorarioDisponible & { repeticiones: number })[] = [];
    const horarioIdsCount: Record<number, number> = {};

    listarHorarioDisponible.forEach((elemento) => {
        const { horarioId, dia, ...restoElemento } = elemento;

        // Incrementa el contador para el horarioId actual
        horarioIdsCount[horarioId] = (horarioIdsCount[horarioId] || 0) + 1;

        // Agrega a listaHorariosUnicos solo si es el primer elemento encontrado
        if (horarioIdsCount[horarioId] === 1) {
            listaHorarios.push({
                horarioId,
                ...restoElemento,
                repeticiones: horarioIdsCount[horarioId],
            });
        } else {
            // Actualiza la repeticiones para los elementos adicionales
            const indice = listaHorarios.findIndex((el) => el.horarioId === horarioId);
            if (indice !== -1) {
                listaHorarios[indice].repeticiones = horarioIdsCount[horarioId];
            }
        }
    });


    /*const listaHorarios: (HorarioDisponible & { repeticiones: number })[] = [];
    const horarioIdsCount: Record<number, number> = {};

    listarHorarioDisponible.forEach((elemento) => {
        const { horarioId, dia, ...restoElemento } = elemento;

        // Incrementa el contador para el horarioId actual
        horarioIdsCount[horarioId] = (horarioIdsCount[horarioId] || 0) + 1;

        // Agrega la información al array resultante
        listaHorarios.push({
            horarioId,
            ...restoElemento,
            repeticiones: horarioIdsCount[horarioId],
        });
    });*/

    /*const FiltrarPorId = (listaElementos: HorarioDisponible[], horarioId: number | null): HorarioDisponible[] => {
        return listaElementos.filter(elemento => elemento.horarioId === horarioId);
    };*/

    //const listaHorariosFiltrada = FiltrarPorId(listarHorarioDisponible, expandirTD);

    /*const diasNombres: { [key: string]: string } = {
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado',
        '7': 'Domingo',
    };*/

    const nivel: string | undefined = props.cicloMatriculable[0]?.nivelAsign
    const status: string = 'impedido'
    console.log(nivel)

    const matriculaHorarioElegido = (idiomaId: number, sedeId: string, horarioAsigId: number, tipoEstudioId: number, periodoId: number) => {

        const paramsMatricula = {
            "matriculaId": 0,
            "periodoId": periodoId,
            "estudianteId": codigo,
            "idiomaId": idiomaId,
            "sedeId": sedeId,
            "matriculaRegistro": new Date().toISOString(),
            "usuarioRegistro": codigo,
            "matriculaUpdate": new Date().toISOString(),
            "usuarioUpdate": codigo,
            "matriculaEstado": 1,
            "estadoOperacion": true,
            "opeMat": localStorage.getItem("codMat")
        }

        const paramsPension = {
            "detMatriculaId": 0,
            "matriculaId": 0,
            "HorarioAsigId": horarioAsigId,
            "convalidacion": "",
            "promedio": 0,
            "asistencia": 0,
            "estado": 0,
            "fechRegistro": new Date().toISOString(),
            "observacion": '',
            "estadoOperacion": true,
            "opePen": localStorage.getItem("codPen"),
            "condicion": 'N',
            "tipEstudioId": tipoEstudioId,
            "periodoId": periodoId
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {

            if (value) {

                sweet.openInformation("Mensaje", "Procesando información...")

                // INSERTAR MATRICULA - INICIO DEL IF --- AÑADIR LAS OTRAS CONDICIONES
                //REGULAR
                //si es 1: matricula y pension
                //si es 2,3,4 solo pension

                //si es 5: matricula y pension
                //si es 6,7,8 solo pension

                //IMPEDIDO
                //si es impedido paga pension si o si
                //el codigo de utilizado solo es si?

                /*if (nivel == '1' || nivel == '5' || status == 'impedido') {

                }*/

                    // verifica si existe un codigo de matricula        si es 1 o 5 nivel, ademas de estar como impedido, debe registrarse la matricula
                if ((localStorage.getItem("codMat") !== 'utilizado') && (nivel == '1' || nivel == '5' || status == 'impedido')) {
                //if (localStorage.getItem("codMat") !== 'utilizado') {

                    const response = await InsertarMatricula<RespValue>(tipoEstudioId, paramsMatricula);

                    if (response instanceof Response) {

                        if (response.data.value == "insert") {
                            /*sweet.openSuccess("Mensaje", response.data.value as string, () => {
                                props.hide()
                            });*/
                            localStorage.removeItem("codMat")
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

                        sweet.openWarning("Mensaje", response.getMessage(), () => {
                            props.hide()
                        });
                    }
                }

                const responseMatDet = await InsertarMatriculaSegundoCuarto<RespValue>(codigo, paramsPension);

                if (responseMatDet instanceof Response) {

                    if (responseMatDet.data.value == "insert") {
                        sweet.openSuccess("Mensaje", "La matricula se ha realizado con éxito.", () => {
                            props.hide()
                        });
                        localStorage.removeItem("codPen")
                        navigate(-1)

                    }
                }

                if (responseMatDet instanceof RestError) {

                    if (responseMatDet.getType() === Types.CANCELED) return;

                    if (responseMatDet.getStatus() == 401) {
                        // dispatch(logout());
                        return;
                    }

                    if (responseMatDet.getStatus() == 403) {
                        return;
                    }

                    sweet.openWarning("Mensaje", responseMatDet.getMessage(), () => {
                        props.hide()
                    });
                }

            }
        })
    }

    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {
                loadInit()
            }}
            onHidden={() => {
                setTiempoRestante(60)
            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">

                    <div className="flex justify-between w-11/12">
                        <h6 className="py-1 font-bold text-lg"> Lista de Horarios</h6>
                        <div className="flex gap-4 bg-red-400 text-white px-2 text-sm rounded-lg">
                            <i className="m-auto bi bi-exclamation-circle text-lg" />
                            <p className="m-auto ">Se cerrará automáticamente en: <strong>{tiempoRestante}</strong> segundos</p>
                        </div>
                    </div>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                {/* <div className="w-full mt-4">
                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                        <div
                            className="border-b-2 border-gray-200 p-2 flex justify-between">
                            <div className="text-sm font-bold">
                                Información
                            </div>
                        </div>
                        <div className="m-2">

                            <div className="px-4">

                                <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                    <li className="pl-4">
                                        <span className="font-semibold text-gray-900 dark:text-white">Fechas límite y plazos: </span> Asegúrate de conocer las fechas límite para realizar los pagos de matrícula y pensiones. Cumplir con estos plazos es fundamental.
                                    </li>
                                    <li className="pl-4">
                                        <span className="font-semibold text-gray-900 dark:text-white">Formas de pago:</span> Verifica qué métodos de pago acepta la institución. Asegúrate de tener la información necesaria para cada método de pago.
                                    </li>
                                    <li className="pl-4">

                                        <span className="font-semibold text-gray-900 dark:text-white">Requisitos de matrícula:</span>  Conoce los requisitos específicos para matricularse en los cursos, ya sean restricciones de cupo, requisitos de nivel académico, prerrequisitos, entre otros.

                                    </li>
                                </ol>

                            </div>

                        </div>
                    </div>
                </div> */}


                {/* <div className="w-full px-4 pb-2 pt-4">
                </div> */}

                <div className="relative overflow-auto rounded-md my-6 overflow-y-auto overflow-x-auto h-96">
                    <table className="w-full text-gray-700 uppercase border table-auto">
                        <thead className="bg-upla-100 text-white">
                            <tr>
                                <th className="py-2 px-6">Periodo</th>
                                <th className="py-2 px-6">Nivel</th>
                                <th className="py-2 px-6">T. Estudio</th>
                                <th className="py-2 px-6">Modalidad</th>
                                <th className="py-2 px-6">Turno</th>
                                <th className="py-2 px-8">Horarios</th>
                                <th className="py-2 px-6">Aula</th>
                                <th className="py-2 px-6">Sección</th>
                                <th className="py-2 px-6">Cant / Cap</th>
                                <th className="py-2 px-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaHorarios.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={9} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                        </tr>
                                    ) : (
                                        listaHorarios.map((horario) => (

                                            horario.capacidad > horario.cantidad && (

                                                <tr key={horario.horarioId} className="text-center text-sm">
                                                    <td className="border p-2">{horario.anio}-{convertirNumeroAMes(horario.mes)}</td>
                                                    <td className="border p-2">{horario.asignatura}</td>
                                                    <td className="border p-2">{horario.tipoEstudio}</td>
                                                    <td className="border p-2">{horario.modalidad}</td>
                                                    <td className="border p-2">{horario.turno}</td>

                                                    <td className={`border p-2 gap-2`}>
                                                        {/*<button className="bg-gray-200 px-2 p-1 rounded-lg" onClick={() => handleExpandirTD(horario.horarioId)}>
                                                        <i className={`bi ${expandirTD === horario.horarioId ? 'bi-dash' : 'bi-plus'}`} />
                                                        {expandirTD === horario.horarioId ? ' Ocultar' : ' Mostrar'}
                                                    </button>*/}
                                                        {/*
                                                        expandirTD === horario.horarioId && (
                                                            <div className="flex flex-col gap-2">
                                                                <div className="text-xs flex flex-col gap-1">
                                                                    {
                                                                        listaHorariosFiltrada.map((detalle) => (
                                                                            <p key={detalle.detHorarioId}>
                                                                                {diasNombres[detalle.dia] || 'Día no válido'}
                                                                            </p>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="text-sm bg-green-200 py-1 font-semibold">
                                                                    {horario.horaIni.slice(0, -3) + " - " + horario.horaFin.slice(0, -3)}
                                                                </div>
                                                            </div>
                                                        )
                                                                */}
                                                        <div className="text-xs">
                                                            {
                                                                horario.repeticiones == 2 ?
                                                                    <p>Sábado - Domingo</p>
                                                                    :
                                                                    <p>Lunes a Viernes</p>
                                                            }
                                                        </div>

                                                        <div className="text-sm font-semibold">
                                                            {horario.horaIni.slice(0, -3) + " - " + horario.horaFin.slice(0, -3)}
                                                        </div>
                                                    </td>

                                                    <td className="border p-2">{horario.aula}</td>
                                                    <td className="border p-2">{horario.seccion}</td>
                                                    <td className="border p-2">{horario.cantidad + '/' + horario.capacidad}</td>
                                                    <td className="border p-2">
                                                        {
                                                            horario.cantidad >= horario.capacidad ?
                                                                <div className="bg-red-400 rounded-lg text-white p-1 px-1 text-xs">
                                                                    Vacantes agotadas
                                                                </div>
                                                                :
                                                                <button className="bg-gray-400 hover:bg-blue-500 p-1 px-2 text-white rounded-lg"
                                                                    //disabled={horario.cantidad >= horario.capacidad}
                                                                    onClick={() => matriculaHorarioElegido(horario.idiomaId, horario.sedeId, horario.horarioAsigId, horario.tipEstudioId, horario.periodoId,)}>
                                                                    Matricular
                                                                </button>
                                                        }

                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </CustomModal>
    )
}

export default ListasHorario;