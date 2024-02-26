import { useEffect, useRef, useState } from "react";
import { CiclosMatriculablesIdiomas, RegistroMatriculasEstudianteId } from '../../network/rest/idiomas.network';
import Listas from '../../model/interfaces/Listas.model.interface';
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";
import Response from "../../model/class/response.model.class";
import CiclosInfo from '../../model/interfaces/matricula/ciclosInfo';
import { useSelector } from "react-redux";
import { RootState } from '../../store/configureStore.store';
import { Bandera } from '../../component/Iconos';
import { useNavigate } from "react-router-dom";

import ModalNotas from './BoletaNotasModal'


const Consolidado = () => {

    const [ciclosDisponibles, setCiclosDisponibles] = useState<CiclosInfo[]>([]); // Suponiendo que Listas sea el tipo correcto para los ciclos
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [showModal, setShowModal] = useState<boolean>(false);
    const [item, setItem] = useState()
    const [detMatriculaId, setDetMatriculaId] = useState(0)

    const navigate = useNavigate()


    const [matriculas, setMatriculas] = useState<any[]>([])

    const abortController = useRef(new AbortController());


    const tipoUser = JSON.parse(window.localStorage.getItem("tipoUsuario") || "");


    useEffect(() => {
        //LoadCiclosDisponibles()
        LoadMisMatriculas()
    }, [])

    const LoadCiclosDisponibles = async () => {

        setCiclosDisponibles([])

        const response = await CiclosMatriculablesIdiomas<Listas>(codigo, abortController.current)
        if (response instanceof Response) {
            setCiclosDisponibles(response.data.resultado as CiclosInfo[]);

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadMisMatriculas = async () => {

        setMatriculas([])

        const response = await RegistroMatriculasEstudianteId<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            setMatriculas(response.data.resultado as any[]);

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const openModalNota = (item: any, detMatriculaId: number) => {
        setItem(item)
        setDetMatriculaId(detMatriculaId)
        setShowModal(true)
    }

    const closeModalNota = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <ModalNotas
                            show={showModal}
                            item={item}
                            detMatriculaId={detMatriculaId}
                            hide={closeModalNota}

                        />

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)}  title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Boleta de Notas</h2>
                            <div className="w-full">

                                <div className="w-full">



                                    <div className="w-full  p-4">
                                        <div className="bg-teal-400 rounded-md p-4 flex items-center">
                                            <div className="bg-teal-500 rounded-full p-3 mr-4">
                                                <Bandera className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold mb-2 text-white">Niveles</h2>
                                                {/* <h3 className="text-gray-200">Te mostramos el consolidado de matrícula</h3> */}

                                            </div>
                                        </div>
                                    </div>

                                    {/* {ciclosDisponibles.map((ciclo, index) => (
                                            <div key={index} className="bg-white rounded-lg shadow-md border border-300 p-8 mt-4  mx-4 flex flex-col justify-center items-center">
                                            <h2 className="text-center text-2xl font-semibold mb-4 flex items-center">
                                                <Boleta className="w-5 h-5 mr-2" />
                                                Notas del periodo -
                                                <Barras className="w-3 h-3 mr-2 ml-5" />
                                                Nº {ciclo.nivelAsign}
                                            </h2>
                                            <p className="text-center mb-4">Modalidad: Super Intensivo Online</p>
                                            <p className="text-center">Clases: del 02/01/2023 al 31/12/2023</p>
                                            </div>
                                            ))} 
                                        */}

                                    <div className="p-6">
                                        <h2 className="text-xl mb-5">Mis Matriculas: </h2>

                                        {/* Tabla de Datos */}
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left rtl:text-right">
                                                <thead className="text-xs text-white uppercase h-16 bg-teal-500 dark:text-white">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">#</th>
                                                        <th scope="col" className="px-6 py-3">Asignatura</th>
                                                        <th scope="col" className="px-6 py-3">Nivel</th>
                                                        <th scope="col" className="px-6 py-3">Modalidad</th>
                                                        <th scope="col" className="px-6 py-3">T. Estudio</th>
                                                        <th scope="col" className="px-6 py-3">Ver</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {matriculas.map((item, index) => (
                                                        <tr key={index} className="border-">
                                                            <td className="px-6 py-4">{++index}</td>
                                                            <td className="px-6 py-4">{item.asignatura}</td>
                                                            <td className="px-6 py-4">{item.asiNivel}</td>
                                                            <td className="px-6 py-4">{item.modalidad}</td>
                                                            <td className="px-6 py-4">{item.tipoEstudio}</td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    title="Ver Notas"
                                                                    className="flex items-center rounded border-md border-blue-500 bg-blue-500 text-white p-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                                                    onClick={() => openModalNota(item, item.detMatriculaId)}
                                                                >
                                                                    <i className="bi bi-eye-fill"></i>
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
                    </div>

                </div>
            </div >
        </>
    );
};

export default Consolidado;
