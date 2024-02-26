import { useEffect, useState } from "react";

import Sweet from '../../../model/interfaces/Sweet.mode.interface'

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarHorarioDetalleId } from "../../../network/rest/idiomas.network";
import ListHorarioDetId from "../../../model/interfaces/horario/listHorarioDetId";
import HorarioPag from "../../../model/interfaces/horario/horarioPag";

import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';

import ModalHorarioDetAgregar from "./modal/HorarioDetAgregar";
import ModalHorarioDetEditar from './modal/HorarioDetEditar';
import ModalHorarioGeneralEditar from './modal/HorarioGeneralEditar';

import '../horario/component/style/horario.css'
import VistaPreviaDetalle from "./modal/VistaPreviaDetalle";

type Props = {
    idHorario: number
    idIdioma: number,
    idTipoEstudio: number,

    itemHorario: HorarioPag | undefined
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioDetalle = (props: Props) => {

    const [listaHorarioDetalleId, setListaHorarioDetalleId] = useState<ListHorarioDetId[]>([])

    const [dataHorario, setDataHorario] = useState<object[]>([]);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const { itemHorario } = props

    useEffect(() => {
        loadInit(props.idHorario)
    }, [])

    const handleOpenModalHorarioAgregra = () => {
        setIsOpenModal(true)
    }

    const handleCloseModalHorarioAgregra = () => {
        setIsOpenModal(false)
    }

    const loadInit = async (horarioId: number) => {

        setListaHorarioDetalleId([])

        const response = await ListarHorarioDetalleId<Listas>(horarioId, props.abortControl)

        if (response instanceof Response) {
            setListaHorarioDetalleId(response.data.resultado as ListHorarioDetId[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        dataRenderHorario()
    }, [listaHorarioDetalleId])


    const dataRenderHorario = () => {


        if (listaHorarioDetalleId.length > 0) {

            setDataHorario(
                listaHorarioDetalleId.map((item) => {

                    const currentDate = new Date();

                    const startDate = new Date(currentDate);
                    const endDate = new Date(currentDate);

                    const [startHour, startMin] = item.horaIni.split(":");
                    const [endHour, endMin] = item.horaFin.split(":");

                    startDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
                    endDate.setHours(parseInt(endHour), parseInt(endMin), 0, 0);

                    return {
                        detHorarioId: item.detHorarioId,
                        asiId: item.asiId,
                        asiNivel: item.asiNivel,
                        horarioId: item.horarioId,
                        horarioAsigId: item.horarioAsigId,
                        capacidad: item.capacidad,
                        asignatura: item.asignatura,
                        dia: item.dia,
                        horaIni: item.horaIni,
                        horaFin: item.horaFin,
                        color: item.color,
                        docente: item.docente,
                        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),
                        recurrenceRule: 'FREQ=WEEKLY',
                        estado: item.estado,
                        observacion: item.observacion,
                        visible: item.visible

                    };

                })

            );
        }
    }

    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);

    const [isOpenModalGeneralEditar, setIsOpenModalGeneralEditar] = useState(false);

    const [horarioDetActual, setHorarioDetActual] = useState<any>({})

    const renderCard = (item: any) => {

        const horario = item.appointmentData

        return (
            <div className="p-2 flex flex-col h-full justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between tracking-tight text-gray-900 dark:text-white">
                        <p className="font-bold">{horario.asignatura}</p>
                        {/*<p>Sección: <span className="font-bold">{horario.seccion}</span></p>*/}
                    </div>
                    <div className="border-b border-dashed border-black my-1"></div>
                    <p className="text-xs font-normal text-gray-700 dark:text-gray-400 whitespace-normal break-words">
                        Instructor: {horario.docente}
                    </p>
                    <div className="font-semibold text-center text-sm text-gray-700 dark:text-gray-400">
                        Capacidad: {horario.capacidad}
                    </div>
                </div>
                <div className="text-center rounded bg-white p-1">
                    <span className="font-bold text-gray-500">{horario.horaIni?.slice(0, -3)} <span>{" - "}</span> {horario.horaFin?.slice(0, -3)}</span>
                </div>
            </div>
        )
    }

    const handleOpenModalInfo = (e: any) => {
        setIsOpenModalInfo(true)
        setHorarioDetActual(e.appointmentData)
    }

    const handleCloseModalInfo = () => {
        setIsOpenModalInfo(false)
    }

    //Modal DetAsign
    const handleOpenModalGeneralEditar = () => {
        setIsOpenModalGeneralEditar(true)
        //setHorarioDetActual(e.appointmentData)
    }

    const handleCloseModalGeneralEditar = () => {
        setIsOpenModalGeneralEditar(false)
    }

    // Modal Editar
    const handleOpenModalHorarioDetProcesoEditar = () => {
        localStorage.setItem('horarioDetActual', JSON.stringify(horarioDetActual));
        setIsOpenModalEditar(true)
    }

    const handleCloseModalHorarioDetProcesoEditar = () => {
        localStorage.removeItem('horarioDetActual');
        setIsOpenModalEditar(false)
    }

    const dayOfWeekNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    function renderDateCell(cellData: any) {
        return (
            <div className='flex justify-center gap-2 '>
                <div className="name my-auto text-sm sm:text-xl">{dayOfWeekNames[cellData.date.getDay()]}</div>
                {/*<div className="number text-xl my-auto">{cellData.date.getDate()}</div>*/}
            </div>
        );
    }

    const colorRender = [
        { id: '#EF9A9A', nombreColor: 'Rojo', color: '#EF9A9A' },
        { id: '#81C784', nombreColor: 'Verde', color: '#81C784' },
        { id: '#64B5F6', nombreColor: 'Azul', color: '#64B5F6' },
        { id: '#FFF59D', nombreColor: 'Amarillo', color: '#FFF59D' },
        { id: '#FFCC80', nombreColor: 'Naranja', color: '#FFCC80' },
        { id: '#BA68C8', nombreColor: 'Morado', color: '#BA68C8' },
        { id: '#F48FB1', nombreColor: 'Rosa', color: '#F48FB1' },
        { id: '#4DD0E1', nombreColor: 'Cyan', color: '#4DD0E1' },
        { id: '#B0BEC5', nombreColor: 'Gris', color: '#B0BEC5' },
        { id: '#8D6E63', nombreColor: 'Marrón', color: '#8D6E63' },
    ];

    //console.log(horarioDetActual)

    return (
        <>
            <ModalHorarioDetAgregar
                isOpenModal={isOpenModal}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                idTipoEstudio={props.idTipoEstudio}
                aula={itemHorario?.aulaNombre}

                turnoInicio={itemHorario?.turnoInicio}
                turnoFin={itemHorario?.turnoFin}

                sweet={props.sweet}
                abortControl={props.abortControl}
                loadInit={() => loadInit(props.idHorario)}
                handleCloseModalHorarioAgregra={handleCloseModalHorarioAgregra} />

            <ModalHorarioDetEditar
                isOpenModal={isOpenModalEditar}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                idTipoEstudio={props.idTipoEstudio}

                turnoInicio={itemHorario?.turnoInicio}
                turnoFin={itemHorario?.turnoFin}

                loadInit={() => loadInit(props.idHorario)}
                handleCloseModalHorarioDetProcesoEditar={handleCloseModalHorarioDetProcesoEditar}
            />

            <ModalHorarioGeneralEditar
                isOpenModal={isOpenModalGeneralEditar}
                idIdioma={props.idIdioma}
                listaHorario={dataHorario}
                horarioActual={horarioDetActual}

                abortControl={props.abortControl}
                loadInit={() => loadInit(props.idHorario)}
                handleClose={handleCloseModalGeneralEditar}
            />

            <VistaPreviaDetalle
                isOpenModal={isOpenModalInfo}
                horario={horarioDetActual}
                setHorarioDetActual={() => setHorarioDetActual({})}
                handleOpenModalDetEditar={() => handleOpenModalHorarioDetProcesoEditar()}
                handleOpenModalGeneralEditar={()=>handleOpenModalGeneralEditar()}
                handleCloseModalInfo={handleCloseModalInfo}
            />

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Configuración de Horario</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <button
                                className="flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={handleOpenModalHorarioAgregra}
                            >
                                <i className="bi bi-plus-circle mr-1"></i> AGREGAR ASIGNATURA
                            </button>

                            <button
                                className="flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={() => loadInit(props.idHorario)}
                            >
                                <i className="bi bi-arrow-clockwise mr-1"></i> Recargar
                            </button>

                        </div>
                        <div className="bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-md w-full mx-auto grid grid-cols-1 sm:grid-cols-2 my-2">
                            <div className="flex flex-col gap-1">

                                <p className="text-sm font-semibold text-gray-700">
                                    {itemHorario?.idiomaNombre}

                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {itemHorario?.sede}

                                </p>
                                <p className="text-sm font-semibold text-gray-600">
                                    {itemHorario?.anio} - {itemHorario?.mes}
                                </p>
                                <p className="text-sm font-semibold text-gray-600">
                                    {itemHorario?.modalidad}
                                </p>


                                {/* <div className="flex flex-row gap-4 ">
                                    <h2 className="text-xl font-semibold text-gray-700">{itemHorario?.idiomaNombre}</h2>
                                    <div className="text-gray-500 text-sm mt-1.5">{itemHorario?.anio} - {itemHorario?.mes}</div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {itemHorario?.tipoEstudio} - {itemHorario?.modalidad} - {itemHorario?.sede}
                                </p> */}

                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold text-gray-600">
                                    {itemHorario?.tipoEstudio}
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {itemHorario?.aulaNombre}

                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {itemHorario?.seccion}

                                </p>
                                <p className="text-sm font-semibold text-gray-600">
                                    {itemHorario?.turno}
                                </p>
                            </div>


                        </div>
                    </div>

                    <>
                        {/*
                        <Horario
                        data={dataHorario}
                        color={color}
                        idIdioma={props.idIdioma}
                        idHorario={props.idHorario}
                        idTipoEstudio={props.idTipoEstudio}
                        turnoInicio={itemHorario?.turnoInicio}
                        turnoFin={itemHorario?.turnoFin}
                        loadInit={() => loadInit(props.idHorario)}
                            />
                        */}

                        <Scheduler
                            timeZone="America/Lima"

                            defaultCurrentView="week"
                            dataSource={dataHorario}
                            showAllDayPanel={false}
                            firstDayOfWeek={1}
                            cellDuration={30}
                            showCurrentTimeIndicator={false}

                            onAppointmentTooltipShowing={(e) => e.cancel = true}
                            width={"100%"}
                            height={"100%"}
                            appointmentRender={renderCard}
                            onAppointmentClick={(e: any) => handleOpenModalInfo(e)}
                            editing={false}
                        >
                            <View
                                type="week"
                                startDayHour={itemHorario?.turnoInicio != undefined ? parseInt(itemHorario?.turnoInicio) - 1 : 8}
                                endDayHour={itemHorario?.turnoFin != undefined ? parseInt(itemHorario?.turnoFin) + 1 : 23}
                                // startDayHour={8}
                                // endDayHour={23}
                                dateCellRender={renderDateCell}
                            />
                            <Resource
                                //dataSource={color}
                                //fieldExpr="detHorarioId"
                                dataSource={colorRender}
                                fieldExpr="color"
                            // label="Room"
                            />
                        </Scheduler>
                    </>
                </div>
            </div>

        </>
    )
}
export default HorarioDetalle

