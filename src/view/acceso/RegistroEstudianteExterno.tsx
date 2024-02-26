import React, { useRef } from "react";
import { motion } from "framer-motion";

import { images } from "../../helper/index.helper";
import { AcedemicCapSvg } from "../../component/Svg.component";

import DniPersona from "../../model/interfaces/reniec-sunat/dni.persona";
import { ConsultarDni } from "../../network/rest/reniec-sunat.network";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";

type Props = {
    onEventFormRegEstExterno: ()=> void
}

const RegistroEstudianteExterno = (props: Props) => {

    // const [dni, setDni] = useState("")

    const refDniExterno = useRef<HTMLInputElement>(null)

    const onEventConsultaReniec = async () => {

        if (refDniExterno.current?.value == "") {
            refDniExterno.current.focus()
            return
        }

        const dni: string = refDniExterno.current?.value ?? '';

        const response = await ConsultarDni<DniPersona>(dni);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {

                console.log(response)
            }
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            console.log(response.getMessage())

            // setMensaje(response.getMessage());
            // setProceso(false);
            // refCodigo.current?.focus();
        }

    }

    const onEventRegistroEstudianteExterno = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return <>
        <div className="flex flex-wrap w-screen h-screen bg-portada">

            <div className="px-6 md:px-4 sm:px-3 my-auto mx-auto w-full md:w-1/2 xl:w-1/3">
                <div className="shadow-lg border bg-white rounded-md">
                    <motion.img
                        className="m-auto w-16 pt-4"
                        // animate={{
                        //     scale: [1, 1.5, 1.5, 1, 1],
                        //     rotate: [0, 0, 270, 270, 0],
                        //     borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                        // }}
                        transition={{ duration: 2 }}
                        src={images.logo}
                        alt=""
                    />
                    <div className="flex flex-col items-center my-5">

                        <p className="md:hidden text-center font-mont">CENTRO DE IDIOMAS</p>
                        <p className="md:hidden text-center font-mont text-sm flex">
                            <span className="px-1">UPLA</span> <AcedemicCapSvg />
                        </p>
                        <p className="font-mont text-center mb-2 mt-1 text-base"><strong>REGISTRO PARA ESTUDIANTES EXTERNOS</strong></p>

                        <form className="w-full lg:px-8 md:px-4 px-2 overflow-y-auto" onSubmit={onEventRegistroEstudianteExterno}>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Dni <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <div className="relative flex flex-wrap">
                                        <input
                                            type="text"
                                            className="relative flex-auto rounded-l border border-gray-300 p-1 focus:ring-blue-500 focus:border-blue-500 "
                                            placeholder="Ingrese su dni"
                                            ref={refDniExterno}
                                        />
                                        <button
                                            title="Validar datos con reniec"
                                            className="flex items-center rounded-r border border-blue-500 bg-blue-500 text-white px-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                            onClick={onEventConsultaReniec}
                                        >
                                            <i className="bi bi-person-bounding-box"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Nombres
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombres"
                                        disabled
                                        className="font-mont bg-gray-100 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Apellido Patern
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Paterno"
                                        disabled
                                        className="font-mont bg-gray-100 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Apellido Materno
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Materno"
                                        disabled
                                        className="font-mont bg-gray-100 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Email <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese su correo"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Celular <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el número de celular"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese su dirección"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Contraseña <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese su contraseña"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                                <div>
                                    <label
                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                    >
                                        Repita la contraseña <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Repita su contraseña"
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-3 mt-6">
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="font-mont
                                        block 
                                        m-auto 
                                        md:w-full 
                                        text-white 
                                        bg-upla-100 
                                        hover:bg-upla-200 
                                        hover:transition-all 
                                        focus:ring-4 
                                        focus:outline-none 
                                        focus:ring-blue-300 
                                        font-medium 
                                        rounded-lg 
                                        text-sm w-full 
                                        sm:w-auto px-5 
                                        py-2.5 text-center">
                                        <div className="flex justify-center items-center">
                                            <span className="px-2">Registrar</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </form>

                        <span className="text-xs mb-2">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorio
                        </span>

                        <span className="text-xs cursor-pointer text-upla-100 font-bold hover:underline"
                                    onClick={props.onEventFormRegEstExterno}> <i className="bi bi-arrow-left-circle-fill text-xs"></i> Regresar</span>

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default RegistroEstudianteExterno;