import { useState } from 'react';

type ModalidadInfo = {
  titulo: string;
  info: string;
};

type Props = {
  modalidades: ModalidadInfo[];
};

const ModalidadCard = (props: Props) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="w-full mx-auto">
      {props.modalidades.map((modalidad, index) => (
        <div key={index} className="border border-gray-300 rounded-md mb-4">
          {/* Encabezado del acordeón */}
          <div
            className="border-b border-gray-300 px-4 py-2 flex items-center justify-between cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="text-lg font-semibold">{modalidad.titulo}</h2>
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openIndexes.includes(index) ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="fill-current"
                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
              />
            </svg>
          </div>
          {/* Contenido del acordeón */}
          {openIndexes.includes(index) && (
            <div className="overflow-hidden border-t border-gray-300 transition-max-height duration-300">
              <p className="px-4 py-2">{modalidad.info}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModalidadCard;
