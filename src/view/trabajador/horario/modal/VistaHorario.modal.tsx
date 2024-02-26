import CustomModal from "@/component/Modal.component";

type DatosType = {
    id: number;
    idAsign: number,
    asignatura: string,
    aula: string,
    sede: string,
    idsede: number,
    turno: string,
    idTurno: number,
    horario: string,
    idHorario: number,
    modalidad: string,
    idModalidad: number,
    tipo: string,
    idTipo: number,
    inscritos: number,
    capacidad: number,
    estado: number,
};

type Props = {
    data: DatosType | undefined;
    show: boolean;
    hide: () => void;
};

const ModalVistaHorario: React.FC<Props> = (props: Props) => {

    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {

            }}
            onHidden={() => {

            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">
                    <h6 className="py-1 font-bold text-lg"> Asignatura : {props.data?.asignatura}</h6>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>
                {/* <div className="w-full px-4 pb-2 pt-4">

                    

                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mt-3">
                        <div className="m-2">

                            <div>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Asignatura</th>
                                            <th className="py-2 px-6">Tipo</th>
                                            <th className="py-2 px-6">Horarios</th>
                                            <th className="py-2 px-6">Aula</th>
                                            <th className="py-2 px-6">Sede</th>
                                            <th className="py-2 px-6">Capacidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data?.id &&
                                            <tr className="text-center">
                                                <td className="border py-2">{props.data.asignatura}</td>
                                                <td className="border py-2">{props.data.tipo}</td>
                                                <td className="border py-2">{props.data.horario}</td>
                                                <td className="border py-2">{props.data.aula}</td>
                                                <td className="border py-2">{props.data.sede}</td>
                                                <td className="border py-2">{props.data.inscritos}/{props.data.capacidad}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </CustomModal>
    )
}

export default ModalVistaHorario;