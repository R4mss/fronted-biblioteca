import { useEffect, useRef, useState } from "react";
import { CiclosMatriculablesIdiomas } from '../../network/rest/idiomas.network';
import Listas from '../../model/interfaces/Listas.model.interface';
// import Sweet from '../../../model/interfaces/Sweet.mode.interface'
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";
import Response from "../../model/class/response.model.class";
import CiclosInfo from '../../model/interfaces/matricula/ciclosInfo';
import { useSelector } from "react-redux";
import { RootState } from '../../store/configureStore.store';
import { Bandera } from '../../component/Iconos';
import { useNavigate } from "react-router-dom";
// import Estudiante from "../../model/interfaces/login/estudiante.login";
// import Trabajador from "../../model/interfaces/login/trabajador.login";
// import { images } from '../../helper/index.helper'




const Consolidado = () => {
    const [ciclosDisponibles, setCiclosDisponibles] = useState<CiclosInfo[]>([]); // Suponiendo que Listas sea el tipo correcto para los ciclos
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const navigate = useNavigate()
    console.log(ciclosDisponibles)
    // const [show, setShow] = useState<boolean>(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const abortController = useRef(new AbortController());


    const tipoUser = JSON.parse(window.localStorage.getItem("tipoUsuario") || "");
    console.log(tipoUser)



    useEffect(() => {
        LoadCiclosDisponibles()
    }, [])

    const LoadCiclosDisponibles = async () => {

        setCiclosDisponibles([])

        const response = await CiclosMatriculablesIdiomas<Listas>(codigo, abortController.current)
        if (response instanceof Response) {
            // setComboBoxAsignatura(response.data.resultado as Asignatura[])
            //console.log(response.data.resultado)
            setCiclosDisponibles(response.data.resultado as CiclosInfo[]);

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }



    return (
        <>

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6 flex gap-3">
                    <span onClick={() => navigate(-1)} title="Atrás" role="button">
                        <i className="bi bi-arrow-left-circle-fill text-upla-100 hover:text-gray-500" />
                    </span>
                    <p className="text-upla-100 uppercase"> Resultado postulante</p>
                </h2>

                <div className="w-full">

                    <div className="flex flex-col shadow-md border-solid border-2 border-gray-300 ">
                        <div className="bg-teal-500 h-1 flex flex-col justify-center items-center"></div>

                        <div className="w-full  p-4">
                            <div className="bg-teal-400 rounded-md p-4 flex items-center">
                                <div className="bg-teal-500 rounded-full p-3 mr-4">
                                    <Bandera className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-white">Resultado Postulante:</h2>
                                    <h3 className="text-gray-200">Te mostramos los resultados del estudiante</h3>

                                </div>
                            </div>
                        </div>

                        {
                            // ciclosDisponibles.map((ciclo, index) => (
                            //     <div key={index} className="bg-white rounded-lg shadow-md border border-300 p-8 mt-4  mx-4 flex flex-col justify-center items-center">
                            //         <h2 className="text-center text-2xl font-semibold mb-4 flex items-center">
                            //             <Boleta className="w-5 h-5 mr-2" />
                            //             Resultado Postulante
                            //         </h2>
                            //         <p className="text-center mb-4">{codigo}</p>
                            //         <img
                            //             className=" p-1 m-auto w-28 h-28 rounded-full ring-2 ring-gray-300 hover:scale-110 ease-in duration-300"
                            //             src={`https://academico.upla.edu.pe/FotosAlum/037000${codigo}.jpg`}
                            //             onError={({ currentTarget }) => {
                            //                 currentTarget.onerror = null; // prevents looping
                            //                 const imgError = new Image();
                            //                 imgError.src = images.no_user; // Establece la ruta de la imagen alternativa
                            //                 imgError.className = "p-2 m-auto w-24 h-24 rounded-full ring-2 ring-gray-300 hover:scale-110 ease-in duration-300";
                            //                 imgError.alt = "Error avatar";

                            //                 currentTarget.parentNode?.replaceChild(imgError, currentTarget);
                            //             }}
                            //             alt="Rounded avatar"
                            //         />
                            //     </div>
                            // ))
                        }

                        <div className="mt-6 md:mt-0">

                        </div>


                        {
                            // ciclosDisponibles.map((ciclo, index) => ( 


                            //     <div className="flex flex-wrap" key={index}>
                            //         {/* Tarjeta 1 */}
                            //         <div className="w-full  p-4">
                            //             <div className="rounded-md border justify-center text-center border-gray-300 p-4 flex items-center">
                            //                 <div>
                            //                     <h2 className="text-xl font-bold mb-2">{codigo}</h2>
                            //                     <h3 className="">Código</h3>
                            //                 </div>
                            //             </div>
                            //         </div>

                            //         Tarjeta 2
                            //         <div className="w-full sm:w-1/2 p-4">
                            //             <div className="rounded-md border justify-center text-center border-gray-300 p-4 flex items-center">
                            //                 <div>
                            //                     <h2 className="text-xl TEX font-bold mb-2">YANG YHONATAN QUINTANA ORE</h2>
                            //                     <h3 className="">Estudiante</h3>
                            //                 </div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // ))
                        }


                        <div className="p-6">
                            {/* Tabla de Datos */}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right">
                                    <thead className="text-xs text-white uppercase h-16 bg-teal-500 dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Código</th>
                                            <th scope="col" className="px-6 py-3">Descripción</th>
                                            <th scope="col" className="px-6 py-3">Tipo</th>
                                            <th scope="col" className="px-6 py-3">Resolución</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Consolidado;
