import { FiltrosBiblioteca } from '@/model/interfaces/biblioteca/filtros';
import { ItemFiltro } from '@/model/interfaces/biblioteca/item';
import React, { useState } from 'react';

interface CheckboxListProps {
    data: FiltrosBiblioteca
    onSelectionChange: (selectedItems: ItemFiltro[]) => void
}

const FiltroComponent: React.FC<CheckboxListProps> = ({ data, onSelectionChange }) => {
    const [selectedItems, setSelectedItems] = useState<ItemFiltro[]>([])
    const [show, setShow] = useState<boolean>(false)

    const handleCheckboxChange = (item: ItemFiltro) => {
        const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        let updatedSelectedItems: ItemFiltro[];

        if (selectedIndex === -1) {
            updatedSelectedItems = [...selectedItems, item];
        } else {
            updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedIndex, 1);
        }

        setSelectedItems(updatedSelectedItems);
        onSelectionChange(updatedSelectedItems);
    }



    return (
        <div className='flex flex-col'>
            <div
                className='border p-1 flex gap-2'
                onClick={() => setShow(!show)}
                role='button'>
                {!show ? <i className="bi bi-caret-right-fill my-auto text-sm text-gray-500" /> : <i className="bi bi-caret-down-fill my-auto text-sm text-gray-500" />}
                {data.descripcion}
            </div>{
                show &&
                <div className='p-1 flex flex-col my-1'>
                    {data.contenido.map((item) => (
                        <label key={item.id} className='p-1 text-sm flex gap-2 rounded hover:bg-blue-100' role='button' htmlFor={`checkbox-${item.id}`}>
                            <input
                                id={`checkbox-${item.id}`}
                                className='h-4 w-4 my-auto text-upla-100  border-gray-300 focus:outline-none focus:ring-0'
                                type="checkbox"
                                checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            <p  className='my-auto'>
                                {item.descripcion}
                            </p>
                        </label>
                    ))}
                </div>
            }
        </div>
    );
};

export default FiltroComponent;