import Sede from "./sede/sede"
import ReportesInfo from "./trabajador/reportesInfo"


export default interface Listas {
    resultado: Sede[] | ReportesInfo[]
}