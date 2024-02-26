import { useRef, useEffect, useState } from "react";
import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import { ListarPreRegistroNotas } from "@/network/rest/idiomas.network";

// import TablaRegistroNotas from "./component/TrRegistroNotas";
// import NotaUno from "./component/NotaUno";
import { isNumeric, keyNumberFloat } from "@/helper/herramienta.helper";

import * as XLSX from 'xlsx';

type Props = {
    handleCloseModuloDetalle: () => void;
    item: any
    idHorarioAsignatura: number
};

interface ExcelDataItem {
    [key: string]: any;
}
type ExcelData = ExcelDataItem[];

const RegistrarNotasGeneralExcel = (props: Props) => {

    const abortController = useRef(new AbortController());

    //const sweet = useSweerAlert();
    const [matriculadosAsig, setMatriculadoAsig] = useState<any[]>([])

    const [nota1, setNota1] = useState<string>('0')
    const [valid1, setValid1] = useState<boolean>(true)
    const refNota1 = useRef<HTMLInputElement>(null)

    useEffect(() => {

        EstudiantesMatriculados()
    }, [])

    const EstudiantesMatriculados = async () => {
        setMatriculadoAsig([])

        const response = await ListarPreRegistroNotas<Listas>(props.item.horarioAsigId, abortController.current)
        if (response instanceof Response) {

            // setMatriculadoAsig(response.data.resultado as any[])

            const data = response.data.resultado as any[]

            let nuevoLista: any[] = [];

            for (let j = 0; j < data.length; j++) {

                const item = data[j];

                let objeto: any = {

                    detMatriculaId: item.detMatriculaId,
                    estMaterno: item.estMaterno,
                    estNombres: item.estNombres,
                    estPaterno: item.estPaterno,
                    estudianteId: item.estudianteId,
                    detalle: [] as any[]

                };
                let subObjeto = []

                subObjeto.push(
                    ...Array.from({ length: 6 }, (_, i) => ({
                        "detMatriculaId": item.detMatriculaId,
                        "tipCaliId": i + 1,
                        "nota": item[`nota${i + 1}`] || 0,
                        "condNota": item[`condNota${i + 1}`]
                    }))
                );

                objeto.detalle = subObjeto
                nuevoLista.push(objeto);

            }

            setMatriculadoAsig(nuevoLista)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const generarJsonNotas = () => {
        console.log(matriculadosAsig)
    }

    const handleInputDetalle = (event: React.ChangeEvent<HTMLInputElement>, detMatriculaId: number, tipCaliId: number) => {
        console.log(event.target.value)
        console.log(detMatriculaId)
        console.log(tipCaliId)
        // const { value } = event.target;
        // this.setState((prevState) => ({
        //     detalle: prevState.detalle.map((item) =>
        //         item.idProducto === idProducto ? { ...item, cantidad: value } : item,
        //     ),
        // }));
    }

    const exportExcel = (
        data: any,
    ): void => {
        const ws = XLSX.utils.json_to_sheet(data);

        const columnWidths = [{ wch: 4 }, { wch: 10 }, { wch: 45 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 20 }];
        ws['!cols'] = columnWidths;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        // XLSX.writeFile(wb, `${fileName}.xlsx`);
        XLSX.writeFile(wb, `REGISTRO DE NOTAS DEL AULA ${props.item.aula} SECCION ${props.item.seccion} MODALIDAD ${props.item.modalidad} TIPO ESTUDIO ${props.item.tipoEstudio} TURNO ${props.item.turno} PERIDO ${props.item.anio} - ${props.item.mes} SEDE ${props.item.sede}.xlsx`);
    }

    const transformLista = (data: any): any => {
        return data.map((item: any, key: any) => ({
            Id: ++key,
            Codigo: item.estudianteId,
            Nombre: item.estPaterno + " " + item.estMaterno + " " + item.estNombres,
            N_Lectura: null,
            N_Escritura: null,
            N_Oral: null,
            N_Practica_Online: null,
            N_Medio_Ciclo: null,
            N_Examen_Final_Ciclo: null,
        }))
    }

    const [excelData, setExcelData] = useState<ExcelData | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (
            file &&
            file.name === `REGISTRO DE NOTAS DEL AULA ${props.item.aula} SECCION ${props.item.seccion} MODALIDAD ${props.item.modalidad} TIPO ESTUDIO ${props.item.tipoEstudio} TURNO ${props.item.turno} PERIDO ${props.item.anio} - ${props.item.mes} SEDE ${props.item.sede}.xlsx`
        ) {

            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<ExcelDataItem>(sheet, {
                    header: 1,
                    defval: '',
                    raw: false,
                });

                setExcelData(jsonData);
            };

            reader.readAsArrayBuffer(file);

        }
    };

    const datosNotas: any = []

    if (excelData) {
        const excelDatosNotas = excelData.slice(1)
        excelDatosNotas.map((item: any) => {
            let aux = {
                numero: item[0],
                codigo: item[1],
                nombre: item[2],
                N_Lectura: parseFloat(item[3]),
                N_Escritura: parseFloat(item[4]),
                N_Oral: parseFloat(item[5]),
                N_Practica_Online: parseFloat(item[6]),
                N_Medio_Ciclo: parseFloat(item[7]),
                N_Examen_Final_Ciclo: parseFloat(item[8]),
            }
            datosNotas.push(aux)
        })
    }

    return (
        <>
            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Regristro de Notas Excel</h2>

                <div className="w-full">

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
                        <label
                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                        >
                            Opciones
                        </label>
                        <div className="flex flex-row">
                            <div className="relative flex flex-wrap">
                                <button
                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                    onClick={generarJsonNotas}
                                >
                                    <i className="bi bi-search mr-1"></i> BUSCAR
                                </button>
                            </div>
                            <div className="relative flex flex-wrap">
                                <button
                                    title="Excel"
                                    className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                                    onClick={() => {
                                        if (matriculadosAsig.length == 0) return;
                                        exportExcel(transformLista(matriculadosAsig))
                                    }}
                                >
                                    <i className="bi bi-file-earmark-excel-fill mr-1"></i><i className="bi bi-arrow-down mr-1"></i> Descargar Excel
                                </button>
                            </div>
                            <div className="relative flex flex-wrap">
                                {/*/
                                <button
                                    title="Excel"
                                    className="ml-1 flex items-center rounded border-md border-upla-100 bg-upla-100 text-white p-2 hover:bg-upla-200 focus:ring-2 focus:ring-upla-100 active:ring-upla-100"
                                    onClick={() => {
                                        if (matriculadosAsig.length == 0) return;
                                        exportExcel(transformLista(matriculadosAsig), props.item)
                                    }}
                                >
                                    <i className="bi bi-file-earmark-excel-fill mr-1"></i><i className="bi bi-arrow-up mr-1"></i> Subir Excel
                                </button>
                                /*/}
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                    onChange={handleFileUpload}
                                />
                                <label className="ml-1 flex items-center rounded border-md border-upla-100 bg-upla-100 text-white p-2 hover:bg-upla-200 focus:ring-2 focus:ring-upla-100 active:ring-upla-100 cursor-pointer">
                                    <i className="bi bi-file-earmark-excel-fill mr-1"></i><i className="bi bi-arrow-up mr-1"></i> Subir Excel
                                </label>
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
                                    <th className="py-1 px-6">N. Reading</th>
                                    <th className="py-1 px-6">N. Writing</th>
                                    <th className="py-1 px-6">N. Speaking</th>
                                    <th className="py-1 px-6">N. O-line practice</th>
                                    <th className="py-1 px-6">N. ME</th>
                                    <th className="py-1 px-6">N. FE</th>
                                </tr>
                            </thead>
                            <tbody id='registro-notas'>
                                {
                                    matriculadosAsig.length == 0 ?
                                        // excelData == null ?
                                        (
                                            <tr className="text-center bg-white border-b">
                                                <td colSpan={9} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                            </tr>
                                        ) : (
                                            excelData == null ?
                                                (
                                                    matriculadosAsig.map((obj, index) => {

                                                        const regNota1 = obj.detalle.filter(
                                                            (item: any) => item.tipCaliId === 1
                                                        );

                                                        //const cond = regNota1[0].condNota
                                                        //setNota1(regNota1[0].nota)
                                                        const nota = regNota1[0].nota1

                                                        return (
                                                            <tr key={index} className="text-sm">
                                                                <td className="border p-2">{++index}</td>
                                                                <td className="border p-2">{obj.estudianteId}</td>
                                                                <td className="border p-2">{`${obj.estPaterno} ${obj.estMaterno} ${obj.estNombres}`}</td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            maxLength={5}
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            ref={refNota1}
                                                                            value={nota}
                                                                            onChange={(e) => handleInputDetalle(e, obj.detMatriculaId, 1)}

                                                                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
                                                                        // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                                                                        />
                                                                        <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${'no' == 'no' ? 'text-white' : 'text-green-400'} `}></i>
                                                                    </div>

                                                                </td>
                                                            </tr>

                                                        )

                                                        // <TablaRegistroNotas key={index} index={index} item={obj} />

                                                    })
                                                )
                                                :
                                                (
                                                    datosNotas.map((item: any, key: any) => {
                                                        return (
                                                            <tr key={key} className="text-sm">
                                                                <td className="border p-2">{item.numero}</td>
                                                                <td className="border p-2">{item.codigo}</td>
                                                                <td className="border p-2">{item.nombre}</td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Lectura}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Escritura}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Oral}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Practica_Online}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Medio_Ciclo}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="border p-2">
                                                                    <div className="relative">
                                                                        <input
                                                                            type="text"
                                                                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                                                            maxLength={5}
                                                                            value={item.N_Examen_Final_Ciclo}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                        )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )

}

export default RegistrarNotasGeneralExcel