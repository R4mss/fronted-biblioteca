//import Paginacion from "@/component/Paginacion.component";
import { LoaderSvg } from "@/component/Svg.component";

const ComponenteNotas = () => {

    const loading = false
    const mensajeCarga = true

    const notas: any = [
        {
            idNota: '1',
            asignatura: 'Ingles 1',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 2',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 3',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 4',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 5',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 6',
            modalidad: 'INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 7',
            modalidad: 'SUPER INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
        {
            idNota: '1',
            asignatura: 'Ingles 8',
            modalidad: 'SUPER INTENSIVO',
            tareaAcademica: {
                notaA: 17,
                notaB: 17,
                notaC: 20,
                notaD: 20,
                notaE: 17,
                notaI: 17,
                notaTA: 18.00
            },
            examen: {
                notaF1: 19,
                notaF2: 13,
                notaPF: 16.00,
                notaG: 20,
                notaH: 13,
                notaEX: 16.30,
            },
            notaProm: 17
        },
    ]

    return (
        <>
            <div className="relative overflow-auto rounded-md p-6">
                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="tablaNotas">
                    <thead className="align-bottom">
                        <tr>
                            <th className="bg-white" colSpan={4}></th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" colSpan={5}>TAREA ACADÉMICA</th>
                            <th className="bg-gray-200"></th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" colSpan={5}>EXAMEN</th>
                            <th className="bg-gray-200"></th>
                            <th className="bg-gray-300"></th>
                        </tr>
                        <tr>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" style={{ width: '5%' }}>#</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" style={{ width: '10%' }}>Asignatura</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">Modalidad</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100"></th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" title="Reading">A</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" title="Writing">B</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" title="Listening">C</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100" title="Speaking">D</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">I</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-200">TA</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">F1</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">F2</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-200">PF</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">G</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-100">H</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 text-xs bg-gray-200">EX</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-upla-100 bg-gray-300">PRM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            loading ? (
                                <tr className="text-center bg-white border-b">
                                    <td colSpan={10} className="text-sm p-2 border-b border-solid">
                                        <div className="flex items-center justify-center">
                                            <LoaderSvg /> <span>Cargando datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                notas.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={10} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td>
                                        </tr>
                                    )
                                    :
                                    (
                                        notas.map((item: any, index: any) => {

                                            return (
                                                <tr key={index} className="bg-white border-b"
                                                //title={formatDateTimeToFecha(item.fechaRegistra)}
                                                >
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{index + 1}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.asignatura}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{''}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tareaAcademica.notaA}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tareaAcademica.notaB}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tareaAcademica.notaC}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tareaAcademica.notaD}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tareaAcademica.notaI}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid bg-gray-200">{item.tareaAcademica.notaTA.toFixed(2)}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.examen.notaF1}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.examen.notaF2}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid  bg-gray-200">{item.examen.notaPF.toFixed(2)}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.examen.notaG}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.examen.notaH}</td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid  bg-gray-200">{item.examen.notaEX.toFixed(2)}</td>
                                                    <td className="p-2 text-center align-middle border-b border-solid font-semibold">{item.notaProm}</td>
                                                </tr>
                                            );
                                        })
                                    )
                            )

                        }
                    </tbody>
                </table>
            </div>

            {/*<div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                <div>
                    <span className="text-sm font-normal text-gray-900 ">Mostrando
                        <span className="font-semibold text-gray-900">
                            {paginacion.current}-{totalPaginacion.current}
                        </span>
                        de
                        <span className="font-semibold text-gray-900">
                            {filasPorPagina.current}
                        </span>filas </span>

                </div>
                <nav className="bg-white rounded-md">
                    <ul className="flex">

                        <Paginacion
                            loading={loading}
                            restart={restart.current}
                            paginacion={paginacion.current}
                            totalPaginacion={totalPaginacion.current}
                            fillTable={paginacionTable}
                        />

                    </ul>
                </nav>
            </div>*/}

        </>
    )
}

export default ComponenteNotas
