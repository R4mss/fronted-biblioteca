import { useState } from 'react';
import AccordionItem from './AccordionItem';
import { BiCalendar } from 'react-icons/bi';

import Cargando from '@/component/Cargando';
import MatriculaPago from '@/model/interfaces/pago/matriculaPago';
import PensionPago from '@/model/interfaces/pago/pensionPago';
import { MatriculaExistentePeriodo } from '@/network/rest/idiomas.network';
import RespValue from '@/model/interfaces/RespValue.model.interface';

import RestError from '@/model/class/resterror.model.class';
import Response from '@/model/class/response.model.class';
import { Types } from '@/model/enum/types.model.enum';
import { NavLink } from 'react-router-dom';


type Props = {
    pasoActual: number

    load: boolean
    loadMatricula: boolean
    loadPension: boolean

    dataMatricula: MatriculaPago[]
    dataPension: PensionPago[]

    recienteMatricula: any[]

    handleMatriculaProceso: () => void;
}

const Accordion = (props: Props) => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const [isOpen, setIsOpen] = useState(false);

    const [matriculaExistente, setMatriculaExistente] = useState(false)

    const toggleAccordion = async () => {

        if (isOpen) return

        await Promise.all([
            await matriculaExistentePeriodo(),
        ])

        setIsOpen(true);

    };

    const hideAccordion = () => {
        setIsOpen(false)
    }


    const matriculaExistentePeriodo = async () => {

        const response = await MatriculaExistentePeriodo<RespValue>(codigo)
        if (response instanceof Response) {

            const result = response.data as RespValue

            if (result.value == "NOMATRICULADO") {
                setMatriculaExistente(true)
            }

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())

        }

    }

    console.log(matriculaExistente)

    return (
        <div className="border border-gray-300 p-4 rounded-b">
            {/* ...otros pasos... */}

            {
                // Paso 1
                props.pasoActual === 1 &&
                <div className="border-l-4 border-upla-100 pl-4">
                    <h2 className="text-xl font-bold flex text-upla-100 gap-3">
                        <i className="bi bi-1-square-fill" />
                        <span className="uppercase">Verificación de pagos</span>
                    </h2>
                    {/* <p>Paga tus Matricula  y Prension a tiempo</p> */}

                    {
                        props.load ?
                            (
                                <div className='mt-4'>
                                    <Cargando />
                                </div>
                            ) : (
                                <>
                                    <div className="border border-gray-300 bg-upla-200 rounded-lg shadow-md mt-4">
                                        <div className="flex text-lg">
                                            <div className='w-32 pl-4 text-white bg-upla-200 rounded-l-lg my-auto font-semibold'>
                                                Matrícula
                                            </div>
                                            <div className='flex-1 p-3 bg-white rounded-r-lg'>
                                                {
                                                    props.loadMatricula ?
                                                        (
                                                            <div className='p-2'>
                                                                <Cargando />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            props.dataMatricula[0].operacion == "utilizado" ?
                                                                (
                                                                    <span className="flex justify-between px-4 pr-0 gap-2">
                                                                        <div className='flex gap-4 my-auto'>
                                                                            <i className="bi bi-check-circle-fill text-green-600 text-xl" />
                                                                            <span className="text-green-600 font-semibold">
                                                                                Pago registrado en uso
                                                                            </span>
                                                                        </div>
                                                                    </span>

                                                                ) :

                                                                props.dataMatricula[0].operacion == "inpago" ?
                                                                    (
                                                                        <span className="flex justify-between px-4 pr-0 gap-2">
                                                                            <div className='flex gap-2 my-auto'>
                                                                                <i className="bi bi-x-circle-fill text-red-600 text-xl" />
                                                                                <span className="text-red-600 font-semibold">
                                                                                    No se encontraron registros de pago de matrícula.
                                                                                </span>
                                                                            </div>
                                                                        </span>
                                                                    )
                                                                    :
                                                                    (
                                                                        <span className="flex justify-between px-4 pr-0 gap-2">
                                                                            <div className='flex gap-4 my-auto'>
                                                                                <i className="bi bi-check-circle-fill text-green-600 text-xl" />
                                                                                <span className="text-green-600 font-semibold">
                                                                                    Pago realizado
                                                                                </span>
                                                                            </div>
                                                                            <span className='flex gap-2 text-green-700 rounded-md p-2 ml-4'>
                                                                                Cod. operación:
                                                                                <strong> {props.dataMatricula[0].operacion}</strong>
                                                                            </span>
                                                                        </span>

                                                                    )
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-300 bg-upla-200 rounded-lg shadow-md mt-4">
                                        <div className="flex text-lg ">
                                            <div className='w-32 pl-4 text-white bg-upla-200 rounded-l-lg my-auto font-semibold'>
                                                Pensión
                                            </div>
                                            <div className='flex-1 p-3 bg-white rounded-r-lg'>
                                                {
                                                    props.loadPension ?
                                                        (
                                                            <div className='p-2'>
                                                                <Cargando />
                                                            </div>

                                                        ) : (
                                                            props.dataPension[0].operacion == "utilizado" ?
                                                                (
                                                                    <>
                                                                        {
                                                                            props.recienteMatricula.length == 0 ?
                                                                            
                                                                                (
                                                                                    <span className="flex justify-between px-4 pr-0 gap-2">
                                                                                        <div className='flex gap-2 my-auto'>
                                                                                            <i className="bi bi-x-circle-fill text-red-600 text-xl" />
                                                                                            <span className="text-red-600 font-semibold">
                                                                                                No se encontraron registros de pago de pensión.
                                                                                            </span>
                                                                                        </div>
                                                                                    </span>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <span className="flex justify-between px-4 pr-0 gap-2">
                                                                                        <div className='flex gap-4 my-auto'>
                                                                                            <i className="bi bi-info-circle-fill text-upla-100 text-xl" />
                                                                                            <span className="text-upla-100 font-semibold">
                                                                                                Tiene una matrícula para el periodo  {props.recienteMatricula[0]?.anio} - {props.recienteMatricula[0]?.mes}
                                                                                            </span>
                                                                                        </div>
                                                                                        <NavLink
                                                                                            to={"/inicio/consolidado"}
                                                                                            className={`bg-gray-600 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg text-sm`}
                                                                                        >
                                                                                            Ver matrícula
                                                                                        </NavLink>
                                                                                    </span>

                                                                                )
                                                                        }
                                                                        {/* <span className="text-red-600"> No hay pago de pension registrado </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i> */}
                                                                    </>
                                                                ) :

                                                                props.dataPension[0].operacion == "inpago" ?

                                                                    (
                                                                        <span className="flex justify-between px-4 pr-0 gap-2">
                                                                            <div className='flex gap-2 my-auto'>
                                                                                <i className="bi bi-x-circle-fill text-red-600 text-xl" />
                                                                                <span className="text-red-600 font-semibold">
                                                                                    No se encontraron registros de pago de pensión.
                                                                                </span>
                                                                            </div>
                                                                        </span>
                                                                    )
                                                                    :
                                                                    (
                                                                        <span className="flex justify-between px-4 pr-0 gap-2">
                                                                            <div className='flex gap-4 my-auto'>
                                                                                <i className="bi bi-check-circle-fill text-green-600 text-xl" />
                                                                                <span className="text-green-600 font-semibold">
                                                                                    Pago realizado
                                                                                </span>
                                                                            </div>
                                                                            <span className='flex gap-2 text-green-700 rounded-md p-2 ml-4'>
                                                                                Cod. operación:
                                                                                <strong> {props.dataPension[0].operacion}</strong>
                                                                            </span>
                                                                        </span>
                                                                    )
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            }

            {
                // Paso 2
                props.pasoActual === 2 && (
                    <div className="border-l-4 border-upla-100 pl-4 flex flex-col gap-3">
                        <h2 className="text-xl font-bold flex text-upla-100 gap-3">
                            <i className="bi bi-2-square-fill" />
                            <span className="uppercase">Matricúlate</span>
                        </h2>
                        <p>Para continuar, es necesario escoger el idioma que cursará</p>
                        <div className="border border-gray-300 rounded-lg shadow-md">
                            <div
                                className="flex justify-between items-center cursor-pointer p-3 px-4"
                                onClick={!isOpen ? toggleAccordion : hideAccordion}
                            >
                                <h3 className="text-lg font-semibold flex gap-4">
                                    Seleccione el idioma <span className="text-upla-100"> ¡Este paso es imprescindible!</span>
                                </h3>
                                <div className='flex text-upla-200 gap-2'>
                                    <p className='my-auto font-bold'>{`Presione para ${!isOpen ? 'ver los idiomas' : 'ocultar'} `}</p>
                                    <i className={`bi bi-caret-down-fill text-2xl ${!isOpen ? '' : 'rotate-180'}`} />
                                </div>

                            </div>

                            <hr />

                            {
                                // load? (
                                //     <Cargando/>

                                // ):(
                                isOpen && (
                                    <>
                                        <div className="p-4">
                                            <AccordionItem
                                                icono={BiCalendar}
                                                titulo={`Inglés`}
                                                estadoBtn={matriculaExistente}
                                                handleMatriculaModalidad={props.handleMatriculaProceso}
                                            />

                                        </div>
                                    </>
                                )

                                // )
                            }



                        </div>
                    </div>
                )}

            {/* ...otros pasos... */}

        </div>
    );
};

export default Accordion;
