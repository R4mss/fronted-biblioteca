import { useNavigate } from "react-router-dom"

const Busqueda = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                    <div className="p-1 bg-Solid">
                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Consultar Bibliografia</h2>

                        <div className="w-full">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Nombre del libro <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        maxLength={8}
                                        type="text"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-white"
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Palabras clave o Contenido <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        maxLength={8}
                                        type="text"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-white"
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Autor <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        maxLength={8}
                                        type="text"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-white"
                                        onChange={() => { }}

                                    />
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div >
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Opciones
                                    </label>
                                    <div className="relative flex flex-wrap justify-between">
                                        <button

                                            className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                            onClick={() => { }}
                                        >
                                            <i className="bi bi-search mr-1"></i> Consultar
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="relative overflow-auto rounded-md my-6">
                                <p className="text-lg font-bold m-1">LISTA DE LIBROS</p>
                                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                    <thead className="align-bottom">
                                        <tr>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Codigo</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Titulo</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Autor</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fecha</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Cantidad</th>
                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className="bg-white border-b">
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'1'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'FCS-24N52'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'Gerodontología clínica'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'José María Martínez-González, ...'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'2023 - 04 - 15'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'2'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-solid flex justify-center gap-2">
                                                <button
                                                    title="SOLICITAR LIBRO"
                                                    className="focus:outline-none text-white bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 rounded-md px-2 py-1"
                                                    onClick={() => {}}
                                                >
                                                    <i className="bi bi-journal-plus text-sm"></i>
                                                </button>
                                                <button
                                                    title="INFORMACION DEL LIBRO"
                                                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                    onClick={() => {}}
                                                >
                                                    <i className="bi bi-journal-bookmark-fill text-sm"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'2'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'FCS-24N53'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'Gerodontología clínica'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'Marte Guerra, ...'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'2022 - 02 - 18'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{'1'}</td>
                                            <td className="text-sm p-2 text-center align-middle border-solid flex justify-center gap-2">
                                                <button
                                                    title="SOLICITAR LIBRO"
                                                    className="focus:outline-none text-white bg-violet-400 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 rounded-md px-2 py-1"
                                                    onClick={() => {}}
                                                >
                                                    <i className="bi bi-journal-plus text-sm"></i>
                                                </button>
                                                <button
                                                    title="INFORMACION DEL LIBRO"
                                                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                    onClick={() => {}}
                                                >
                                                    <i className="bi bi-journal-bookmark-fill text-sm"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Busqueda