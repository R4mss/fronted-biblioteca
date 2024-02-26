import { ArrowRightOnCicleSvg } from "@/component/Svg.component";
import { NavLink } from "react-router-dom";

import { images } from "../../helper/index.helper";

const IniciAdministrativo = () => {
    return(
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="grid grid-flow-row grid-cols-3 p-6">
                            <div className="col-span-3 px-4 mb-8">

                                <div className="rounded overflow-hidden shadow-lg mx-auto border border-blue-200">
                                    <div className="flex">
                                        <div className="w-2/3 px-6 py-4 flex flex-col justify-between">
                                            <div>
                                                <h2 className="text-xl font-mont uppercase font-bold pb-3 ">
                                                    Crear Horarios
                                                </h2>
                                                <p className="font-mont text-justify">
                                                    Observe sus clases asignada para este periodo de trabajo en el Centro de idiomas
                                                </p>
                                            </div>
                                            <button type="button" className="font-mont  text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/3 px-5 py-2.5 text-center mt-3">
                                                <NavLink to={'/inicio/clases-asignadas'}>                                                 <div className="flex justify-center items-center">
                                                    <ArrowRightOnCicleSvg />
                                                    <span>
                                                        Ver Clases Asignadas
                                                    </span>
                                                </div>
                                                </NavLink>
                                            </button>
                                        </div>
                                        <div className="w-1/3">
                                            <img
                                                className="w-full h-auto max-h-[200px] object-cover"
                                                src={images.portada}
                                                alt="Card Image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IniciAdministrativo