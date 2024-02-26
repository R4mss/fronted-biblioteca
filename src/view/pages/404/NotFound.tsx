import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-gradient-to-r from-blue-300 to-teal-100">
                <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                        <div className="border-t border-gray-200 text-center pt-8">
                            <h1 className="text-9xl font-bold text-blue-400">404</h1>
                            <h1 className="text-6xl font-medium py-8">ups! Pagina no encontrada</h1>
                            <p className="text-2xl pb-8 px-12 font-medium">La página que buscas no existe. Es posible que se haya movido o eliminado.</p>
                            <button 
                                className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
                                onClick={ () =>navigate(-1)}
                                >
                                <i className="bi bi-arrow-left text-lg font-bold"></i> Regresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default NotFound;