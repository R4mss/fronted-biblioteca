import { IconType } from 'react-icons';


type Props = {
    icono: IconType
    titulo: string
    estadoBtn: boolean
    handleMatriculaModalidad: () => void;
}

const IcoAprobado = () => {
    return (
        <i className="bi bi-check-square-fill text-xl text-green-500"></i>
    )
}


const AccordionItem = (props: Props) => {

    return (
        <>
            <div className="border border-gray-300 rounded-lg shadow-md p-3 flex justify-between px-4">

                {
                    props.estadoBtn ?
                        (
                            <>
                                <div className='flex gap-4 my-auto'>
                                    <h3 className="text-xl font-bold uppercase text-upla-100">
                                        {props.titulo}
                                    </h3>
                                </div>
                                <div className="text-green-600">
                                    <button
                                        className="block mt-0 text-sm text-white bg-blue-500 border border-blue-500 rounded-4xl py-2 px-4 text-center hover:bg-blue-700"
                                        onClick={

                                            () => props.handleMatriculaModalidad()}>
                                        Matricularme
                                    </button>
                                </div>
                            </>

                        )
                        :

                        (
                            <div>
                                <h3 className="text-lg font-semibold "><IcoAprobado /> Usted ya cuenta con una matricula para el periodo actual</h3>
                            </div>

                        )

                }
            </div>

        </>

    );
};

export default AccordionItem;
