import { diaSelect } from "@/helper/herramienta.helper";
import CustomModal from "../../../../component/Modal.component";

type Props = {
    isOpenModal: boolean,
    handleCloseModalInfo: () => void
    horario: any
    setHorarioDetActual: () => void
    handleOpenModalDetEditar: () => void
    handleOpenModalGeneralEditar: () => void
}

const VistaPreviaDetalle = (props: Props) => {

    const diaSeleccionado = diaSelect.find(dia => dia.id === props.horario.dia);
    const nombreDia = diaSeleccionado ? diaSeleccionado.dia : 'Día no válido';

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {

                }}
                onClose={props.handleCloseModalInfo}
            >

                <div className="relative flex flex-col min-w-0 w-80 break-words bg-white border-0 rounded-2xl bg-clip-border p-3 gap-4 pb-6">

                    <div className="flex justify-between py-1 mx-2">
                        <h6 className=" font-bold text-lg"> {props.horario.asignatura}</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModalInfo}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-2">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="grid grid-cols-1 md:grid-cols-1 m-4">
                                    <div className="text-sm flex flex-col gap-1">
                                        <p>
                                            Instructor:
                                            <span className="ml-2 text-blue-700 font-bold">
                                                {props.horario.docente?.trim() ? (
                                                    props.horario.docente
                                                ) : (
                                                    <span className="bg-yellow-300 text-white px-2 py-0.5 rounded-lg">Sin asignar</span>
                                                )}
                                            </span>
                                        </p>

                                        <p>Capacidad:
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.capacidad}</span>
                                        </p>
                                        <p>Día:
                                            <span className="ml-2 text-blue-700 font-bold">{nombreDia}</span>
                                        </p>
                                        <p>
                                            Horario
                                            :

                                            <span className="mx-2 text-blue-700 font-bold">{props.horario.horaIni?.slice(0, -3)}</span>
                                            -
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.horaFin?.slice(0, -3)}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-between px-2">
                        <button className="flex items-center rounded border-md border-yellow-500 bg-yellow-500 text-white p-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 active:ring-yellow-400 gap-2"
                            onClick={() => {
                                props.handleCloseModalInfo();
                                //props.handleOpenModalHorarioDetProcesoEditar()
                                props.handleOpenModalDetEditar()
                            }}
                        >
                            <i className="bi bi-pencil-fill" /> Editar detalle
                        </button>
                        <button className="flex items-center rounded border-md border-blue-500 bg-blue-500 text-white p-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-green-400 gap-2"
                            onClick={() => {
                                props.handleCloseModalInfo();
                                props.handleOpenModalGeneralEditar()
                            }}
                        >
                            <i className="bi bi-calendar2-week" /> General
                        </button>
                    </div>

                    {/* <div className="relative flex flex-wrap justify-center mt-4">
    <span className="text-xs mb-2">
        Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
    </span>
</div> */}
                </div>
            </CustomModal>
        </>
    )
}

export default VistaPreviaDetalle