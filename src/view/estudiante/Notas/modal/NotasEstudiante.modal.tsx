import CustomModal from "@/component/Modal.component"
import { useEffect, useState } from "react";

type NotasCiclo = {
    notaA: number;
    notaB: number;
    notaC: number;
    notaD: number;
    notaEP: number;
    notaEF: number;
}

type Props = {
    show: boolean;
    hide: () => void;
    mostrarNota: NotasCiclo;
}

const ModalNotasEstudiante = (props: Props) => {

    const [notaPractica, setNotaPractica] = useState<number>(0)
    const [notaPracticaPorcentaje, setNotaPracticaPorcentaje] = useState<number>(0)
    const [notaExamenMedioCiclo, setNotaExamenMedioCiclo] = useState<number>(0)
    const [notaExamenMedioCicloPorcentaje, setExamenMedioCicloPorcentajea] = useState<number>(0)
    const [notaExamenFinal, setNotaExamenFinal] = useState<number>(0)
    const [notaExamenFinalPorcentaje, setExamenFinalPorcentajea] = useState<number>(0)
    const [notaPromedioFinal, setnotaPromedioFinal] = useState<number>(0)
    
    
    useEffect(() => {
        setNotaPractica(((props.mostrarNota.notaA + props.mostrarNota.notaB + props.mostrarNota.notaC + props.mostrarNota.notaD) / 4));

        setNotaPracticaPorcentaje(parseFloat((((props.mostrarNota.notaA + props.mostrarNota.notaB + props.mostrarNota.notaC + props.mostrarNota.notaD) / 4) * 0.2).toFixed(2)));

        setNotaExamenMedioCiclo(props.mostrarNota.notaEP);
        setExamenMedioCicloPorcentajea(parseFloat((props.mostrarNota.notaEP * 0.4).toFixed(2)));

        setNotaExamenFinal(props.mostrarNota.notaEF);
        setExamenFinalPorcentajea(parseFloat((props.mostrarNota.notaEF * 0.4).toFixed(2)));

        setnotaPromedioFinal(((props.mostrarNota.notaA + props.mostrarNota.notaB + props.mostrarNota.notaC + props.mostrarNota.notaD) * 0.2 / 4) + props.mostrarNota.notaEP * 0.4 + props.mostrarNota.notaEF * 0.4);
        setnotaPromedioFinal(parseFloat((((props.mostrarNota.notaA + props.mostrarNota.notaB + props.mostrarNota.notaC + props.mostrarNota.notaD) * 0.2 / 4) + props.mostrarNota.notaEP * 0.4 + props.mostrarNota.notaEF * 0.4).toFixed(1)));
    }, [props.mostrarNota]);

    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {

            }}
            onHidden={() => {

            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">
                    <h6 className="py-1 font-bold text-lg">Notas: </h6>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>
                {/* <div className="w-full px-4 pb-2 pt-4">

                    

                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mt-3">
                        <div className="m-2">

                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-1-circle"></i> Nota Practica (20%):</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota A</th>
                                            <th className="py-2 px-6">Nota B</th>
                                            <th className="py-2 px-6">Nota C</th>
                                            <th className="py-2 px-6">Nota D</th>
                                            <th className="py-2 px-6">Nota Practica</th>
                                            <th className="py-2 px-6">20%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <label className="">{props.mostrarNota.notaA}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{props.mostrarNota.notaB}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{props.mostrarNota.notaC}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{props.mostrarNota.notaD}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaPractica}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaPracticaPorcentaje}</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-2-circle"></i> Nota examen de medio ciclo (40%):</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota de medio ciclo</th>
                                            <th className="py-2 px-6">40%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <label className="">{notaExamenMedioCiclo}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaExamenMedioCicloPorcentaje}</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-3-circle"></i> Nota examen de examen final (40%)</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota de examen final</th>
                                            <th className="py-2 px-6">40%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <label className="">{notaExamenFinal}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaExamenFinalPorcentaje}</label>
                                            </td>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-arrow-right-circle"></i> Promedio del ciclo</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota Practica (20%)</th>
                                            <th className="py-2 px-6">Nota examen de medio ciclo (40%)</th>
                                            <th className="py-2 px-6">Nota examen final (40%)</th>
                                            <th className="py-2 px-6">Nota promedio final (100%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <label className="">{notaPracticaPorcentaje}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaExamenMedioCicloPorcentaje}</label>
                                            </td>
                                            <td className="border py-2">
                                                <label className="">{notaExamenFinalPorcentaje}</label>
                                            </td>
                                            <td className={`border py-2 ${notaPromedioFinal > 10.5 ? 'bg-green-400' : 'bg-red-400'}`}>
                                                <label className="">{notaPromedioFinal}</label>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </CustomModal>
    )
}
export default ModalNotasEstudiante