import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model.enum"
import Listas from "@/model/interfaces/Listas.model.interface"
import Modalidad from "@/model/interfaces/modalidad/modalidad"
import Sede from "@/model/interfaces/sede/sede"
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio"
import Turno from "@/model/interfaces/turno/turno"
import { ListarSede, ListarTipoEstudio, ListarTurno, ListarModalidad } from "@/network/rest/idiomas.network"
import { useEffect, useRef, useState } from "react"
import ModalVistaHorario from "./modal/VistaHorario.modal"


type DatosType = {
    id: number;
    idAsign: number,
    asignatura: string,
    aula: string,
    sede: string,
    idsede: number,
    turno: string,
    idTurno: number,
    horario: string,
    idHorario: number,
    modalidad: string,
    idModalidad: number,
    tipo: string,
    idTipo: number,
    inscritos: number,
    capacidad: number,
    estado: number,
};

const VistaHorarioEstudiante = () => {

    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([])
    const [comboBoxTurno, setComboBoxTurno] = useState<Turno[]>([])

    const [dataModel, setDataModel] = useState<DatosType>()
    // const [dataModel, setDataModel] = useState<DatosType>()

    // const [idModalidad, setIdModalidad] = useState<number>(0)

    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>('0')
    const [idTurno, setIdTurno] = useState<number>(0)

    const refTipoEstudio = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refTurno = useRef<HTMLSelectElement>(null)


    const abortController = useRef(new AbortController());

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        LoadDataModalidad()
        LoadDataTipoEstudio()
        LoadDataSede()
        LoadDataTurno()

    }, [])

    const LoadDataModalidad = async () => {

        setComboBoxModalidad([])

        const response = await ListarModalidad<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxModalidad(response.data.resultado as Modalidad[])

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataTipoEstudio = async () => {

        setComboBoxTipoEstudio([])

        const response = await ListarTipoEstudio<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataSede = async () => {

        setComboBoxSede([])

        const response = await ListarSede<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxSede(response.data.resultado as Sede[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataTurno = async () => {

        setComboBoxTurno([])

        const response = await ListarTurno<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxTurno(response.data.resultado as Turno[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const data = [
        {
            id: 1,
            idAsign: 1,
            asignatura: "Ingles 1",
            aula: "Aula-A1",
            sede: "Huancayo",
            idsede: 1,
            turno: "Mañana",
            idTurno: 1,
            horario: "8:00 - 9:30",
            idHorario: 1,
            modalidad: "Presencial",
            idModalidad: 1,
            tipo: "Intensivo",
            idTipo: 1,
            inscritos: 27,
            capacidad: 30,
            estado: 1,
        },
        {
            id: 2,
            idAsign: 1,
            asignatura: "Ingles 1",
            aula: "Aula-A2",
            sede: "Huancayo",
            idsede: 1,
            turno: "Mañana",
            idTurno: 1,
            horario: "9:30 - 11:00",
            idHorario: 2,
            modalidad: "Presencial",
            idModalidad: 1,
            tipo: "Intensivo",
            idTipo: 1,
            inscritos: 28,
            capacidad: 30,
            estado: 1,
        },
        {
            id: 3,
            idAsign: 1,
            asignatura: "Ingles 1",
            aula: "Aula-A1",
            sede: "Huancayo",
            idsede: 1,
            turno: "Mañana",
            idTurno: 1,
            horario: "8:00 - 11:00",
            idHorario: 1,
            modalidad: "Presencial",
            idModalidad: 1,
            tipo: "Super Intensivo",
            idTipo: 2,
            inscritos: 30,
            capacidad: 30,
            estado: 1,
        },
        {
            id: 4,
            idAsign: 1,
            asignatura: "Ingles 1",
            aula: "Aula-A1",
            sede: "Huancayo",
            idsede: 1,
            turno: "Tarde",
            idTurno: 2,
            horario: "15:00 - 16:30",
            idHorario: 1,
            modalidad: "Presencial",
            idModalidad: 1,
            tipo: "Intensivo",
            idTipo: 1,
            inscritos: 29,
            capacidad: 30,
            estado: 1,
        },
        {
            id: 5,
            idAsign: 1,
            asignatura: "Ingles 1",
            aula: "Aula-A1",
            sede: "Chanchamayo",
            idsede: 2,
            turno: "Tarde",
            idTurno: 1,
            horario: "15:00 - 18:00",
            idHorario: 1,
            modalidad: "Presencial",
            idModalidad: 1,
            tipo: "Super Intensivo",
            idTipo: 2,
            inscritos: 25,
            capacidad: 30,
            estado: 1,
        },
    ]

    // console.log(comboBoxTipoEstudio)

    return (
        <>

            <ModalVistaHorario
                show={show}
                hide={handleClose}
                data={dataModel}
            />

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        {/* <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registrar Matricula</h2> */}

                        <div className="w-full mx-auto text-center rounded-md border-black-light border-2 p-4">
                            <h1 className="text-2xl font-bold mb-4"><i className={`bi bi-stack  text-xl pr-2`} ></i>Asignatura a matricular</h1>
                            <div>
                                <div className="grid grid-cols-3 gap-8 mb-5">
                                    {/* <div>
                                        <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                            Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refModalidad}
                                            value={idModalidad}
                                            onChange={(event) => {
                                                setIdModalidad(parseInt(event.currentTarget.value));
                                            }}
                                        >
                                            <option value={0}>- Seleccione -</option>
                                            {
                                                comboBoxModalidad.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.modalidadId}>
                                                            {item.modalidad}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div> */}
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 text-left"
                                        >
                                            Tipo <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refTipoEstudio}
                                            value={idTipoEstudio}
                                            onChange={(event) => {
                                                setIdTipoEstudio(parseInt(event.currentTarget.value));
                                            }}
                                        >
                                            <option value={0}>- Seleccione -</option>
                                            {
                                                comboBoxTipoEstudio.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.tipEstudioId}>
                                                            {item.tipoEstudio}
                                                        </option>
                                                    );

                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-mont block mb-1 text-sm font-medium text-gray-900 text-left">
                                            Sede <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refSede}
                                            value={idSede}
                                            onChange={(event) => {
                                                setIdSede(event.currentTarget.value);
                                            }}
                                        >
                                            <option value={0}>- Seleccione -</option>
                                            {
                                                comboBoxSede.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.sedeId}>
                                                            {item.sede}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-mont block mb-1 text-sm font-medium text-gray-900 text-left">
                                            Turno <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refTurno}
                                            value={idTurno}
                                            onChange={(event) => {
                                                setIdTurno(parseInt(event.currentTarget.value));
                                            }}
                                        >
                                            <option value={0}>- Seleccione -</option>
                                            {
                                                comboBoxTurno.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.turnoId}>
                                                            {item.turno}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold mb-2">Nivel 1</h2>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2">Asignatura</th>
                                            {/* <th className="py-2">Modalidad</th> */}
                                            <th className="py-2">Tipo</th>
                                            {/* <th className="py-2">Sede</th> */}
                                            <th className="py-2">Aula</th>
                                            {/* <th className="py-2">Turno</th> */}
                                            {/* <th className="py-2">Horario</th> */}
                                            <th className="py-2">Capacidad</th>
                                            <th className="py-2">Ver</th>
                                            <th className="py-2">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td className="border py-2">{item.asignatura}</td>
                                                        {/* <td className="border py-2">{item.modalidad}</td> */}
                                                        <td className="border py-2">{item.tipo}</td>
                                                        {/* <td className="border py-2">{item.sede}</td> */}
                                                        <td className="border py-2">{item.aula}</td>
                                                        {/* <td className="border py-2">{item.turno}</td> */}
                                                        {/* <td className="border py-2">{item.horario}</td> */}
                                                        <td className="border py-2">{item.inscritos}/{item.capacidad}</td>
                                                        <td className="border py-2">
                                                            <button
                                                                className="bg-emerald-400 text-white px-4 py-2 rounded font-semibold"
                                                                onClick={() => {
                                                                    setDataModel(() => ({
                                                                        id: item.id,
                                                                        idAsign: item.idAsign,
                                                                        asignatura: item.asignatura,
                                                                        aula: item.aula,
                                                                        sede: item.sede,
                                                                        idsede: item.idsede,
                                                                        turno: item.turno,
                                                                        idTurno: item.idTurno,
                                                                        horario: item.horario,
                                                                        idHorario: item.idHorario,
                                                                        modalidad: item.modalidad,
                                                                        idModalidad: item.idModalidad,
                                                                        tipo: item.tipo,
                                                                        idTipo: item.idTipo,
                                                                        inscritos: item.inscritos,
                                                                        capacidad: item.capacidad,
                                                                        estado: item.estado,
                                                                    }));
                                                                    handleShow();
                                                                }}
                                                            >
                                                                <i className={`bi bi-search pr-2`} ></i> Ver Asignatura
                                                            </button>
                                                        </td>
                                                        <td className="border py-2">
                                                            <button
                                                                className={`${item.inscritos == item.capacidad ? 'bg-red-500 cursor-not-allowed' : 'bg-blue-500'} text-white px-4 py-2 rounded font-semibold`}
                                                                onClick={() => {
                                                                }}
                                                                disabled={item.inscritos == item.capacidad}
                                                            >
                                                                {item.inscritos == item.capacidad ? ' Sin Vacantes' : '  Matricular  '}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default VistaHorarioEstudiante