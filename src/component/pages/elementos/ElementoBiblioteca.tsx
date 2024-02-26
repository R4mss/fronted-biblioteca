import { EngIcon, EspIcon, PortIcon } from '@/component/Svg.component';
import { BibliotecaItem } from '@/model/interfaces/biblioteca/bibliotecaItem';
import React from 'react';

interface ElementoBibliotecaProps {
    item: BibliotecaItem
    indice: number
}

export const BibliotecaItemComponent: React.FC<ElementoBibliotecaProps> = ({ item, indice }) => {
    const { titulo, autor, editorial, tipoMaterial, fecha, format, disponibilidad, ubicacion, idioma, imageUrl } = item

    return (
        <div className="flex gap-4 p-2 justify-start border-b hover:bg-gray-100">
            <div className='w-20 flex gap-4'>
                <span className='font-bold'>{indice}.</span>
                <input type="checkbox" className="mt-1" />
            </div>

            <div className='flex flex-grow'>
                <div className='flex flex-col gap-1'>
                    <div className='border-b-upla-100 border-2 border-x-0 border-t-0 border-dashed'>
                        <h2 className="text-lg font-bold text-upla-100">{titulo}</h2>
                    </div>
                    <div className='flex gap-2 font-semibold text-upla-100 justify-between'>
                        <div>
                            <span>{autor}</span>
                            <span>{fecha}</span>
                        </div>
                        <span>
                            {idioma === 'Español' &&
                                <EspIcon />
                            }
                            {idioma === 'Inglés' &&
                                <EngIcon />
                            }
                            {idioma === 'Portugués' &&
                                <PortIcon />
                            }
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <i className="bi bi-journal-bookmark-fill" />
                        <span>{tipoMaterial}</span>
                    </div>

                    <p><strong>Editorial:</strong> {editorial}</p>
                    <p><strong>Tipo de material:</strong> {tipoMaterial}</p>
                    <p><strong>Formato:</strong> {format}</p>
                    <p><strong>Disponibilidad:</strong> {disponibilidad}</p>
                    <p><strong>Ubicación actual:</strong> {ubicacion}</p>

                    <div>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            Reservar
                        </button>
                    </div>
                </div>

            </div>
            <div className='bg-red-100 w-100 p-2'>
                {imageUrl ? (
                    <img src={imageUrl} alt="Imagen de cubierta" className="w-32" />
                ) : (
                    <p>No hay imagen de cubierta disponible</p>
                )}
            </div>
        </div>
    )
}
