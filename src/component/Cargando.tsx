import { useEffect, useState } from "react";
import { LoaderSvg } from "./Svg.component";

const Cargando = () => {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        // Incrementa los puntos cada segundo
        const intervalId = setInterval(() => {
            setDots(prevDots => (prevDots < 3 ? prevDots + 1 : 1));
        }, 400);

        // Limpia el temporizador cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    const getDots = () => ' '.repeat(dots).replace(/./g, '.');


    return (
        <div className="flex gap-2">
            <LoaderSvg /> <span className="my-auto">Cargando datos {getDots()}</span>
        </div>
    )
}

export default Cargando