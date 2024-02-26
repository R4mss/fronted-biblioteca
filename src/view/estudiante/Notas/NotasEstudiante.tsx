
import { useState } from "react";
import ModalNotasEstudiante from "./modal/NotasEstudiante.modal";

const NotasEstudiante = () => {

    // tabla

    const dataTable = [
        {
            codigo: "Ciclo 1",
            nota: {
                notaA: 14,
                notaB: 16,
                notaC: 14,
                notaD: 13,
                notaEP: 15,
                notaEF: 12,
            },
        },
        {
            codigo: "Ciclo 2",
            nota: {
                notaA: 12,
                notaB: 13,
                notaC: 15,
                notaD: 15,
                notaEP: 14,
                notaEF: 17,
            },
        },
        {
            codigo: "Ciclo 3",
            nota: {
                notaA: 17,
                notaB: 18,
                notaC: 17,
                notaD: 16,
                notaEP: 13,
                notaEF: 12,
            },
        },
    ]

    const [mostrarNota, SetMostrarNota] = useState({
        notaA: 0,
        notaB: 0,
        notaC: 0,
        notaD: 0,
        notaEP: 0,
        notaEF: 0,
    })

    const [show, setShow] = useState<boolean>(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ModalNotasEstudiante
                show={show}
                hide={handleClose}
                mostrarNota={mostrarNota}
            />
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div>
                            <h1 className="py-1 font-semibold text-2xl"><i className="bi bi-arrow-right-circle"></i> Ingles - Aula A1</h1>
                        </div>
                        {
                            <table className="w-full border-collapse border">
                                <thead className="bg-upla-100 text-white text-lg font-semibold text-center uppercase tracking-wider">
                                    <tr>
                                        <th
                                            className="px-6 py-3"
                                        >CICLO</th>
                                        <th
                                            className="px-6 py-3"
                                        >ACCION</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        dataTable.map((item, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 text-center font-medium"
                                                >
                                                    <td
                                                        className="px-6 py-4"
                                                    >{item.codigo}</td>
                                                    <td
                                                        className="px-6 py-4"
                                                    >
                                                        <div className="">
                                                            <button
                                                                className="my-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                                                onClick={() => {
                                                                    SetMostrarNota((prevData) => ({
                                                                        ...prevData,
                                                                        notaA: item.nota.notaA, 
                                                                        notaB: item.nota.notaB, 
                                                                        notaC: item.nota.notaC, 
                                                                        notaD: item.nota.notaD, 
                                                                        notaEP: item.nota.notaEP, 
                                                                        notaEF: item.nota.notaEF, 
                                                                    }));
                                                                    handleShow();
                                                                }}
                                                            >
                                                                Ver Notas
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div >

        </>
    )
}

export default NotasEstudiante
