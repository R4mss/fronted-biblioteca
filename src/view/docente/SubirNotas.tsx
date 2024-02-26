// import CustomModal from "@/component/Modal.component";
import Data from "@/component/importExcel/Data";
import { useState } from "react";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';

const SubirNotas = () => {

    // const navigate = useNavigate();

    // const data = [
    //     {
    //         id: 1,
    //         codigo: 'Q00499A',
    //         nombre: 'Mauricio Curo, Anabel',
    //     },
    // ]

    // const [open, setOpen] = useState<boolean>(false)

    const [notasSubidas, SetNotasSubidas] = useState(false)

    const handleNotas = () => {
        SetNotasSubidas(true)
    }

    return (
        <>
            {/* <CustomModal
                isOpen={open}
                onOpen={() => { }}
                onHidden={() => { }}
                onClose={() => { }}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">
                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Cerar</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={()=>{setOpen(!open)}}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                </div>
            </CustomModal>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Notas</h2>

                            <div className="">
                                <table className="w-full text-gray-700 bg-upla-100 border">
                                    <thead>
                                        <tr className="text-white">
                                            <th className="px-6 py-3 font-bold text-center">#</th>
                                            <th className="px-6 py-3 font-bold text-center">Codigo</th>
                                            <th className="px-6 py-3 font-bold text-center">Estudiante</th>
                                            <th className="px-6 py-3 font-bold text-center">Notas</th>
                                            <th className="px-6 py-3 font-bold text-center">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index} className="text-center bg-white border-b">
                                                <td className="px-6 py-4">{item.id}</td>
                                                <td className="px-6 py-4">{item.codigo}</td>
                                                <td className="px-6 py-4">{item.nombre}</td>
                                                <td className="px-6 py-4">

                                                    <button
                                                        className="bg-upla-100 hover:bg-upla-200 text-white font-bold py-2 px-4 rounded focus:ring ring-blue-300 focus:outline-none"
                                                        onClick={() => { setOpen(!open) }}
                                                    >
                                                        <i className="bi bi-clipboard-plus text-ms text-white"></i> Ver Notas
                                                    </button>

                                                </td>
                                                <td className="px-6 py-4 gap-2">
                                                    <button
                                                        className="bg-green-500  text-white font-bold py-2 px-4 rounded focus:ring"
                                                        onClick={() => { }}
                                                        disabled
                                                    >
                                                        Aprovado <i className="bi bi-check2 text-sm text-white"></i>
                                                    </button>
                                                    <button
                                                        className="bg-amber-400 mx-2 text-white font-bold py-2 px-4 rounded focus:ring"
                                                        onClick={() => { }}
                                                        disabled
                                                    >
                                                        Pendiente <i className="bi bi-exclamation-diamond text-sm text-white"></i>
                                                    </button>
                                                    <button
                                                        className="bg-red-600  text-white font-bold py-2 px-4 rounded focus:ring"
                                                        onClick={() => { }}
                                                        disabled
                                                    >
                                                        Desaprobado <i className="bi bi-x-lg text-sm text-white"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <Data handleNotas={handleNotas}/>

                        

                    </div>
                </div>
            </div>
        </>
    )
}
export default SubirNotas