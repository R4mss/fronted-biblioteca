import { useEffect, useRef, useState } from "react";
import { ReporteMatricula } from '../../../network/rest/idiomas.network';
import Listas from '../../../model/interfaces/Listas.model.interface';
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";
import Response from "../../../model/class/response.model.class";
import ReportesInfo from '../../../model/interfaces/trabajador/reportesInfo'

import { Bandera } from '../../../component/Iconos';


const Consolidado = () => {
    const [reportesDisponibles, setReporteDisponible] = useState<ReportesInfo[]>([]); // Suponiendo que Listas sea el tipo correcto para los ciclos

    const abortController = useRef(new AbortController());


    const tipoUser = JSON.parse(window.localStorage.getItem("tipoUsuario") || "");
    console.log(tipoUser)

    useEffect(() => {
        LoadCiclosDisponibles()
    }, [])

    const LoadCiclosDisponibles = async () => {

        setReporteDisponible([])

        const response = await ReporteMatricula<Listas>( abortController.current);
        if (response instanceof Response) {
            console.log(response.data);
            setReporteDisponible(response.data.resultado as ReportesInfo[]);
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage());
        }
    }



    return (
        <>

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Reporte de Matriculados</h2>

                <div className="w-full">
 
                    <div className="flex flex-col shadow-md border-solid border-2 border-gray-300 ">
                        <div className="bg-teal-500 h-1 flex flex-col justify-center items-center"></div>

                        <div className="w-full  p-4">
                        <div className="bg-teal-400 rounded-md p-4 flex items-center">
                            <div className="bg-teal-500 rounded-full p-3 mr-4">
                                <Bandera className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-white">Información</h2>
                                <h3 className="text-gray-200">Te mostramos el consolidado de matriculados</h3>
                                <h3 className="text-gray-200">El reporte pertence al perido académico 202401 y es la que fue eligida hasta la fecha 28/12/2023.</h3>

                            </div>
                        </div>
                    </div>


                            </div>
                        

                        <div className="p-6">
                            <h2 className="text-xl mb-5">Reporte de matriculados</h2>


                            {/* Tabla de Datos */}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-center rtl:text-right">
                                    <thead className="text-xs text-white uppercase h-16 bg-teal-500 dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">Código</th>
                                            <th scope="col" className="px-6 py-3">Nombres</th>
                                            <th scope="col" className="px-6 py-3">Facultad</th>
                                            <th scope="col" className="px-6 py-3">Carrera</th>
                                            {/* <th scope="col" className="px-6 py-3">Aula</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportesDisponibles.map((ciclo, index) => (
                                            <tr key={index} className="border-">
                                                {/* Renderizar los datos en las celdas */}
                                                <td className="px-6 py-4">{ index +1}</td>
                                                <td className="px-6 py-4">{ciclo.codigo}</td>
                                                <td className="px-6 py-4">{ciclo.estPaterno +' '+ciclo.estMaterno + ' ' +ciclo.estNombres}</td>
                                                <td className="px-6 py-4">{ciclo.facultad}</td>
                                                <td className="px-6 py-4">{ciclo.carrera}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    );
};

export default Consolidado;
