import { useNavigate, NavLink } from 'react-router-dom';

const ReporteDeNotas = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Notas</h2>

                            <div className="flex flex-col gap-5">
                                <div className="bg-gray-200 mx-5 p-3 rounded-lg">
                                    <NavLink to={'/inicio/subir-notas'}>
                                        <div className='flex justify-around items-center'>

                                            <h2>Idioma: Ingles I</h2>

                                            <h2>Aula: 1</h2>

                                            <h2>Estudiantes: 30</h2>

                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Notas
                                            </button>

                                        </div>
                                    </NavLink>
                                </div>
                                <div className="bg-gray-200 mx-5 p-3 rounded-lg">
                                    <NavLink to={'/inicio/subir-notas'}>
                                        <div className='flex justify-around items-center'>
                                            <h2>Idioma: Ingles II</h2>

                                            <h2>Aula: 1</h2>

                                            <h2>Estudiantes: 20</h2>

                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Notas
                                            </button>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="bg-gray-200 mx-5 p-3 rounded-lg">
                                    <NavLink to={'/inicio/subir-notas'}>
                                        <div className='flex justify-around items-center'>
                                            <h2>Idioma: Ingles III</h2>

                                            <h2>Aula: 10</h2>

                                            <h2>Estudiantes: 25</h2>

                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Notas
                                            </button>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReporteDeNotas