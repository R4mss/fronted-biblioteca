import { useNavigate, NavLink } from 'react-router-dom';


const ListaClasesAsignados = () => {

    const navigate = useNavigate()

    const data = [
        {
            id: 1,
            idioma: 'Ingles',
            sede: 'Huancayo',
            modalidad: 'virtual',
            aula: '-',
            horarioID: 1,
            notasID: 1,
        },
        {
            id: 2,
            idioma: 'Italiano',
            sede: 'Huancayo',
            modalidad: 'virtual',
            aula: '-',
            horarioID: 1,
            notasID: 1,
        },
    ]

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Horarios</h2>

                            <div className="w-full">

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            // ref={refIdioma}
                                            value={0}
                                            // value={idIdioma}
                                            onChange={() => {/*/
                                                const selectedIdiomaId = event.currentTarget.value;
                                                setIdIdioma(selectedIdiomaId);

                                                const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                                if (selectedIdioma) {
                                                    setNombreIdioma(selectedIdioma.idiomaNombre);
                                                } else {
                                                    setNombreIdioma("");
                                                }
                                            /*/}}
                                        >
                                            <option value="0">- Seleccione -</option>
                                            {/*/
                                                comboBoxIdioma.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.idiomaId}>
                                                            {item.idiomaNombre}
                                                        </option>
                                                    );
                                                })
                                            /*/}
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Sede <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            // ref={refSede}
                                            // value={idSede}
                                            value={0}
                                            onChange={() => {/*/
                                                const selectedSedeId = event.currentTarget.value;
                                                setIdSede(selectedSedeId);

                                                const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                                if (selectedSede) {
                                                    setNombreSede(selectedSede.sede);
                                                } else {
                                                    setNombreSede("");
                                                }
                                            /*/}}
                                        >
                                            <option value="0">- Seleccione -</option>
                                            {/*/
                                                comboBoxSede.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.sedeId}>
                                                            {item.sede}
                                                        </option>
                                                    );
                                                })
                                            /*/}

                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            // ref={refModalidad}
                                            // value={idModalidad}
                                            value={0}
                                            onChange={() => {/*/
                                                const selectedModalidadId = event.currentTarget.value;
                                                setIdModalidad(parseInt(selectedModalidadId));

                                                const selectedModalidad = comboBoxModalidad.find(item => item.modalidadId === parseInt(selectedModalidadId));

                                                if (selectedModalidad) {
                                                    setNombreModalidad(selectedModalidad.modalidad);
                                                } else {
                                                    setNombreModalidad("");
                                                }
                                            /*/}}
                                        >
                                            <option value={0}>- Seleccione -</option>
                                            {/*/
                                                comboBoxModalidad.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.modalidadId}>
                                                            {item.modalidad}
                                                        </option>
                                                    );
                                                })
                                            /*/}

                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Opciones
                                        </label>
                                        <div className="relative flex flex-wrap">
                                            <button
                                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                            >
                                                <i className="bi bi-search mr-1"></i> BUSCAR
                                            </button>
                                            {/* <button
                                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                                // onClick={NuevoHorario}
                                                onClick={() => { }}
                                            >
                                                <i className="bi bi-plus-circle-fill mr-1"></i> NUEVO
                                            </button> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-auto rounded-md my-6">
                                    <table className="w-full text-gray-700 bg-upla-100 border">
                                        <thead>
                                            <tr className="text-white">
                                                <th className="px-6 py-3 font-bold text-center">#</th>
                                                <th className="px-6 py-3 font-bold text-center">Idioma</th>
                                                <th className="px-6 py-3 font-bold text-center">Sede</th>
                                                <th className="px-6 py-3 font-bold text-center">Modalidad</th>
                                                <th className="px-6 py-3 font-bold text-center">Aula</th>
                                                <th className="px-6 py-3 font-bold text-center">Ver Horario</th>
                                                <th className="px-6 py-3 font-bold text-center">Notas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={index} className="text-center bg-white border-b">
                                                    <td className="px-6 py-4">{item.id}</td>
                                                    <td className="px-6 py-4">{item.idioma}</td>
                                                    <td className="px-6 py-4">{item.sede}</td>
                                                    <td className="px-6 py-4">{item.modalidad}</td>
                                                    <td className="px-6 py-4">{item.aula}</td>
                                                    <td className="px-6 py-4">
                                                        <NavLink to={'/inicio/vista-horario'}>
                                                            <button
                                                                className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:ring ring-yellow-300 focus:outline-none"
                                                                onClick={() => { }}
                                                            >
                                                                <i className="bi bi-calendar text-xs text-white"></i>
                                                            </button>
                                                        </NavLink>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:ring ring-green-300 focus:outline-none"
                                                            onClick={() => { }}
                                                        >
                                                            <i className="bi bi-file-earmark-text text-xs text-white"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                                    <div>

                                        {/* <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span> */}

                                    </div>
                                    <nav className="bg-white rounded-md">
                                        <ul className="flex">

                                            {/* <Paginacion
                                                loading={loading}
                                                restart={restart.current}
                                                paginacion={paginacion.current}
                                                totalPaginacion={totalPaginacion.current}
                                                fillTable={paginacionTable}
                                            /> */}

                                        </ul>
                                    </nav>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaClasesAsignados