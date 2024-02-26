import { NavLink } from "react-router-dom";

type Props = {
    imagen: React.ReactNode,
    titulo: string,
    subTitulo: string,
    to: string,
    info: string,
    color: string
}

const ModalidadCard = (props: Props) => {
    return (
<div className={` border border-gray-300 overflow-hidden flex shadow-lg transition duration-300 ease-in-out transform hover:shadow-2xl`}>
    <div className="flex-1 px-6 py-4">
        <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold">{props.titulo}</h2>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600">{props.subTitulo}</span>
        </div>
        <NavLink
            to={props.to}
            className={`bg-gray-800 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-full text-sm`}
        >
            <span>Más Información</span>

        </NavLink>

    </div>
    <div className={`p-3 border-l-4 border-${props.color}-500 rounded-l-full flex items-center w-20 bg-${props.color}-400 transition duration-300 ease-in-out transform hover:scale-110`}>
        <span className="text-white text-5xl">
            <i className={`text-6xl transform-gpu scale-100 hover:scale-110`}>{props.imagen}</i>
        </span>
    </div>
</div> 





    );

}

export default ModalidadCard;