import { useState } from 'react';
import ModalDatosPersonales from '../../modalForms/ModalDatosPersonales';
//import ModalDatosPersonales from '../../modalForms/ModalDatosPersonales';

type DatosType = {
    docNumId: string;
    asesNombres: string;
    asesPaterno: string;
    asesMaterno: string;
    id_departamento: number;
    // 
};


const TemplateStep1 = (props : DatosType) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //console.log(props)


    return (
        <div className="mt-10 rounded shadow-lg border p-4 w-full">

            <ModalDatosPersonales datos={props} show={show} hide={handleClose} />
            

            <div className="flex">
                <div className="w-1/2 pr-4">
                    <div className="flex text-gray-400">
                        <i className="bi bi-1-square-fill mr-4 text-xl" />
                        <h1 className="font-bold text-xl">CARTA DE PRESENTACIÓN</h1>
                    </div>

                    <h2 className="font-semibold text-lg">Requisitos</h2>
                    <ul className="list-disc">
                        <li className="mb-1 ml-8">
                            Pago por carta de presentación
                            {/* Icono de disponible*/}
                            <span className="bg-green-400 text-white rounded-sm ml-2" title="Completo">
                                <i className="bi bi-check-lg mx-1" />
                            </span>

                            {/* Icono de falta*/}
                            <span className="bg-yellow-400 text-white rounded-sm ml-2" title="Es requerido">
                                <i className="bi bi-exclamation-lg mx-1" />
                            </span>

                            {/* Icono de falta*/}
                            <span className="bg-blue-400 text-white rounded-sm ml-2" title="Apoyo">
                                <i className="bi bi-plus-lg mx-1" />
                            </span>

                        </li>
                        <li className="mb-1 ml-8">RUC de la empresa</li>
                        <li className="mb-1 ml-8">Razón social</li>
                        <li className="mb-1 ml-8">Datos completos del representante de la empresa</li>
                    </ul>
                    <hr className="my-2" />
                    <h2 className="font-semibold text-lg">Procedimiento</h2>
                    <ul className="list-disc">
                        <li className="mb-1 ml-8">Rellenar ficha</li>
                        <li className="mb-1 ml-8">Imprimir carta de presentación</li>
                    </ul>
                </div>

                <div className="w-1/2 pl-4 border-l flex flex-col justify-between">
                    <div>
                        <div className="mb-4 flex">
                            <p className="text-lg font-semibold">Estado:</p>
                            {/* Completado */}
                            <div className="flex ml-2 rounded-lg bg-green-500 text-white px-2">
                                <span className="m-auto">Completado</span>
                            </div>

                            {/* Proceso */}
                            <div className="flex ml-2 rounded-lg bg-yellow-400 text-white px-2">
                                <span className="m-auto">En proceso</span>
                            </div>

                            {/* Duración */}
                            <div className="flex ml-2 rounded-lg bg-yellow-400 text-white px-2">
                                <i className="bi bi-clock-history m-auto mr-1" />
                                <span className="m-auto">15 días</span>
                            </div>

                            {/* Duración */}
                            <div className="flex ml-2 rounded-lg bg-red-700 text-white px-2">
                                <i className="bi bi-clock-history m-auto mr-1" />
                                <span className="m-auto">5 días</span>
                            </div>

                        </div>



                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center">
                                <div className="rounded-full bg-green-500 text-white items-center justify-center w-6 flex">
                                    <i className="bi bi-check-lg m-auto" />
                                </div>

                                <span className="ml-4">Datos personales</span>

                                <div className="ml-auto">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShow}>Iniciar</button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShow}>Ver</button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="rounded-full bg-yellow-400 text-white items-center justify-center w-6 flex">
                                    <i className="bi bi-exclamation-lg m-auto" />
                                </div>

                                <span className="ml-4">Datos estudiante</span>

                                {/*<div className="ml-auto">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShowEstud}>Iniciar</button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShowEstud}>Ver</button>
                                </div>*/}
                            </div>

                            <div className="flex items-center">
                                <div className="rounded-full bg-yellow-400 text-white items-center justify-center w-6 flex">
                                    <i className="bi bi-exclamation-lg m-auto" />
                                </div>

                                <span className="ml-4">Datos centro laboral</span>

                                {/*<div className="ml-auto">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShowCentro}>Iniciar</button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2" onClick={handleShowCentro}>Ver</button>
                                </div>*/}
                            </div>
                        </div>

                    </div>

                    <div>
                        <hr className="mb-4" />
                        <div className="flex flex-col gap-2">
                            <div>
                                <span className="bg-green-200 rounded-lg px-4 text-green-600 font-semibold">Datos completos, puede descargar la carta de presentación</span>
                            </div>
                            <div>
                                <span className="bg-red-200 rounded-lg px-4 text-red-600 font-semibold">Datos incompletos, por favor rellene todos los formularios</span>
                            </div>
                            <div className="flex items-center">
                                <span className="my-auto font-semibold">Carta de presentación</span>
                                <div className="ml-4">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2">Descargar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TemplateStep1;