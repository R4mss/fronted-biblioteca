import { ItemFiltro } from "./item"

export interface FiltrosBiblioteca {
    id: number
    estado: boolean
    descripcion: string
    contenido: ItemFiltro[]
}