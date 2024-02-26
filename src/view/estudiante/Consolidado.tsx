import { useEffect, useRef, useState } from "react";
import { AsignaturasMatriculadosEstudiante, CiclosMatriculablesIdiomas, EstudianteHorariosMatriculados } from '../../network/rest/idiomas.network';
import Listas from '../../model/interfaces/Listas.model.interface';
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";
import Response from "../../model/class/response.model.class";
import CiclosInfo from '../../model/interfaces/matricula/ciclosInfo';
import { useSelector } from "react-redux";
import { RootState } from '../../store/configureStore.store';
import { Barras, Bandera } from '../../component/Iconos';
import { BiCalendar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { diaSelect } from "@/helper/herramienta.helper";


const Consolidado = () => {
    const [ciclosDisponibles, setCiclosDisponibles] = useState<CiclosInfo[]>([]); // Suponiendo que Listas sea el tipo correcto para los ciclos
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const navigate = useNavigate()

    const [asigMatriEst, setAsigMatriEst] = useState<any[]>([]);
    const [listaHorarioAsign, setListaHorarioAsign] = useState<any[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const abortController = useRef(new AbortController());


    useEffect(() => {
        LoadCiclosDisponibles()
        AsignaturasMatriculados()
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

    const AsignaturasMatriculados = async () => {
        const response = await AsignaturasMatriculadosEstudiante<Listas>(codigo)
        if (response instanceof Response) {

            const data = response.data.resultado

            if (data.length == 0) {
                return
            } else {
                setAsigMatriEst(response.data.resultado);
            }


        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const ListaEstHorAsigId = async (HorarioAsigId: number) => {
        const response = await EstudianteHorariosMatriculados<Listas>(HorarioAsigId, abortController.current)
        if (response instanceof Response) {


            const data = response.data.resultado

            setListaHorarioAsign(data)


        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const toggleVer = async (HorarioAsigId: number) => {

        setIsOpen(!isOpen)


        if (!isOpen) {
            await Promise.all([
                await ListaEstHorAsigId(HorarioAsigId),
            ])
        }


    };

    return (
        <>

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6 flex gap-3">
                    <span onClick={() => navigate(-1)} title="Atrás" role="button">
                        <i className="bi bi-arrow-left-circle-fill text-upla-100 hover:text-gray-500" />
                    </span>
                    <p className="text-upla-100 uppercase"> Consolidado de Matrícula </p>
                </h2>

                <div className="w-full">

                    <div className="flex flex-col shadow-md border-solid border-2 border-gray-300 ">
                        {/* <div className="bg-teal-500 h-1 flex flex-col justify-center items-center"></div> */}

                        <div className="w-full  p-4">
                            <div className="bg-teal-400 rounded-md p-4 flex items-center">
                                <div className="bg-teal-500 rounded-full p-3 mr-4">
                                    <Bandera className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-white">Información</h2>
                                    <h3 className="text-gray-200">Te mostramos el consolidado de las matrículas</h3>
                                    {/* <h3 className="text-gray-200">El ciclo pertence al perido académico 202401 y es la que fue eligida hasta la fecha 21/12/2023.</h3> */}

                                </div>
                            </div>
                        </div>

                        {ciclosDisponibles.map((ciclo, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md border border-300 p-8 mt-4  mx-4 flex flex-col justify-center items-center">
                                <h2 className="text-center text-2xl font-semibold mb-4 flex items-center">
                                    <BiCalendar className="w-5 h-5 mr-2" />
                                    Matrícula Actual :
                                    <Barras className="w-3 h-3 mr-2 ml-5" />
                                    {ciclo.nombreAsign}
                                </h2>
                                {/* <p className="text-center mb-4">Modalidad: Super Intensivo Online</p> */}
                                {/* <p className="text-center">Clases: del 02/01/2023 al 31/12/2023</p> */}
                            </div>
                        ))}

                        <div className="h-6"></div>

                    </div>


                    <div className="p-6">
                        <h2 className="text-xl mb-5">Horario - Sección</h2>


                        {/* Tabla de Datos */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-center rtl:text-right">
                                <thead className="text-xs text-white uppercase h-16 bg-teal-500 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-2 py-2">Asignatura</th>
                                        <th scope="col" className="px-2 py-2">Aula</th>
                                        <th scope="col" className="px-2 py-2">Sección</th>
                                        <th scope="col" className="px-2 py-2">Modalidad</th>
                                        <th scope="col" className="px-2 py-2">T. Estudio</th>
                                        <th scope="col" className="px-2 py-2">Turno</th>
                                        <th scope="col" className="px-2 py-2 w-64">Horario</th>
                                        <th scope="col" className="px-2 py-2">F. Registro</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {asigMatriEst.map((item, index) => (
                                        <tr key={index} className="text-sm">
                                            {/* Renderizar los datos en las celdas */}
                                            {/* <td className="px-1 py-2"><Matricula className="w-8 h-8 mr-2 ml-5" /></td> */}
                                            {/* <td className="px-6 py-2">{item.asigId}</td> */}
                                            <td className="px-1 py-2">{item.asignatura}</td>
                                            <td className="px-1 py-2">{item.aula}</td>
                                            {/* <td className="px-1 py-2">{item.aulaNombre}</td> */}
                                            <td className="px-1 py-2">{item.seccion}</td>
                                            <td className="px-1 py-2">{item.modalidad}</td>
                                            <td className="px-1 py-2">{item.tipoEstudio}</td>
                                            <td className="px-1 py-2">{item.turno}</td>
                                            <td className="px-1 py-2 flex flex-col w-64">
                                                <button
                                                    title="Ver horario"
                                                    className="focus:outline-none flex gap-2 m-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                    onClick={() => toggleVer(item.horarioAsigId)}

                                                >
                                                    <i className="bi bi-calendar3 text-sm" /> {!isOpen ? 'Mostrar horario' : 'Ocultar'}
                                                </button>

                                                {
                                                    isOpen && (

                                                        <div className="p-3 flex flex-col gap-1 m-auto w-56">
                                                            {listaHorarioAsign.map((horario, index) => {
                                                                const diaSeleccionado = diaSelect.find(dia => dia.id === horario.dia);
                                                                if (!diaSeleccionado) return null;

                                                                return (
                                                                    <div key={index} className="border p-1 rounded flex justify-between items-center">
                                                                        <div className="font.semibold">{diaSeleccionado.dia}</div>
                                                                        <div className="text-gray-900">{`${horario.horaIni.slice(0, -3)} - ${horario.horaFin.slice(0, -3)}`}</div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )
                                                }
                                            </td>
                                            <td className="px-1 py-2">{new Date(item.fechRegistro).toLocaleString().slice(0,-9)}</td>
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


