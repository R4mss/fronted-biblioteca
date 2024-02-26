import { useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';
import CustomModal from '../../../../component/Modal.component';
import ModalHorarioDetEditar from '../modal/HorarioDetEditar';
import '../component/style/horario.css'

type Props = {
    data: object[]
    color: object[]
    idIdioma: number
    idHorario: number
    idTipoEstudio: number
    turnoInicio: string | undefined
    turnoFin: string | undefined
    loadInit: () => void
}

const Horario = (props: Props) => {

    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);

    const [horarioDetActual, setHorarioDetActual] = useState<any>({})

    const renderCard = (item: any) => {

        const horario = item.appointmentData

        return (
            <div className={`p-1  my-1 rounded-sm`}  >
                <p className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{horario.asignatura}</p>
                <p className="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400" style={{ fontSize: '12px' }}>{horario.docente}</p>
                <p className="mb-1 font-bold text-xs text-gray-700 dark:text-gray-400">{horario.horaIni} - {horario.horaFin}</p>
                <div className="text-center rounded bg-white">
                    <span className="text-black">{horario.tipoEstudio}</span>
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
            </div>
        );
    }

    return (
        <>
            <CustomModal
                isOpen={isOpenModalInfo}
                onOpen={() => {

                }}
                onHidden={() => {
                    setHorarioDetActual({})

                }}
                onClose={handleCloseModalInfo}
            >

                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Opciones de asignatura: {horarioDetActual.asignatura}</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={handleCloseModalInfo}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="m-4">

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                                        <div className="text-sm">
                                            <p>Instructor: <span className="text-blue-700 font-bold">{horarioDetActual.docenteId} - {horarioDetActual.docente}</span></p>
                                            <p>Seccion: <span className="text-blue-700 font-bold">{horarioDetActual.seccion}</span></p>
                                            <p>Turno: <span className="text-blue-700 font-bold">{horarioDetActual.turno}</span></p>
                                            <p>horario: Desde <span className="text-blue-700 font-bold">{horarioDetActual.horaIni}</span> hasta <span className="text-blue-700 font-bold">{horarioDetActual.horaFin}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-yellow-500 bg-yellow-500 text-white p-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 active:ring-yellow-400"
                            onClick={() => {
                                handleCloseModalInfo();
                                //props.handleOpenModalHorarioDetProcesoEditar()
                                handleOpenModalHorarioDetProcesoEditar()
                            }}
                        >
                            <i className="bi bi-pencil-fill mr-1"></i> Editar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                        >
                            <i className="bi bi-people-fill mr-1"></i> Matriculados
                        </button>
                    </div>

                    {/* <div className="relative flex flex-wrap justify-center mt-4">
                        <span className="text-xs mb-2">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div> */}
                </div>

            </CustomModal>

            <ModalHorarioDetEditar
                isOpenModal={isOpenModalEditar}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                idTipoEstudio={props.idTipoEstudio}
                //idSeccion={props.}

                turnoInicio={props.turnoInicio}
                turnoFin={props.turnoFin}

                loadInit={() => props.loadInit()}
                handleCloseModalHorarioDetProcesoEditar={handleCloseModalHorarioDetProcesoEditar}
            />


            <Scheduler
                timeZone="America/Lima"

                defaultCurrentView="week"
                dataSource={props.data}
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
                    startDayHour={props.turnoInicio != undefined ? parseInt(props.turnoInicio) - 1 : 8}
                    endDayHour={props.turnoFin != undefined ? parseInt(props.turnoFin) + 2 : 23}
                    // startDayHour={8}
                    // endDayHour={23}
                    dateCellRender={renderDateCell}
                />
                <Resource
                    dataSource={props.color}
                    //dataSource={colorRender}
                    fieldExpr="detHorarioId"
                // label="Room"
                />
            </Scheduler>

        </>
    )
}




export default Horario