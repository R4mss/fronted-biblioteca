import { NavLink } from "react-router-dom";
import Modal from "../modal/ModalComponente";

type DatosType = {
    docNumId: string;
    asesNombres: string;
    asesPaterno: string;
    asesMaterno: string;
};

type Props = {
    datos: DatosType;
    show: boolean;
    hide: () => void;
};

const ModalDatosPersonales: React.FC<Props> = (props: Props) => {

    const datos = {
        dni: props.datos.docNumId,
        nombres: props.datos.asesNombres,
        apellido_paterno: props.datos.asesPaterno,
        apellido_materno: props.datos.asesMaterno,
        correo_institucional: `${props.datos.docNumId}@upla.edu.pe`,
        correo: '',
        celular: '',
        telefono: '',
        direccion: '',
        id_departamento: '',
        id_provincia: '',
        id_distrito: '',
    };

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold text-xl my-auto'>DATOS PERSONALES</span>
                        </div>
                        <div className='flex mr-4'>
                            <NavLink
                                to={''}
                                className="hover:underline m-auto text-[#007CBC]"
                            >
                                <span className='font-semibold'>¿Puedo cambiar mis datos?</span>
                                <i className={`bi bi-info-circle-fill ml-2 text-lg`} />
                            </NavLink>
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="dni" className='font-bold mb-1'>DNI</label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.dni}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="nombres" className='font-bold mb-1'>Nombre(s)</label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.nombres}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="apellidoPaterno" className='font-bold mb-1'>Apellido Paterno</label>
                            <input
                                type="text"
                                id="apellidoPaterno"
                                name="apellidoPaterno"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.apellido_paterno}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="apellidoMaterno" className='font-bold mb-1'>Apellido Materno</label>
                            <input
                                type="text"
                                id="apellidoMaterno"
                                name="apellidoMaterno"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.apellido_materno}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 mt-3'>
                        <i className="bi bi-2-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                        <span className='ml-4 font-bold text-xl my-auto'>DATOS DE CONTACTO</span>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="correoInstitucional" className='font-bold mb-1'>Correo Institucional</label>
                            <input
                                type="text"
                                id="correoInstitucional"
                                name="correoInstitucional"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.correo_institucional}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="correo" className='font-bold mb-1'>Correo(*)</label>
                            <input
                                type="text"
                                id="correo"
                                name="correo"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.correo}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="celular" className='font-bold mb-1'>Celular</label>
                            <input
                                type="text"
                                id="celular"
                                name="celular"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.celular}

                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="telefono" className='font-bold mb-1'>Teléfono Casa</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.telefono}
                            />
                        </div>
                    </div>
                    <hr className='-my-0.5' />
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="direccion" className='font-bold mb-1'>Dirección(*)</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.direccion}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="departamento" className='font-bold mb-1'>Departamento</label>
                            <select
                                id="departamento"
                                name="departamento"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.id_departamento}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">JUNÍN</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="provincia" className='font-bold mb-1'>Provincia</label>
                            <select
                                id="provincia"
                                name="provincia"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.id_provincia}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">HUANCAYO</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="distrito" className='font-bold mb-1'>Distrito</label>
                            <select
                                id="distrito"
                                name="distrito"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.id_distrito}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">HUANCAYO</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <div className='w-full flex justify-between'>
                    <div className=' flex w-7/12'>
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className='flex gap-3 w-5/12 justify-end'>
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalDatosPersonales;