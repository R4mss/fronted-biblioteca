import { useEffect } from "react";
import Sweet from '../../model/interfaces/Sweet.mode.interface'
//import ListHorarioDetId from "../../model/interfaces/horario/listHorarioDetId";

type Props = {
    idHorario: number
    idIdioma: number,
    nombreIdioma: string,
    nombreSede: string,
    nombreModalidad: string,
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioEstudiante = (props: Props) => {

    //const [listaHorarioDetalleId, setListaHorarioDetalleId] = useState<ListHorarioDetId[]>([])

    useEffect(() => {
        // loadInit(props.idHorario)
    }, [])

    /* const loadInit = async (horarioId: number) => {
 
         setListaHorarioDetalleId([])
 
         const response = await ListarHorarioDetalleId<Listas>(horarioId, props.abortControl)
         if (response instanceof Response) {
             setListaHorarioDetalleId(response.data.resultado as ListHorarioDetId[])
         }
         if (response instanceof RestError) {
             if (response.getType() === Types.CANCELED) return;
             console.log(response.getMessage())
         }
     }*/

    useEffect(() => {
        //dataRenderHorario()
        // dataRenderHorarioColor()
    }, [])


    /* const dataRenderHorario = async () => {
 
         if (listaHorarioDetalleId.length > 0) {
 
             setDataHorario(
                 listaHorarioDetalleId.map((item) => {
 
                     const currentDate = new Date();
 
                     const startDate = new Date(currentDate);
                     const endDate = new Date(currentDate);
 
                     const [startHour, startMin] = item.horaIni.split(":");
                     const [endHour, endMin] = item.horaFin.split(":");
 
                     startDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
                     endDate.setHours(parseInt(endHour), parseInt(endMin), 0, 0);
 
                     return {
                         detHorarioId: item.detHorarioId,
                         asignaturaId: item.asiId,
                         asignatura: item.asignatura,
                         nivel: item.nivel,
                         startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                         endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),
                         horaIni: item.horaIni,
                         horaFin: item.horaFin,
                         horaAcademica: item.horaAcademica,
                         color: item.color,
                         docente: item.docente,
                         seccion: item.seccion,
                         turno: item.turno,
                         tipoEstudio: item.tipoEstudio,
                         // aula: item.aula,
                         observacion: item.observacion,
                         dia: item.dia,
                         recurrenceRule: 'FREQ=WEEKLY',
                         // disponible: item.disponible,
                         modHora: item.fechaModifica,
                         // modalidad: item.modalidad,
                         // ocupado: item.ocupado,
                         capacidad: item.capacidad,
                         docenteId: item.docenteId,
 
                         //codCursal: item.codCursal,
                         visibleeee: item.estado,
 
                         roomId: item.color
                     };
 
                 })
 
             );
 
         }
 
     }
 
     const dataRenderHorarioColor = async () => {
         if (listaHorarioDetalleId.length > 0) {
 
             setColor(
                 listaHorarioDetalleId.map((item) => {
                     return {
                         id: item.color,
                         color: item.color,
                         // text: ""
                     }
                 })
 
             )
 
         }
     }*/


    return (
        <>
            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Horario - N ####</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <div>

                            </div>
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                            //onClick={dataRenderHorario}
                            >
                                <i className="bi bi-eye-fill mr-1"></i> Ver Horarios
                            </button>

                        </div>
                        <div className="text-center ">
                            <span className="text-lg font-semibold text-gray-500">{props.nombreIdioma} - {props.nombreSede} - {props.nombreModalidad}</span>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
export default HorarioEstudiante