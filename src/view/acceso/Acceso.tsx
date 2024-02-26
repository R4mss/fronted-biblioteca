import React, { useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/configureStore.store";
import { images } from "../../helper/index.helper";
import { AcedemicCapSvg } from "../../component/Svg.component";
import { login } from "../../store/authSlice.store";
import Button from "./widget/Button";
import InputPassword from "./widget/InputPassword";
import InputClave from "./widget/InputClave";
import { LoginRest } from "../../network/rest/services.network";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import Login from "../../model/interfaces/login/login";
import { AiFillWarning } from "react-icons/ai";
import { Types } from "../../model/enum/types.model.enum";

// import RegistroEstudianteExterno from "./RegistroEstudianteExterno";
//import Checked from "./widget/Checked";

const Acceso = () => {

    const dispatch = useDispatch();
    const autenticado = useSelector((state: RootState) => state.autenticacion.autenticado)
    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    
    const [codigo, setCodigo] = useState<string>('');
    const [clave, setClave] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [proceso, setProceso] = useState<boolean>(false);

    const [ver, setVer] = useState<boolean>(false);

    const [codigoMensaje, setCodigoMensaje] = useState<string>('');
    const [claveMensaje, setClaveMensaje] = useState<string>('');

    // const [formRegEstExterno, setFormRegEstExterno] = useState<boolean>(false);

    // if(false) setFormRegEstExterno(false)

    const refCodigo = useRef<HTMLInputElement>(null);
    const refClave = useRef<HTMLInputElement>(null);


    const onEventAcceso = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (proceso) return;

        setCodigoMensaje("");
        setClaveMensaje("");
        setMensaje("");

        if (codigo == "") {
            refCodigo.current!.focus();
            setCodigoMensaje("!El campo es oblogatorio¡");
            return;
        }

        if (clave == "") {
            refClave.current!.focus();
            setClaveMensaje("!El campo es oblogatorio¡");
            return;
        }

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        setProceso(true);

        const data = {
            "codigo": codigo.trim(),
            "contraseña": clave.trim()
        }

        const response = await LoginRest<Login>(data);


        if (response instanceof Response) {

            const tipUsuario = response.data.docNumId.length == 7 ? "est" : "admin"
            dispatch(login({ codigo: response.data.docNumId, token: response.data.token, tipoUsuario: tipUsuario }));
            return;
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            setMensaje(response.getMessage());
            setProceso(false);
            refCodigo.current?.focus();
        }
    }

    const onEvenVerClave = () => {
        setVer(!ver);
        refClave.current?.focus();
    }

    // console.log(autenticado)
    // console.log(tipoUsuario? true : false)
    if (autenticado && tipoUsuario) {
        // if(tipoUsuario == "est"){
        //     return <Navigate to="/estudiante" />
        // }
        // if(tipoUsuario == "admin"){
        //     return <Navigate to="/admin" />
        // }
        return <Navigate to="/inicio" />
    }

    // const onEventFormRegEstExterno = () => {
    //     setFormRegEstExterno(!formRegEstExterno)
    // }

    return (
        <>
            {
                // formRegEstExterno == false ?
                true &&

                    (
                        <div className="flex flex-wrap w-screen h-screen">
                            <div className="bg-portada relative -z-20 bg-cover hidden md:flex md:w-1/2 xl:w-2/3">
                                <div className="bg-sombra w-full  h-screen absolute -z-10"></div>
                                <div className="m-auto text-white text-center">
                                    <motion.p
                                        className="text-lg md:text-xl lg:text-3xl font-mont font-thin"
                                        initial={{ x: -1000, opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}>Bienvenidos al Sistema</motion.p>
                                    <motion.h1 className="text-2xl md:text-4xl lg:text-6xl font-mont font-bold"
                                        initial={{ x: -1000, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >IDIOMAS UPLA</motion.h1>
                                    <motion.p
                                        className="text-lg md:text-xl lg:text-2xl font-mont font-thin flex justify-center items-center"
                                        initial={{ x: -1000, opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}>
                                        {/* <span className="px-1"></span> */}
                                        <AcedemicCapSvg size={"w-8 h-8"} /></motion.p>
                                </div>
                            </div>
                            <div className="px-6 md:px-12 sm:px-10 my-auto w-full md:w-1/2 xl:w-1/3">
                                <div className="shadow-lg border">
                                    <motion.img
                                        className="m-auto w-32 pt-4"
                                        animate={{
                                            scale: [1, 1.5, 1.5, 1, 1],
                                            rotate: [0, 0, 270, 270, 0],
                                            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                                        }}
                                        transition={{ duration: 2 }}
                                        src={images.logo}
                                        alt=""
                                    />
                                    <div className="flex flex-col items-center my-5">
                                        <p className="font-mont text-center my-1">Por favor ingrese a su cuenta</p>
                                        <p className="md:hidden text-center font-mont">IDIOMAS UPLA</p>
                                        {/* <p className="md:hidden text-center font-mont text-sm flex">
                                            <span className="px-1">UPLA</span> <AcedemicCapSvg />
                                        </p> */}
                                        {mensaje != "" && <p className="text-red-600 flex items-center"><AiFillWarning className="mr-1" /> <span>{mensaje}</span></p>}

                                        <form className="w-full lg:px-12 md:px-8 px-4" onSubmit={onEventAcceso}>
                                            <InputClave
                                                refCodigo={refCodigo}
                                                codigo={codigo}
                                                codigoMensaje={codigoMensaje}
                                                setCodigoMessage={setCodigoMensaje}
                                                setCodigo={setCodigo}
                                                setMensaje={setMensaje}
                                            />

                                            <InputPassword
                                                see={ver}
                                                refClave={refClave}
                                                clave={clave}
                                                setClaveMensaje={setClaveMensaje}
                                                setClave={setClave}
                                                onEvenVerClave={onEvenVerClave}
                                                claveMensaje={claveMensaje}
                                                setMensaje={setMensaje}
                                            />

                                            {/* <Checked /> */}
                                            <br />

                                            <Button proceso={proceso} />

                                            {/* <br />
                                            <span className="text-xs cursor-pointer text-upla-100 hover:underline"
                                                onClick={onEventFormRegEstExterno}>Registro estudiante externo</span> */}

                                            {/* <br />
                                            <span className="text-lg cursor-pointer text-upla-100">Disculpe la molestia estamos trabajando en las mejoras</span> */}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

            }

        </>
    )
}

export default Acceso;