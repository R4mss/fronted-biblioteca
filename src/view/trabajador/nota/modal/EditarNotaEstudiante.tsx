import CustomModal from "@/component/Modal.component";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";

import { ActualizarNotaIndividual, } from "@/network/rest/idiomas.network";

import { useRef, useState } from "react";

import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { keyNumberFloat } from "@/helper/herramienta.helper";
import RespValue from "@/model/interfaces/RespValue.model.interface";

type Props = {
    codigo: string
    detNotaId: number
    detMatriculaId: number
    tipCaliId: number
    nota: number
    estudianteId: string
    infoEstudiante: string
    showModal: boolean;
    handleCloseModal: () => void;

    EstudiantesMatriculados: () => void;

};

const EditarNotaEstudiante = (props: Props) => {

    const [observacion, setObservacion] = useState("")
    const [nuevaNota, setNuevaNota] = useState("")

    const refNota = useRef<HTMLInputElement>(null)
    const refObservacion = useRef<HTMLTextAreaElement>(null)

    const abortController = useRef(new AbortController());

    const sweet = useSweerAlert();

    const tipoCalificacion: string = props.tipCaliId == 1 ? 'LECTURA'
        : props.tipCaliId == 2 ? 'ESCRITURA'
            : props.tipCaliId == 3 ? 'HABLADO'
                : props.tipCaliId == 4 ? 'PRÁCTICA EN LINEA'
                    : props.tipCaliId == 5 ? 'EXAMEN INTERMEDIO'
                        : props.tipCaliId == 6 ? 'EXAMEN FINAL' : ''



    const loadInit = async () => {
        refNota.current?.focus()
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };


    const actualizarNota = () => {

        if (nuevaNota.trim() == "" || nuevaNota.length == 0) {
            refNota.current?.focus()
            return
        }
        if (parseFloat(nuevaNota) < 0 || parseFloat(nuevaNota) > 20) {
            refNota.current?.focus()
            return
        }
        if (observacion.trim() == "") {
            refObservacion.current?.focus()
            return
        }

        // ActualizarNotaIndividual

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                sweet.openInformation("Mensaje", "Procesando información...")

                const params = {
                    "codigo": props.codigo,
                    "detMatriculaId": props.detMatriculaId,
                    "detNotaId": props.detNotaId,
                    "nota": parseFloat(nuevaNota),
                    "observacion": observacion
                }

                const response = await ActualizarNotaIndividual<RespValue>(params, abortController.current)
                if (response instanceof Response) {

                    const mensaje = response.data.value as string

                    if (mensaje == 'procesado') {

                        sweet.openSuccess("Mensaje", "Registro actulizado correctamente", () => {
                            props.handleCloseModal()
                        });

                    } else {
                        sweet.openWarning("Mensaje", "Ocurrio un error al procesar la petición", () => {
                        });

                    }
                }
                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return;

                    sweet.openWarning("Mensaje", response.getMessage(), () => {
                    });
                }

            }
        })


    }

    return (
        <CustomModal
            isOpen={props.showModal}
            onOpen={() => {
                loadInit()
            }}
            onHidden={() => {
                setNuevaNota("")
                setObservacion("")
                props.EstudiantesMatriculados()

            }}
            onClose={props.handleCloseModal}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">

                    <div className="flex justify-between w-11/12">
                        <h6 className="py-1 font-bold text-lg"> Editar Nota</h6>

                    </div>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.handleCloseModal}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-3 mt-3">
                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                        <div className="m-2">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <div className="text-sm">
                                    <p>Codigo <span className="text-blue-700 font-bold">{props.estudianteId}</span></p>
                                    <p>Tipo Nota: <span className="text-blue-700 font-bold">{tipoCalificacion}</span></p>
                                </div>
                                <div className="text-sm">
                                    <p>Estudiante: <span className="text-blue-700 font-bold">{props.infoEstudiante}</span></p>
                                    <p>Nota Actual: <span className="text-blue-700 font-bold">{props.nota}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full py-0 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">

                        <div>
                            <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                Nota <i className="bi bi-asterisk text-xs text-red-500"></i>
                            </label>
                            <input
                                type="text"
                                maxLength={5}
                                className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center"
                                ref={refNota}
                                value={nuevaNota}
                                onChange={(event) => {
                                    setNuevaNota(event.currentTarget.value)
                                }}
                                onPaste={handlePaste}
                                onKeyDown={keyNumberFloat}
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">
                        <div>
                            <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                Observación <i className="bi bi-asterisk text-xs text-red-500"></i>
                            </label>
                            <textarea
                                rows={2}
                                className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                ref={refObservacion}
                                value={observacion}
                                onChange={(e) => setObservacion(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="relative flex flex-wrap justify-center mb-2">
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                            onClick={actualizarNota}
                        >
                            <i className="bi bi-floppy mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.handleCloseModal}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <span className="text-xs">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div>

                </div>

            </div>

        </CustomModal>
    )
}

export default EditarNotaEstudiante;