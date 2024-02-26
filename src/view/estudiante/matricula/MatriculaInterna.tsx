
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import Accordion from './compoment/Accordion';
import StepButton from "./compoment/StepButton";
import Card from "../../../component/pages/cards/Card"

import { ExistenteMatriculaPeriodoTipoEstudio, PagadoMatriculaLista, PagadoPensionLista, RangoMatriculaCalendario, ValidezMatriculaMeses } from "../../../network/rest/idiomas.network";

import Response from '../../../model/class/response.model.class';
import RestError from "../../../model/class/resterror.model.class";

import { Types } from "../../../model/enum/types.model.enum";

import MatriculaPago from "@/model/interfaces/pago/matriculaPago";
import PensionPago from "@/model/interfaces/pago/pensionPago";

import { IconoCalendario, MultipleCheck, Documento, Lista } from '../../../component/Iconos';

import Listas from "@/model/interfaces/Listas.model.interface";

import MatriculaProceso from "./MatriculaProceso"
import RespValue from "@/model/interfaces/RespValue.model.interface";




const MatriculaInterna = () => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const navigate = useNavigate()

    const [pasoActual, setPasoActual] = useState<number>(1);

    const [moduloMatriculaProceso, setModuloMatriculaProceso] = useState(false);

    const [pagoMatriculaLista, setPagoMatriculaLista] = useState<MatriculaPago[]>([]);
    const [pagoPensionLista, setPagoPensionLista] = useState<PensionPago[]>([]);

    const [load, setLoad] = useState(true)


    const [loadMatricula, setLoadMatricula] = useState(true)
    const [loadPension, setLoadPension] = useState(true)

    const [validezMesesMatri, setValidezMesesMatri] = useState("0")

    const [recienteMatricula, setRecienteMatricula] = useState<any[]>([])

    const [rangoFechaMatricula, setRangoFechaMatricula] = useState<any[]>([])

    const abortController = useRef(new AbortController());


    const cambiarPaso = (paso: number) => {
        setPasoActual(paso);
    };

    const handleMatriculaProceso = () => {
        setModuloMatriculaProceso(!moduloMatriculaProceso)
    }

    useEffect(() => {

        loadInitData()

    }, [])

    const loadInitData = async () => {


        await LoadRangoMatriculaCalendario()

        await LoadPagosMatriculaLista()
        await LoadPagosPensionLista()
        await LoadValidezMatriculaMeses()
        await LoadRecienteMatriculaExistente()
        setLoad(false)

    }


    const LoadPagosMatriculaLista = async () => {

        const response = await PagadoMatriculaLista<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const matriculas = response.data.resultado as MatriculaPago[]

            const matriculasOrdenadas = matriculas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
            // console.log(matriculasOrdenadas)

            setPagoMatriculaLista(matriculasOrdenadas)
            setLoadMatricula(false)
            localStorage.setItem('codMat', matriculasOrdenadas[0].operacion);


        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadPagosPensionLista = async () => {

        const response = await PagadoPensionLista<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const pensiones = response.data.resultado as PensionPago[]

            const pensinesOrdenadas = pensiones.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());


            //console.log(pensinesOrdenadas)

            setPagoPensionLista(pensinesOrdenadas)
            setLoadPension(false)
            localStorage.setItem('codPen', pensinesOrdenadas[0].operacion);

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadValidezMatriculaMeses = async () => {
        const response = await ValidezMatriculaMeses<RespValue>(codigo)
        if (response instanceof Response) {
            setValidezMesesMatri(response.data.value)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadRecienteMatriculaExistente = async () => {
        const response = await ExistenteMatriculaPeriodoTipoEstudio<Listas>(codigo)
        if (response instanceof Response) {

            const data = response.data.resultado

            setRecienteMatricula(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadRangoMatriculaCalendario = async () => {
        const response = await RangoMatriculaCalendario<Listas>()
        if (response instanceof Response) {

            const data = response.data.resultado
            setRangoFechaMatricula(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    return (
        <>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        {
                            moduloMatriculaProceso == true ?
                                (
                                    <MatriculaProceso
                                        handleMatriculaProceso={handleMatriculaProceso}

                                    />
                                ) :
                                (
                                    <div className="p-1 bg-Solid">
                                        <h2 className="text-2xl font-bold mb-6 flex gap-3">
                                            <span onClick={() => navigate(-1)} title="Atrás" role="button">
                                                <i className="bi bi-arrow-left-circle-fill text-upla-100 hover:text-gray-500" />
                                            </span>
                                            <p className="text-upla-100 uppercase"> Matrícula </p>
                                        </h2>

                                        <div className="w-full">


                                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                                <div
                                                    className="border-b-2 border-gray-200 p-2 flex justify-between">
                                                    <div className="text-sm font-bold">
                                                        TENER EN CUENTA
                                                    </div>
                                                </div>
                                                <div className="m-2">

                                                    <div className="px-4">

                                                        <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                                            <li className="pl-4">
                                                                <span className="font-semibold text-gray-900 dark:text-white">Fechas límite y plazos: </span> Asegúrate de conocer las fechas límite para realizar los pagos de matrícula y pensiones. Cumplir con estos plazos es fundamental.
                                                            </li>
                                                            <li className="pl-4">
                                                                <span className="font-semibold text-gray-900 dark:text-white">Formas de pago:</span> Verifica qué métodos de pago acepta la institución. Asegúrate de tener la información necesaria para cada método de pago.
                                                            </li>
                                                            <li className="pl-4">

                                                                <span className="font-semibold text-gray-900 dark:text-white">Requisitos de matrícula:</span>  Conoce los requisitos específicos para matricularse en los cursos, ya sean restricciones de cupo, requisitos de nivel académico, prerrequisitos, entre otros.

                                                            </li>
                                                        </ol>

                                                    </div>

                                                </div>
                                            </div>

                                            <br />

                                            {
                                                rangoFechaMatricula.length == 0 ?
                                                    (
                                                        <>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-4 gap-8">
                                                                <StepButton paso={1} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Documento} load={load} loadMatricula={loadMatricula} loadPension={loadPension} validezMatricula={validezMesesMatri}
                                                                    dataMatricula={pagoMatriculaLista} dataPension={pagoPensionLista} texto="1.  Pago" />
                                                                <StepButton paso={2} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Lista} load={load} loadMatricula={loadMatricula} loadPension={loadPension} validezMatricula={validezMesesMatri}
                                                                    dataMatricula={pagoMatriculaLista} dataPension={pagoPensionLista} texto="2.  MATRICULA" />
                                                            </div>

                                                            <Accordion pasoActual={pasoActual} handleMatriculaProceso={handleMatriculaProceso} load={load} loadMatricula={loadMatricula} loadPension={loadPension}
                                                                dataMatricula={pagoMatriculaLista} dataPension={pagoPensionLista} recienteMatricula={recienteMatricula}
                                                            />
                                                        </>
                                                    )
                                            }





                                            <h2 className="text-lg font-semibold mt-4 flex gap-2 text-upla-100">
                                                <i className="bi bi-info-circle-fill" />
                                                <span className="text-xl ">Información para tu matrícula</span>
                                            </h2>

                                            <div className="flex flex-wrap justify-center mt-5">

                                                {/* <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<Libro />}
                                                        titulo={'Manual de matrícula'}
                                                        color={'blue'}
                                                        to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                                                        info={''}
                                                    />
                                                </div> */}
                                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<IconoCalendario />}
                                                        titulo={'Cronograma de matrícula'}
                                                        color={'green'}
                                                        to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                                                        info={''}
                                                    />
                                                </div>
                                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<MultipleCheck />}
                                                        titulo={'Reglamento Académico'}
                                                        color={'yellow'}
                                                        to={'https://upla.edu.pe/nw/2023/NewFolder/REGLAMENTO%20IDIOMAS%20UPLA%202024%20.pdf?_t=1703008912'}
                                                        info={''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                        }

                        {/* <div className="flex justify-end">
                            <NavLink
                                to={'/inicio/seleccion-idioma'}
                            >
                                <button
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                    onClick={() => { }}
                                >
                                    Seleccionar
                                </button>
                            </NavLink>
                        </div> */}


                    </div>
                </div>
            </div>

        </>
    )
}
export default MatriculaInterna