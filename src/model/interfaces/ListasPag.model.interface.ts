import CalendarioPag from "./calendario/calendarioPag"
import HorarioPag from "./horario/horarioPag"

export default interface ListasPag {
    resultado : HorarioPag[] | CalendarioPag[]
    total: number
}