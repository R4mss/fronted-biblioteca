import { useEffect, useRef, useState } from "react";
import { CiclosMatriculablesIdiomas } from '../../../network/rest/idiomas.network';
import Listas from '../../../model/interfaces/Listas.model.interface';
// import Sweet from '../../../model/interfaces/Sweet.mode.interface'
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";
import Response from "../../../model/class/response.model.class";
import CiclosInfo from '../../../model/interfaces/matricula/ciclosInfo';
import { useSelector } from "react-redux";
import { RootState } from '../../../store/configureStore.store';
import { Barras, Bandera, Matricula } from '../../../component/Iconos';
import ModalVistaHorario from './modal/ListasHorarios'

type Props = {
    handleMatriculaProceso: () => void;
}

const MatriculaProceso = (props: Props) => {

    const [ciclosDisponibles, setCiclosDisponibles] = useState<CiclosInfo[]>([]); // Suponiendo que Listas sea el tipo correcto para los ciclos
    
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [show, setShow] = useState<boolean>(false);

    const [asigId, setAsiId] = useState("")


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const abortController = useRef(new AbortController());

    useEffect(() => {
        LoadCiclosDisponibles()
    }, [])

    const LoadCiclosDisponibles = async () => {

        setCiclosDisponibles([])

        const response = await CiclosMatriculablesIdiomas<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const data = response.data.resultado as CiclosInfo[]
            setCiclosDisponibles(data);
            //console.log(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    console.log(ciclosDisponibles)

    return (
        <>

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={() => props.handleMatriculaProceso()} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registrar Matricula</h2>

                <div className="w-full">


                    <ModalVistaHorario
                        show={show}
                        hide={handleClose}
                        cicloMatriculable={ciclosDisponibles}
                        asigId={asigId}
                    />

                    <div className="flex flex-col shadow-md border border-gray-300 ">
                        <div className="bg-green-400 h-1 flex flex-col justify-center items-center"></div>

                        {ciclosDisponibles.map((ciclo, index) => (
                            <div className="flex flex-wrap" key={index}>
                                {/* Tarjeta 1 */}
                                <div className="w-full p-4">
                                    <div className="bg-green-500 rounded-md p-4 flex items-center">
                                        <div className="bg-green-400 rounded-full p-3 mr-4">
                                            <Bandera className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold mb-2 text-white">Inglés - Nivel {Number(ciclo.nivelAsign) - 1}</h2>
                                            <h3 className="text-gray-200">Último ciclo completado</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Tarjeta 2 */}
                                {/* <div className="w-full sm:w-1/2 p-4">
                                    <div className="bg-orange-500 rounded-md p-4 flex items-center">
                                        <div className="bg-orange-400 rounded-full p-3 mr-4">
                                            <Bandera className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold mb-2 text-white">Super Intensivo Online</h2>
                                            <h3 className="text-gray-200">Modalidad</h3>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        ))}

                        {ciclosDisponibles.map((ciclo, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md border border-300 p-8 mt-4  mx-4 flex flex-col justify-center items-center">
                                <h2 className="text-center text-2xl font-semibold mb-4 flex items-center">
                                    <Bandera className="w-4 h-4 mr-2" />
                                    Idioma: Inglés
                                    <Barras className="w-3 h-3 mr-2 ml-5" />
                                    Ciclo {ciclo.nivelAsign}
                                </h2>
                                {/* <p className="text-center mb-4">Modalidad: Super Intensivo Online</p> */}
                                {/* <p className="text-center">Clases: del 02/01/2023 al 31/12/2023</p> */}
                            </div>
                        ))}


                        <div className="p-6">
                            <h2 className="text-xl mb-5">Nivel </h2>

                            {/* Tabla de Datos */}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right">
                                    <thead className="text-xs text-white uppercase bg-yellow-400 dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">Nivel</th>
                                            <th scope="col" className="px-6 py-3">Descripción</th>
                                            <th scope="col" className="px-6 py-3">Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ciclosDisponibles.map((ciclo, index) => (
                                            <tr key={index} className="border-b border-blue-400">

                                                <td className="px-6 py-4"><Matricula className="w-8 h-8 mr-2 ml-5" /></td>
                                                <td className="px-6 py-4">{ciclo.nivelAsign}</td>
                                                <td className="px-6 py-4">{ciclo.nombreAsign}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        className="bg-emerald-400 text-white px-4 py-2 rounded font-semibold"
                                                        onClick={() => {
                                                            setAsiId(ciclo.codigoAsign)

                                                            handleShow()
                                                        }}>
                                                            Seleccionar
                                                        </button>
             
                                                </td>
                                            </tr>
                                        ))}
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

export default MatriculaProceso;
