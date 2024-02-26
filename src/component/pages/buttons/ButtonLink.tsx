import { NavLink } from "react-router-dom";

type Props = {
    to: string,
    nombre: string,
    icon: string
}

const ButtonLink = (props: Props) => {
    return (

        <NavLink
            to={props.to}
            className={`
                flex 
                items-center 
                justify-between
                w-40
                p-3 
                text-lg 
                font-normal 
                transition-all 
                duration-200
                bg-white
                text-blue-500
                border-blue-500
                border
                hover:bg-blue-500
                hover:text-white 
                `}
        >
            <span> {props.nombre}</span>
            <i className={`bi ${props.icon} text-xl`} />
        </NavLink>

    );

}

export default ButtonLink;