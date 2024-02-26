import { LoaderSvg } from "@/component/Svg.component";
import { NavLink, useNavigate } from "react-router-dom";

const ListaAulas = () => {

    const navigate = useNavigate()

    const listaAula = [
        {
            id: 1,
            idiomaNombre: "Ingles",
            sede: "Huancayo",
            modalidad: "Presencial",
            anio: "2024",
            mes: "1",
            aulaNombre: "Aula A1",
            turno: "Mañana",
            programa: "Pregrado",
        },
        {
            id: 2,
            idiomaNombre: "Ingles",
            sede: "Huancayo",
            modalidad: "Presencial",
            anio: "2024",
            mes: "1",
            aulaNombre: "Aula A2",
            turno: "Mañana",
            programa: "Pregrado",
        },
    ]

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Lista Asignada al Docente</h2>

                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mb-6">
                            <div
                                className="border-b-2 border-gray-200 p-2 flex justify-between">
                                <div className="font-semibold my-2">
                                    Se muestras la siguiente listas de aulas asignadas  al docente:
                                </div>
                            </div>
                            
                        </div>

                        <div className="relative overflow-auto rounded-md my-6">
                            
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                <thead className="align-bottom">
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '10%' }}>Idioma</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidad</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Turno</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Programa</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        false ? (
                                            <tr className="text-center bg-white border-b">
                                                <td colSpan={10} className="text-sm p-2 border-b border-solid">
                                                    <div className="flex items-center justify-center">
                                                        <LoaderSvg /> <span>Cargando datos...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            false ?
                                                (
                                                    <tr className="text-center bg-white border-b">
                                                        <td colSpan={10} className="text-sm p-2  border-b border-solid">{true == true ? "Seleccione Idioma, Sede, Modalidad para buscar" : "No hay datos para mostrar."}</td>
                                                    </tr>
                                                )
                                                :
                                                (
                                                    listaAula.map((item, index) => {

                                                        return (
                                                            <tr key={index} className="bg-white border-b">
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.idiomaNombre}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.sede}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio} - {item.mes}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.aulaNombre}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.turno}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.programa}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                    {/* <button
                                                                        title="Editar"
                                                                        className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                        onClick={() => {}}
                                                                    >
                                                                        <i className="bi bi-pencil-fill text-sm"></i>

                                                                    </button> */}
                                                                    {" "}
                                                                    <NavLink
                                                                        to={"/inicio/notas-reporte-subir"}
                                                                    >
                                                                        <button
                                                                            title="Detalle"
                                                                            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                            onClick={() => { }}
                                                                        >
                                                                            <i className="bi bi-list text-sm"></i>

                                                                        </button>
                                                                    </NavLink>
                                                                    {" "}
                                                                    {/* <button
                                                                        title="Borrar"
                                                                        className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md px-2 py-1"
                                                                    // onClick={() => onEventDetalle(item.codigo)}
                                                                    >
                                                                        <i className="bi bi-trash3-fill text-sm"></i>

                                                                    </button> */}

                                                                </td>


                                                            </tr>
                                                        );
                                                    })
                                                )
                                        )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaAulas