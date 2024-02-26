import { useNavigate } from "react-router-dom"
import StepButtonMatriculaIdioma from "./component/StepButtonMatriculaIdioma"
import { useState } from "react"
import { BiGlobe, BiBook } from 'react-icons/bi';
import AccordionMatriculaIdioma from "./component/AccordionMatriculaIdioma";

const SeleccionDeIdiomas = () => {

    const navigate = useNavigate()

    const [pasoActual, setPasoActual] = useState<number>(1);

    const cambiarPaso = (paso: number) => {
        setPasoActual(paso);
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Inicio</h2>
                        <div className="p-1 bg-Solid">
                            <div className="w-full">

                                <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                    <div
                                        className="border-b-2 border-gray-200 p-2">
                                        <div className="text-sm font-bold">
                                            TENER EN CUENTA
                                        </div>
                                    </div>
                                    <div className="m-2">

                                        <div className="px-4">

                                            <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Idioma a escoger: </span> Asegúrate de seleccionar el idioma correctamente.
                                                </li>
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Modalidad a escoger:</span> Asegúrate de seleccionar la modalidad correctamente.
                                                </li>
                                                
                                            </ol>

                                        </div>

                                    </div>
                                </div>

                                <br />

                                <div className="flex justify-center mb-4">
                                    <StepButtonMatriculaIdioma paso={1} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={BiGlobe}  />
                                    <StepButtonMatriculaIdioma paso={2} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={BiBook}  />
                                </div>

                                <AccordionMatriculaIdioma
                                pasoActual={pasoActual} 
                                cambiarPaso={cambiarPaso} 
                                /> 

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SeleccionDeIdiomas