// import { NavLink } from "react-router-dom";
import Modal from "../../../../component/pages/modal/ModalComponente";

// type DatosType = {
//     docNumId: string;
//     asesNombres: string;
//     asesPaterno: string;
//     asesMaterno: string;
// };

type Props = {
    // datos: DatosType;
    show: boolean;
    hide: () => void;
};

const ModalMatricula: React.FC<Props> = (props: Props) => {


    return (
        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}>
                <h2 className="font-bold">INFORMACIÓN SOBRE EL HORARIO</h2>
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold text-xl my-auto'>DATOS DEL HORARIO</span>
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="dni" className='font-bold mb-1'>Nombre del Horario: </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'Ingles I'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="dni" className='font-bold mb-1'>Modalidad: </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'Regular'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="dni" className='font-bold mb-1'>Horario Inicio: </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'Regular'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="dni" className='font-bold mb-1'>Horario Fin: </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'Regular'}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 mt-3'>
                        <i className="bi bi-2-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                        <span className='ml-4 font-bold text-xl my-auto'>DATOS DEL INSTRUCTOR</span>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                    <div className='flex flex-col'>
                            <label htmlFor="nombres" className='font-bold mb-1'>Instructor(ra)</label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'Jose Manolo Perez Quispe'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="correoInstitucional" className='font-bold mb-1'>Correo Institucional</label>
                            <input
                                type="text"
                                id="correoInstitucional"
                                name="correoInstitucional"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'J0001523@upla.edu.pe'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="correo" className='font-bold mb-1'>Correo</label>
                            <input
                                type="text"
                                id="correo"
                                name="correo"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'johamjurado@gmail.com'}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="celular" className='font-bold mb-1'>Celular</label>
                            <input
                                type="text"
                                id="celular"
                                name="celular"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={'978645312'}
                                readOnly
                            />
                        </div>
                    </div>
                    
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className='w-full flex justify-between'>
                    <div className=' flex'>
                        {/* <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span> */}
                    </div>
                    <div className='flex gap-3 w-5/12 justify-end'>
                        <button
                            onClick={props.hide}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMatricula;