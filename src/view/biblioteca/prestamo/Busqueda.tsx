import { BibliotecaItemComponent } from "@/component/pages/elementos/ElementoBiblioteca";
import FiltroComponent from "@/component/pages/filtros/FiltroComponent";
import { bibliotecaItems, filtroTipo, filtrosBiblioteca, ubicacionBiblioteca } from "@/helper/prueba.helper";
import { ItemFiltro } from "@/model/interfaces/biblioteca/item";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Busqueda = () => {

    const navigate = useNavigate()

    const [ubicacion, setUbicacion] = useState<number | string>(0)
    const [tipoFiltro, setTipoFiltro] = useState<number | string>(0)
    const [textoBusqueda, setTextoBusqueda] = useState<string>('')

    //Filtros
    const [selectedItems, setSelectedItems] = useState<ItemFiltro[]>([])


    const handleSelectionChange = (selectedItems: ItemFiltro[]) => {
        setSelectedItems(selectedItems);
    };


    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                    <div className="p-1 bg-Solid">
                        <div className="text-2xl font-bold">
                            <span onClick={() => navigate(-1)} title="Atrás" role="button">
                                <i className="bi bi-arrow-left-circle-fill text-blue-500" />
                            </span> Consultar Bibliografia
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="w-full mx-auto py-4 rounded-md">
                                <div className="flex gap-6 ">
                                    <div className="text-2xl my-auto text-gray-400 hover:text-upla-100" title="Home" role="button"
                                        onClick={() => { }}
                                    >
                                        <i className="bi bi-house-fill ml-2" />
                                    </div>
                                    <div className="flex">
                                        <select
                                            id="ubicacion"
                                            className="w-full border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0"
                                            value={ubicacion}
                                            onChange={(e) => setUbicacion(e.target.value)}
                                        >
                                            {
                                                ubicacionBiblioteca.map((ubicacion) => (
                                                    <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.descripcion}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="flex">
                                        <select
                                            id="tipo"
                                            className="w-full border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0"
                                            value={tipoFiltro}
                                            onChange={(e) => setTipoFiltro(e.target.value)}
                                        >
                                            {
                                                filtroTipo.map((tipo) => (
                                                    <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="flex flex-grow">
                                        <input
                                            type="text"
                                            id="textoBusqueda"
                                            className="w-full rounded-lg outline-none border-gray-200 focus:ring-blue-200 focus:ring-0 text-left"
                                            value={textoBusqueda}
                                            onChange={(e) => setTextoBusqueda(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            className=" bg-red-400 text-white px-3 py-2 rounded-md hover:bg-gray-600 flex gap-2"
                                            onClick={() => { }}
                                        >
                                            <i className="bi bi-search text-sm my-auto" /> Buscar
                                        </button>
                                        <a href="#" className="underline my-auto text-gray-500 hover:text-upla-100 font-semibold inline-block">
                                            Búsqueda avanzada
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div className="w-full flex">
                                <div className=" flex flex-col w-48 p-2 gap-2 border border-gray-300">
                                    <div className="text-center p-1 font-semibold">
                                        Filtrar Resultados
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {
                                            filtrosBiblioteca
                                                .filter(item => item.estado === true) // Filtrar solo los elementos con estado true
                                                .map(item => (
                                                    <FiltroComponent
                                                        key={item.id} // Asegúrate de tener una clave única para cada componente
                                                        data={item}
                                                        onSelectionChange={handleSelectionChange}
                                                    />
                                                ))
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-grow border border-gray-300 border-l-0">
                                    <div className="flex flex-col w-full ">
                                        <div className="w-full flex border-t-0 border-x-0 border border-b-gray-300 p-2 justify-between">
                                            <span className="p-1 bg-orange-100 text-sm font-semibold">
                                                "###" Resultados encontrados
                                            </span>
                                            <div className="p-1 bg-green-200 text-sm">
                                                PAGINADOR
                                            </div>
                                        </div>
                                        <div className="w-full flex border-t-0 border-x-0 border border-b-gray-300 p-2 py-1  justify-between">
                                            <div className="flex gap-2">
                                                <button className="rounded flex px-3 py-2 text-xs bg-gray-500 hover:bg-upla-100 text-white my-auto">
                                                    Marcar todo
                                                </button>
                                                <button className="rounded flex px-3 py-2 text-xs bg-gray-500 hover:bg-upla-100 text-white my-auto">
                                                    Desmarcar todo
                                                </button>
                                            </div>
                                            <div className="p-1 text-sm">
                                                <select
                                                    className="border rounded-md px-4 border-gray-200 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm"
                                                    onChange={() => { }}
                                                >
                                                    {/*<option value={0} className="text-xs" disabled>Ordenar por:</option>*/}
                                                    <option value={1} className="text-xs">Relevancia</option>

                                                    <optgroup label="Autor" className="text-xs">
                                                        <option value={2}>Autor (A-Z)</option>
                                                        <option value={3}>Autor (Z-A)</option>
                                                    </optgroup>
                                                    <optgroup label="Popularidad" className="text-xs">
                                                        <option value={4}>Popularidad (Mayor a menor)</option>
                                                        <option value={5}>Popularidad (Menor a mayor)</option>
                                                    </optgroup>
                                                    <optgroup label="Título" className="text-xs">
                                                        <option value={6}>Título (A-Z)</option>
                                                        <option value={7}>Título (Z-A)</option>
                                                    </optgroup>
                                                    <optgroup label="Fecha" className="text-xs">
                                                        <option value={8}>Fecha de adquisición (Mayor a menor)</option>
                                                        <option value={9}>Fecha de adquisición (Menor a mayor)</option>
                                                        <option value={10}>Fecha de publicación (Mayor a menor)</option>
                                                        <option value={11}>Fecha de publicación (Menor a mayor)</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">

                                            {
                                                bibliotecaItems.map((item,index) => (
                                                    <BibliotecaItemComponent key={index} item={item} indice={index+1}/>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold">Lista de Filtros:</span>
                                <div className=" flex flex-wrap gap-2">
                                    {
                                        selectedItems.map(item => (
                                            <div key={item.id} className="p-1 px-2 border text-xs bg-upla-100 text-white">
                                                {item.descripcion}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Busqueda