import React, { useRef, useEffect, useState } from "react";
import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import RespValue from "@/model/interfaces/RespValue.model.interface";

import { InsertarNotasHorarioAsignatura, ListarPreRegistroNotas } from "@/network/rest/idiomas.network";

import { isNumeric, keyNumberFloat } from "@/helper/herramienta.helper";
import useSweerAlert from "@/component/hooks/useSweetAlert"

import ModalEditarNota from './modal/EditarNotaEstudiante'


type Props = {
    handleCloseModuloDetalle: () => void;
    item: any
    idHorarioAsignatura: number
    sigla: string
};



const RegistrarNotasGeneral = (props: Props) => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const abortController = useRef(new AbortController());

    const sweet = useSweerAlert();

    const [matriculadosAsig, setMatriculadoAsig] = useState<any[]>([])
    const [registrado, setRegistrado] = useState(0)

    const [detMatriculaIdActual, setDetMatriculaIdActual] = useState(0)
    const [tipCaliIdActual, setTipCaliIdActual] = useState(0)
    const [notaActual, setNotaActual] = useState(0)
    const [detNotaIdActual, setDetNotaIdActual ] = useState(0)
    const [estudianteIdActual, setEstudianteIdActual] = useState("")
    const [infoEstudianteActual, setInfoEstudianteActual] = useState("")


    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        EstudiantesMatriculados()
    }, [])

    const EstudiantesMatriculados = async () => {
        setMatriculadoAsig([])

        const response = await ListarPreRegistroNotas<Listas>(props.item.horarioAsigId, abortController.current)
        if (response instanceof Response) {

            const data = response.data.resultado as any[]

            let nuevoLista: any[] = [];

            let condicionRegistro = 0

            for (let j = 0; j < data.length; j++) {

                const item = data[j];

                if (item.condNota1 == 'si' || item.condNota2 == 'si' || item.condNota3 == 'si' || item.condNota4 == 'si' || item.condNota5 == 'si' || item.condNota6 == 'si') {
                    condicionRegistro = 1
                }

                let objeto: any = {

                    detMatriculaId: item.detMatriculaId,
                    estudianteId: item.estudianteId,
                    estPaterno: item.estPaterno,
                    estMaterno: item.estMaterno,
                    estNombres: item.estNombres,
                    sede: item.sede,
                    detalle: [] as any[]

                };
                let subObjeto = []

                subObjeto.push(
                    ...Array.from({ length: 6 }, (_, i) => ({
                        "detNotaId": item[`detNotaId${i + 1}`] == 0 ? i + 1 : item[`detNotaId${i + 1}`],
                        "detMatriculaId": item.detMatriculaId,
                        "tipCaliId": item[`tipCaliId${i + 1}`] == 0 ? i + 1 : item[`tipCaliId${i + 1}`],
                        "nota": item[`nota${i + 1}`] || 0,
                        "condNota": item[`condNota${i + 1}`],
                        "estudianteId": item.estudianteId,
                        "infoEstudiante": `${item.estPaterno} ${item.estMaterno} ${item.estNombres}`
                    })) 
                );

                objeto.detalle = subObjeto
                nuevoLista.push(objeto);

            }

            setRegistrado(condicionRegistro)
            setMatriculadoAsig(nuevoLista)

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const registrarNotasMasivo = async () => {


        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                sweet.openInformation("Mensaje", "Procesando información...")

                let NotasListas: any[] = []

                matriculadosAsig.map((item) => {
                    item.detalle.map((obj: any) => {

                        const registro = {
                            "detMatriculaId": obj.detMatriculaId,
                            "tipCaliId": obj.tipCaliId,
                            "nota": parseFloat(obj.nota),
                        }
                        NotasListas.push(registro)
                    })
                })

                const response = await InsertarNotasHorarioAsignatura<RespValue>(codigo, NotasListas, abortController.current)
                if (response instanceof Response) {

                    const mensaje = response.data.value as string

                    if (mensaje == 'procesado') {

                        sweet.openSuccess("Mensaje", "Registros insertados correctamente", () => {
                            EstudiantesMatriculados()
                        });

                    } else {
                        sweet.openWarning("Mensaje", "Ocurrio un error al procesar la peticion", () => {
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

    const handleInputDetalle = (event: React.ChangeEvent<HTMLInputElement>, detMatriculaId: string, tipCaliId: string) => {

        const inputValue = event.target.value;

        let newMatriculadosAsig: any[] = []

        if (inputValue.trim() == '') {

            // Si está vacío, se establece como inválido
            //idInput?.classList.add('bg-red-300');

            newMatriculadosAsig = matriculadosAsig.map((item) => {
                return {
                    ...item,
                    detalle: item.detalle.map((matricula: any) => {
                        if (matricula.detMatriculaId === detMatriculaId && matricula.tipCaliId === tipCaliId) {
                            return { ...matricula, nota: 0 };
                        } else {
                            return matricula;
                        }
                    })
                };
            });

        } else {
            if (isNumeric(inputValue)) {
                if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
                    // Si es numérico y está dentro del rango, se establece como válido
                    //idInput?.classList.remove('bg-red-300');

                    newMatriculadosAsig = matriculadosAsig.map((item) => {
                        return {
                            ...item,
                            detalle: item.detalle.map((matricula: any) => {
                                if (matricula.detMatriculaId === detMatriculaId && matricula.tipCaliId === tipCaliId) {
                                    return { ...matricula, nota: inputValue };
                                } else {
                                    return matricula;
                                }
                            })
                        };
                    });


                } else {
                    //idInput?.classList.add('bg-red-300');
                    // Si es numérico pero está fuera del rango, se establece como inválido

                    newMatriculadosAsig = matriculadosAsig.map((item) => {
                        return {
                            ...item,
                            detalle: item.detalle.map((matricula: any) => {
                                if (matricula.detMatriculaId === detMatriculaId && matricula.tipCaliId === tipCaliId) {
                                    return { ...matricula, nota: 0 };
                                } else {
                                    return matricula;
                                }
                            })
                        };
                    });
                }


            }
        }

        setMatriculadoAsig(newMatriculadosAsig);

    }

    const generarBody = () => {

        if (matriculadosAsig.length == 0) {
            return (
                <tr className="text-center bg-white border-b">
                    <td colSpan={9} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                </tr>
            );
        }


        return matriculadosAsig.map((item, index) => {

            return (
                <tr key={index} className="text-sm">
                    <td className="border p-2">{++index}</td>
                    <td className="border p-2">{item.estudianteId}</td>
                    <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                    <td className="border p-2">{item.sede}</td>
                    {
                        item.detalle.map((matricula: any, index: any) => (
                            <td className="border p-2" key={index}>
                                <div className="relative flex items-center">
                                    <div className="relative ">


                                        <input
                                            disabled={registrado == 0 ? false : true}
                                            id={`${matricula.tipCaliId}-${index}-${matricula.detMatriculaId}`}
                                            className={`font-mont border text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center ${registrado == 0 ? 'bg-white' : 'bg-gray-200'}`}
                                            type="text"
                                            maxLength={5}
                                            value={matricula.nota}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDetalle(event, matricula.detMatriculaId, matricula.tipCaliId)}

                                            onPaste={handlePaste}
                                            onClick={() => selectAllText(`${matricula.tipCaliId}-${index}-${matricula.detMatriculaId}`)}
                                            onKeyDown={keyNumberFloat}
                                        />
                                        <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${matricula.condNota == 'no' ? 'text-gray-400' : 'text-green-400'} `}></i>
                                    </div>
                                    {
                                        registrado == 0 ?
                                            (
                                                <></>
                                            ) : (
                                                <span
                                                    title="Editar Nota" 
                                                    className="ml-1 cursor-pointer"
                                                    onClick={ () => handleShowModal(matricula.detNotaId, matricula.detMatriculaId, matricula.tipCaliId, matricula.nota, matricula.estudianteId, matricula.infoEstudiante)}
                                                    >
                                                    <i className="bi bi-pencil-fill text-yellow-400 text-xs"></i>
                                                </span>
                                            )
                                    }

                                </div>
                            </td>
                        ))
                    }
                </tr>
            );
        });

    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    const selectAllText = (index: any) => {

        const idInput = document.getElementById(index)
        if (idInput && idInput instanceof HTMLInputElement) {
            idInput.select();
        }
    };


    //Modal Editar Nota
    const handleCloseModal = () =>{
        setShowModal(false);
    } 
    const handleShowModal = (detNotaId: number, detMatriculaId: number, tipCaliId: number, nota: number, estudianteId: string, infoEstudiante: string) => {
        setShowModal(true);

        setDetNotaIdActual(detNotaId)
        setDetMatriculaIdActual(detMatriculaId)
        setTipCaliIdActual(tipCaliId)
        setNotaActual(nota)
        setEstudianteIdActual(estudianteId)
        setInfoEstudianteActual(infoEstudiante)
    }

    return (
        <>
            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Regristro de Notas: {props.sigla}</h2>

                <div className="w-full">

                    <ModalEditarNota 
                        codigo = {codigo}
                        detNotaId={detNotaIdActual}
                        detMatriculaId = {detMatriculaIdActual} 
                        tipCaliId = {tipCaliIdActual}
                        nota = {notaActual}
                        estudianteId={estudianteIdActual}
                        infoEstudiante={infoEstudianteActual}
                        
                        showModal = {showModal}
                        handleCloseModal = {handleCloseModal}
                        EstudiantesMatriculados = {EstudiantesMatriculados}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2 mt-3">
                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                            <div className="m-2">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <div className="text-sm">
                                        <p>Sede: <span className="text-blue-700 font-bold">{props.item.sede}</span></p>
                                        <p>Periodo: <span className="text-blue-700 font-bold">{props.item.anio} - {props.item.mes}</span></p>
                                        <p>Modalidad: <span className="text-blue-700 font-bold ">{props.item.modalidad}</span></p>
                                        <p>Tipo Estudio: <span className="text-blue-700 font-bold ">{props.item.tipoEstudio}</span></p>
                                        <p>Turno: <span className="text-blue-700 font-bold">{props.item.turno}</span></p>
                                        <p>Capacidad: <span className="text-blue-700 font-bold">{props.item.capacidad}</span></p>
                                    </div>
                                    <div className="text-sm">
                                        <p>Aula: <span className="text-blue-700 font-bold">{props.item.aula}</span></p>
                                        <p>Sección: <span className="text-blue-700 font-bold">{props.item.seccion}</span></p>
                                        <p>Asignatura: <span className="text-blue-700 font-bold">{props.item.asignatura}</span></p>
                                        <p>Instructor: <span className="text-blue-700 font-bold">{props.item.docenteDni ? '' : props.item.docenteDni} / {props.item.docente ? '' : props.item.docente}</span></p>
                                        <p>Cantidad: <span className="text-blue-700 font-bold">{props.item.cantidad}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2 mt-3">
                        <div>
                            <label
                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                            >
                                Opciones
                            </label>
                            <div className="relative flex flex-wrap">
                                {
                                    registrado == 0 ?
                                        (
                                            <>
                                                <button
                                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                                                    onClick={registrarNotasMasivo}
                                                >
                                                    <i className="bi bi-search mr-1"></i> Registrar Notas
                                                </button>
                                            </>
                                        ) : (
                                            <></>
                                        )
                                }

                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-auto rounded-md my-3 overflow-y-auto">
                        <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                            <thead className="bg-upla-100 text-white">
                                <tr>
                                    <th className="py-1 px-6">#</th>
                                    <th className="py-1 px-6">Codigo</th>
                                    <th className="py-1 px-6">Estudiante</th>
                                    <th className="py-1 px-6">Sede</th>
                                    <th className="py-1 px-6">N. Lectura</th>
                                    <th className="py-1 px-6">N. Escritura</th>
                                    <th className="py-1 px-6">N. Hablado</th>
                                    <th className="py-1 px-6">N. Práctica en Linea</th>
                                    <th className="py-1 px-6">N. Examen Intermedio</th>
                                    <th className="py-1 px-6">N. Examen Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generarBody()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )

}

export default RegistrarNotasGeneral