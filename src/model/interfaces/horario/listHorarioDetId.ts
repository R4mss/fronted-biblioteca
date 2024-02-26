export default interface ListHorarioDetId {
    detHorarioId: number
    horarioId: number
    horarioAsigId: number
    capacidad: number
    asiId: string
    asiNivel: string
    asignatura: string
    docente: string
  
    dia: number
    horaIni: string
    horaFin: string
    color: string
    observacion: string
    estado: number
    visible: number
    usuarioRegistra: string
    fechaRegistra: Date
    usuarioModifica: string
    fechaModifica: Date
    
    numDocTrabajador: string
    
}