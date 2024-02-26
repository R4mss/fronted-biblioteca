import React from 'react';
import { IconType } from 'react-icons';
// import { BiCalendar, BiDollarCircle, BiCheck } from 'react-icons/bi';

interface StepButtonProps {
    paso: number;
    pasoActual: number;
    cambiarPaso: (paso: number) => void;
    icono: IconType;
    texto?: string;

}

const StepButtonMatriculaIdioma: React.FC<StepButtonProps> = ({ paso, pasoActual, cambiarPaso, icono: Icono, texto }) => {
    return (
        <button
            className={`w-16 h-16 rounded-full focus:outline-none flex items-center justify-center ml-4 ${
                pasoActual === paso ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => {
                cambiarPaso(paso)
            }}
        >
            {pasoActual === paso ? (
                <Icono className="text-5xl" />
            ) : (
                <span className="text-xl">{paso}</span>
            )}
            {texto && <p className="text-sm">{texto}</p>}
        </button>
    );
};

export default StepButtonMatriculaIdioma;
