import { useEffect, useState } from "react";
import CustomModal from "../../../../component/Modal.component";
import { ListarCalendariosActivos } from "@/network/rest/idiomas.network";
import Listas from "@/model/interfaces/Listas.model.interface";
import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";
import { convertirFormatoFechaSql, convertirNumeroAMes } from "@/helper/herramienta.helper";

type Props = {
    isOpenModal: boolean,
    handleCloseModal: () => void
}

const HorarioAgregar = (props: Props) => {

    const [listaCalendario, setListaCalendario] = useState<any[]>([])

    useEffect(() => {
        LoadCalendario()
    }, [])

    const LoadCalendario = async () => {

        const response = await ListarCalendariosActivos<Listas>()
        if (response instanceof Response) {
            //console.log(response.data)
            setListaCalendario(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
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
                        <h6 className="py-1 font-bold text-lg uppercase">Calendarios Activos</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModal}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4">
                        <div className="relative overflow-auto my-6">
                            <table className="w-full text-gray-700 uppercase" id="miTabla">
                                <thead className="align-middle font-bold text-center text-white text-xs">
                                    <tr className="text-sm">
                                        <th colSpan={3} className="bg-white"></th>
                                        <th colSpan={2} className="py-3 bg-upla-100 rounded-tl-md">Proceso</th>
                                        <th colSpan={2} className="py-3 bg-upla-100 rounded-tr-md">Matrícula</th>
                                    </tr>
                                    <tr className="bg-upla-100">
                                        <th className="px-4 py-2 rounded-tl-md" style={{ width: '5%' }}>#</th>
                                        <th className="px-16 py-2">Año</th>
                                        <th className="px-12 py-2">Tipo Estudio</th>
                                        <th className="px-6 py-2">Inicio</th>
                                        <th className="px-6 py-2">Fin</th>
                                        <th className="px-6 py-2">Inicio</th>
                                        <th className="px-6 py-2">Fin</th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {
                                        listaCalendario.length == 0 ?
                                            (
                                                <tr className="text-center bg-white border-b">
                                                    <td colSpan={7} className="text-sm p-2 border-b border-solid">No hay datos para mostrar.</td>
                                                </tr>
                                            )
                                            :
                                            (
                                                listaCalendario.map((item, index) => {

                                                    return (
                                                        <tr key={index} className={`${(index%2 == 0)? "bg-white" : "bg-gray-100" } text-sm text-center`}>
                                                            <td className="p-2">{index+1}</td>
                                                            <td className="p-2">{item.anio +' - '+ convertirNumeroAMes(item.mes)}</td>
                                                            <td className="p-2">{item.tipoEstudio}</td>
                                                            <td className="p-2 px-4">{convertirFormatoFechaSql(item.f_cal_ini)}</td>
                                                            <td className="p-2 px-4">{convertirFormatoFechaSql(item.f_cal_fin)}</td>
                                                            <td className="p-2 px-4">{convertirFormatoFechaSql(item.f_mat_ini)}</td>
                                                            <td className="p-2 px-4">{convertirFormatoFechaSql(item.f_mat_fin)}</td>
                                                        </tr>
                                                    );
                                                })

                                            )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </CustomModal>
        </>
    )
}

export default HorarioAgregar