import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/configureStore.store";
import Estudiante from "../../../../../model/interfaces/login/estudiante.login";
import Trabajador from "../../../../../model/interfaces/login/trabajador.login";

import { images } from '../../../../../helper/index.helper'

type Props = {
    informacion: Estudiante | Trabajador | undefined
}

let informacion: string = "";

const SubTitle = (props: Props) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    if (props.informacion !== undefined) {

        const tipoUser = JSON.parse(window.localStorage.getItem("tipoUsuario") || "");

        if (tipoUser == "est") {
            let estudiante = props.informacion as Estudiante;
            informacion = estudiante.nombres + ", " + estudiante.apellidoPaterno + " " + estudiante.apellidoMaterno;
        }
        if (tipoUser == "admin") {
            let trabajador = props.informacion as Trabajador;
            informacion = trabajador.asesNombres + ", " + trabajador.asesPaterno + " " + trabajador.asesMaterno;
        }

        /*
        let estudiante = props.informacion as Estudiante;
        if (estudiante.codigo !== undefined) {
            informacion = estudiante.nombres + ", " + estudiante.apellidoPaterno + " " + estudiante.apellidoMaterno;
        } else {
            let trabajador = props.informacion as Trabajador;
            informacion = trabajador.asesNombres + ", " + trabajador.asesPaterno + " " + trabajador.asesMaterno;

        }
        */
    }

    return (
        <div className="mt-6 md:mt-0">
            <img
                className=" p-1 m-auto w-24 h-24 rounded-full ring-2 ring-gray-300 hover:scale-110 ease-in duration-300"
                src={`https://academico.upla.edu.pe/FotosAlum/037000${codigo}.jpg`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    // currentTarget.src = `https://avatars.dicebear.com/api/initials/${codigo}.svg?b=%23007cbc&bold=true`;

                    const imgError = new Image();
                    imgError.src = images.no_user; // Establece la ruta de la imagen alternativa
                    imgError.className = "p-2 m-auto w-24 h-24 rounded-full ring-2 ring-gray-300 hover:scale-110 ease-in duration-300";
                    imgError.alt = "Error avatar";

                    currentTarget.parentNode?.replaceChild(imgError, currentTarget);
                }}
                alt="Rounded avatar"
            />
            <div
                className="p-3 flex justify-center items-center">
                <h1 className="text-center font-bold text-white mr-3">
                    {informacion}
                </h1>
            </div>
            <p className="text-center text-white">{codigo}</p>
            <br />
        </div>
    );
}

export default SubTitle;