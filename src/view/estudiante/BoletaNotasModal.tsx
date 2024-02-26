import { useRef, useState } from "react";

import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";

import CustomModal from "@/component/Modal.component"
import { NotaFinalEstudianteDetMatriculaId, NotasEstudianteDetMatriculaId, } from "@/network/rest/idiomas.network";
import Listas from "@/model/interfaces/Listas.model.interface";
import RespValue from "@/model/interfaces/RespValue.model.interface";


type Props = {
    show: boolean;
    item: any
    detMatriculaId: number
    hide: () => void;

};


const BoletasNotasModal = (props: Props) => {


    const [notasPromedio, setNotasPromedio] = useState<any[]>([])

    const [notaFinal, setNotaFinal] = useState(0) 

    const abortController = useRef(new AbortController());


    const registroNotas = async () => {
        setNotasPromedio([])

        const response = await NotasEstudianteDetMatriculaId<Listas>(props.detMatriculaId, abortController.current)
        if (response instanceof Response) {
            setNotasPromedio(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        
    }

    const promedioFinal = async () =>{
        setNotasPromedio([])

        const response = await NotaFinalEstudianteDetMatriculaId<RespValue>(props.detMatriculaId, abortController.current)

        if (response instanceof Response) {
            setNotaFinal(parseFloat(response.data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    return (

        <CustomModal
            isOpen={
                props.show
            }
            onOpen={() => {
                registroNotas()
                promedioFinal()
            }}
            onHidden={() => {

            }}
            onClose={
                props.hide
            }
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">

                    <div className="flex justify-between w-11/12">
                        <h6 className="py-1 font-bold text-lg"> Mis Notas</h6>
                    </div>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}
                    >
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                <br/>

                <div className="relative overflow-auto rounded-md my-3 overflow-y-auto">
                    <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                        <thead className="bg-upla-100 text-white">
                            <tr>
                                <th className="py-1 px-6">#</th>
                                <th className="py-1 px-6">Descripción</th>
                                <th className="py-1 px-6">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                notasPromedio.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={6} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                        </tr>
                                    ) : (
                                        notasPromedio.map((obj, index) => (

                                            <tr key={index} className="text-sm">
                                                <td className="border p-2">{++index}</td>
                                                <td className="text-center border p-2">{obj.calificacionDesc}</td>
                                                <td className="border p-2">{obj.nota}</td>
                                            </tr>

                                        ))
                                    )

                            }
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2 mt-0">
                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                        <div className="m-2">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <div className="text-sm">
                                    <p>Condición: 
                                        <span className="text-blue-700 font-bold">
                                        { 
                                            notasPromedio.length == 0 ? '-' : 
                                            notaFinal > 10.5? 'APROBADO': 'DESAPROBADO'
                                        }
                                        </span>
                                    </p>
                                    <p>Promedio Final: <span className="text-blue-700 font-bold">
                                        {
                                            notasPromedio.length == 0 ? '-' : 
                                            notaFinal
                                        }
                                    </span></p>
                                </div>
                                {/* <div className="text-sm">
                                    <p>Condición: <span className="text-blue-700 font-bold">{0}</span></p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </CustomModal>

    )
}

export default BoletasNotasModal
