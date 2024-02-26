import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import Idioma from "@/model/interfaces/idioma/idioma";
import Modalidad from "@/model/interfaces/modalidad/modalidad";
import { ListarIdioma, ListarModalidad } from "@/network/rest/idiomas.network";
import { useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';

type Props = {
    pasoActual: number;
    cambiarPaso: (paso: number) => void;
}

const AccordionMatriculaIdioma = (props: Props) => {

    const [comboMapModalidad, setComboMapModalidad] = useState<Modalidad[]>([])
    const [comboMapIdioma, setComboMapIdioma] = useState<Idioma[]>([])


    const abortController = useRef(new AbortController());

    useEffect(() => {

        LoadDataModalidad()
        LoadDataIdioma()

    }, [])

    const LoadDataIdioma = async () => {

        setComboMapIdioma([])

        const response = await ListarIdioma<Listas>(abortController.current)

        if (response instanceof Response) {
            setComboMapIdioma(response.data.resultado as Idioma[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataModalidad = async () => {

        setComboMapModalidad([])

        const response = await ListarModalidad<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboMapModalidad(response.data.resultado as Modalidad[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }



    return (
        <>
            <div className="bg-gray-100 p-4 rounded-b">

                {
                    // Paso 1
                    props.pasoActual === 1 &&
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h2 className="text-lg font-semibold">
                            Paso 1 - <span className="text-blue-600">Selección de Idioma</span>
                        </h2>
                        <p>Para completar tu matrícula, seleccionando tu idioma:</p>
                        <div className="border border-gray-300 rounded-lg shadow-md mt-4 grid grid-flow-col auto-cols-max gap-5 justify-center p-8">
                            {comboMapIdioma.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-300 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center">
                                    <h3 className="text-xl font-semibold mb-2">{item.idiomaNombre}</h3>

                                    {/* Agrega cualquier otro contenido adicional según tus necesidades */}
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                        onClick={() => { props.cambiarPaso(2) }}
                                    >
                                        Seleccionar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {
                    // Paso 2
                    props.pasoActual === 2 && (
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h2 className="text-lg font-semibold">
                                Paso 2 - <span className="text-blue-600">Selección de Modalidad</span>
                            </h2>
                            <p>Para completar tu matrícula, selecciona tu modalidad:</p>
                            <div className="border border-gray-300 rounded-lg shadow-md mt-4 grid grid-flow-col auto-cols-max gap-5 justify-center p-8">
                                {comboMapModalidad.map((item, index) => (
                                    <div key={index} className="p-4 bg-gray-300 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center">
                                        <h3 className="text-xl font-semibold mb-2">{item.modalidad}</h3>

                                        {/* Agrega cualquier otro contenido adicional según tus necesidades */}
                                        <NavLink
                                        to={'/inicio/vista-horario-estudiante'}
                                        >
                                            <button
                                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                                onClick={() => { }}
                                            >
                                                Seleccionar
                                            </button>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

            </div>
        </>
    )
}
export default AccordionMatriculaIdioma