// import { ArrowRightOnCicleSvg } from "@/component/Svg.component";
// import { NavLink } from "react-router-dom";
import Card from "../../component/pages/cards/CardDash"
// import { images } from "../../helper/index.helper";
import { Pregunta, Boleta, Horario, Libro, Identificacion } from '../../component/Iconos';


const HomeEstudiante = () => {

    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Libro />}
                    titulo={'Consolidado de matrícula'}
                    subTitulo={'Realiza tu matrícula.'}
                    color={'orange'}
                    to={'/inicio/consolidado'}
                    info={''}
                />
            </div>
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Horario />}
                    titulo={'Horario'}
                    subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                    color={'orange'}
                    to={'/inicio/proceso'}
                    info={''}
                />
            </div>
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Boleta />}
                    titulo={'Boleta de notas'}
                    subTitulo={'Administra tus peticiones.'}
                    color={'orange'}
                    to={'/inicio/boleta-notas'}
                    info={''}
                />
            </div>
            {/* <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Horario />}
                    titulo={'Inasistencia por ciclo'}
                    subTitulo={'Administra tus peticiones.'}
                    color={'orange'}
                    to={'/inicio/inasistencia'}
                    info={''}
                />
            </div> */}
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Identificacion />}
                    titulo={'Datos personales'}
                    subTitulo={'Administra tus peticiones.'}
                    color={'orange'}
                    to={'/inicio/proceso'}
                    info={''}
                />
            </div>
            <div className="w-full sm:w-1/2 p-4">
                <Card
                    imagen={<Pregunta />}
                    titulo={'Resultado Postulante'}
                    subTitulo={'Administra tus peticiones.'}
                    color={'orange'}
                    to={'/inicio/resultados-postulante'}
                    info={''}
                />
            </div>
        </div>
    )
}
export default HomeEstudiante