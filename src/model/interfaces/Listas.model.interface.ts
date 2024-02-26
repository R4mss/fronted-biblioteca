import Programa from "./programa/programa"
import Modalidad from "./modalidad/modalidad"
import Sede from "./sede/sede"
import Idioma from "./idioma/idioma"
import Turno from "./turno/turno"
import Periodo from "./periodo/periodo"
import TipoEstudio from "./tipo-estudio/tipoEstudio"
import Asignatura from "./asignatura/asignatura"
import DocenteInfo from "./docente/docenteInfo"
import Aula from "./aula/aula"
import Seccion from "./seccion/seccion"

import ListHorarioDetId from "./horario/listHorarioDetId"

import MatriculaPago from './pago/matriculaPago'
import PensionPago from './pago/pensionPago'

import MatriculaUsados from './matricula/matriculaUsados'
import PensionUsados from './matricula/pensionUsados'

import CicloInfo from "./matricula/ciclosInfo"
import HorarioDisponible from "./horario/horarioDisponible"

import ReportesInfo from "./trabajador/reportesInfo"


export default interface Listas {
    resultado: Programa[] | Modalidad[] | Sede[] | Idioma[] | Turno[] | Periodo[] | TipoEstudio[] | Asignatura[] | DocenteInfo[] | Aula[] |  Seccion[] | ListHorarioDetId[] | MatriculaPago[] | PensionPago[] | CicloInfo[] | MatriculaUsados[] | PensionUsados[] | HorarioDisponible[] | ReportesInfo[]
}