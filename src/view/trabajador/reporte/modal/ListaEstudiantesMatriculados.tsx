
import { useRef, useState } from "react";

import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";

import CustomModal from "@/component/Modal.component"
import { ReporteMatriculadosXHorarioAsigId } from "@/network/rest/idiomas.network";
import Listas from "@/model/interfaces/Listas.model.interface";

import { jsPDF } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'
import * as XLSX from 'xlsx';
//import XlsxTemplate from 'xlsx-template';
import { getCurrentDateFormatted, getCurrentTime24hFormat } from "@/helper/herramienta.helper";
import { images } from "@/helper/index.helper";


type Props = {
    show: boolean;
    hide: () => void;
    item: any
    idHorarioAsignatura: number
    sigla: string
};

const ListaEstudiantesMatriculados = (props: Props) => {

    const [listaMatriculados, setListaMatriculados] = useState<any[]>([])

    const abortController = useRef(new AbortController());


    const LoadDataMatriculados = async () => {
        setListaMatriculados([])

        const response = await ReporteMatriculadosXHorarioAsigId<Listas>(props.item.horarioAsigId, abortController.current)
        if (response instanceof Response) {

            setListaMatriculados(response.data.resultado as any[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const pdfListaMatriculadosHorarioAsignaturaId = async (idElementTable: string, fileName: string, data: any) => {

        const tabla = document.getElementById(idElementTable);
        const tbCopia = tabla?.cloneNode(true) as HTMLElement;;

        const doc = new jsPDF({
            orientation: 'landscape', // Orientación vertical (por defecto)
            unit: 'mm', // Unidad de medida en milímetros
            format: 'a4' // Tamaño A4
        })

        const pageWidth = doc.internal.pageSize.width
        //const pageHeight = doc.internal.pageSize.height

        // Cuerpo
        doc.setFontSize(9)
        // doc.setFont("", "normal")

        doc.text(`Periodo: ${data.periodo}`, 13, 23)
        doc.text(`Modalidad: ${data.modalidad}`, 68, 23)
        doc.text(`Tipo estudio: ${data.tipoEstudio}`, 123, 23)
        doc.text(`Turno: ${data.turno}`, 178, 23)
        // doc.text(`Capacidad: ${data.capacidad}`, 233, 23)

        doc.text(`Aula: ${data.aula}`, 13, 27)
        doc.text(`Sección: ${data.seccion} `, 68, 27)
        doc.text(`Asignatura: ${data.asignatura} `, 123, 27)
        doc.text(`Capacidad: ${data.capacidad} / ${data.cantidad} `, 178, 27)

        doc.text(`Instructor: ${data.instructor} `, 13, 31)

        // Excluye la última columna
        const rows = tbCopia.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            if (cells.length > 0) {
                row.removeChild(cells[cells.length - 1]);
            }
        });

        const opciones: UserOptions = {
            margin: {
                top: 33,
                bottom: 20
            },
            headStyles: {
                fontSize: 8,
                textColor: [255, 255, 255]
            },
            bodyStyles: {
                fontSize: 7,
                textColor: [0, 0, 0]
            },
            columnStyles: {
                0: {
                    halign: 'center',
                    fillColor: [220, 220, 220]
                },
                // 5: {
                //     textColor: [0, 57, 129]
                // }
            },
            html: tbCopia as HTMLTableElement
        };

        // Genera el PDF a partir de la tabla
        autoTable(doc, opciones);

        // Pie y Encabezado de pagina
        const pageCount = doc.getNumberOfPages() // Obtener el número total de páginas
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)

            doc.addImage(images.logo_png, "PNG", 13, 5, 13, 12)

            doc.setFontSize(15)
            doc.setTextColor(0, 0, 0)
            //doc.setFont(prevFont, "bold")
            doc.text("REPORTE DE LA LISTA DE MATRICULADOS POR HORARIOS", pageWidth / 4, 13)
            // doc.setFontSize(12)
            // doc.setTextColor(128, 128, 128)

            doc.setFontSize(10)
            //doc.setFont(prevFont, "normal")
            doc.setTextColor(128, 128, 128)
            doc.text(getCurrentDateFormatted(), pageWidth - 30, 8)
            doc.text(getCurrentTime24hFormat(), pageWidth - 30, 14)

            doc.setDrawColor(0, 124, 188)
            doc.line(13, 19, pageWidth - 13, 19)

            doc.setFontSize(10)
            doc.setTextColor(128, 128, 128)
            //doc.setFont(prevFont, "normal")
            doc.text(`Pag ${i} de ${pageCount}`, pageWidth - 30, 200)
        }

        doc.save(fileName + ".pdf")
    }

    const exportExcelToTableHtml = (
        idElementTable: string,
        fileName: string,
        columnsToRemove: number[] = [],
        shouldRemoveColumns: boolean = false
    ): void => {
        const table = document.getElementById(idElementTable);

        if (table) {
            const tbCopia = table.cloneNode(true) as HTMLTableElement;

            if (shouldRemoveColumns) {
                const rows = tbCopia.rows;

                for (let i = 0; i < rows.length; i++) {
                    for (let j = 0; j < columnsToRemove.length; j++) {
                        rows[i].deleteCell(columnsToRemove[j] - j); // Ajusta el índice
                    }
                }
            }

            const ws = XLSX.utils.table_to_sheet(tbCopia);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            XLSX.writeFile(wb, `${fileName}.xlsx`);
        }
    };

    // Registro Auxiliares
    const pdfRegistroAuxiliarNotas = async (fileName: string, data: any) => {


        const nuevaLista = listaMatriculados.map((item, index) => {
            return [
                ++index,
                `${item.estudianteId}`,
                `${item.estPaterno} ${item.estMaterno} ${item.estNombres}`,
                0,
                0,
                0,
                0,
                0,
                0,
            ];
        });


        const doc = new jsPDF({
            orientation: 'landscape', // Orientación vertical (por defecto)
            unit: 'mm', // Unidad de medida en milímetros
            format: 'a4' // Tamaño A4
        })

        const pageWidth = doc.internal.pageSize.width
        //const pageHeight = doc.internal.pageSize.height

        // Cuerpo
        doc.setFontSize(9)
        // doc.setFont("", "normal")

        doc.text(`Periodo: ${data.periodo}`, 13, 23)
        doc.text(`Modalidad: ${data.modalidad}`, 68, 23)
        doc.text(`Tipo estudio: ${data.tipoEstudio}`, 123, 23)
        doc.text(`Turno: ${data.turno}`, 178, 23)
        // doc.text(`Capacidad: ${data.capacidad}`, 233, 23)

        doc.text(`Aula: ${data.aula}`, 13, 27)
        doc.text(`Sección: ${data.seccion} `, 68, 27)
        doc.text(`Asignatura: ${data.asignatura} `, 123, 27)
        doc.text(`Capacidad: ${data.capacidad} / ${data.cantidad} `, 178, 27)

        doc.text(`Instructor: ${data.instructor} `, 13, 31)

        const datosEncabezado = [
            ['#', 'Codigo', 'Estudiante', 'N. LECTURA', 'N. ESCRITURA', 'N. HABLADO', 'N. PRÁCTICA EN LINEA', 'N. EXAMEN INTERMEDIO', 'N. EXAMEN FINAL'],
        ];

        const opciones: UserOptions = {
            margin: {
                top: 33,
                bottom: 20
            },
            headStyles: {
                fontSize: 8,
                textColor: [255, 255, 255]
            },
            bodyStyles: {
                fontSize: 7,
                textColor: [0, 0, 0],
                halign: 'center'
            },
            columnStyles: {
                0: {
                    halign: 'center',
                    fillColor: [220, 220, 220]
                },
                // 5: {
                //     textColor: [0, 57, 129]
                // }
            },
            head: datosEncabezado,
            body: nuevaLista
        };

        // Genera el PDF a partir de la tabla
        autoTable(doc, opciones);

        // Pie y Encabezado de pagina
        const pageCount = doc.getNumberOfPages() // Obtener el número total de páginas
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)

            doc.addImage(images.logo_png, "PNG", 13, 5, 13, 12)

            doc.setFontSize(15)
            doc.setTextColor(0, 0, 0)
            //doc.setFont(prevFont, "bold")
            doc.text(`REGISTRO AUXILIR DE NOTAS ${props.sigla}`, pageWidth / 6, 13)
            // doc.setFontSize(12)
            // doc.setTextColor(128, 128, 128)

            doc.setFontSize(10)
            //doc.setFont(prevFont, "normal")
            doc.setTextColor(128, 128, 128)
            doc.text(getCurrentDateFormatted(), pageWidth - 30, 8)
            doc.text(getCurrentTime24hFormat(), pageWidth - 30, 14)

            doc.setDrawColor(0, 124, 188)
            doc.line(13, 19, pageWidth - 13, 19)

            doc.setFontSize(10)
            doc.setTextColor(128, 128, 128)
            //doc.setFont(prevFont, "normal")
            doc.text(`Pag ${i} de ${pageCount}`, pageWidth - 30, 200)
        }

        doc.save(fileName + ".pdf")
    }

    const pdfRegistroAuxiliarAsistencia = async (fileName: string, data: any) => {


        const nuevaLista = listaMatriculados.map((item, index) => {
            return [
                ++index,
                `${item.estudianteId}`,
                `${item.estPaterno} ${item.estMaterno} ${item.estNombres}`,
            ];
        });


        const doc = new jsPDF({
            orientation: 'landscape', // Orientación vertical (por defecto)
            unit: 'mm', // Unidad de medida en milímetros
            format: 'a4' // Tamaño A4
        })

        const pageWidth = doc.internal.pageSize.width
        //const pageHeight = doc.internal.pageSize.height

        // Cuerpo
        doc.setFontSize(9)
        // doc.setFont("", "normal")

        doc.text(`Periodo: ${data.periodo}`, 13, 23)
        doc.text(`Modalidad: ${data.modalidad}`, 68, 23)
        doc.text(`Tipo estudio: ${data.tipoEstudio}`, 123, 23)
        doc.text(`Turno: ${data.turno}`, 178, 23)
        // doc.text(`Capacidad: ${data.capacidad}`, 233, 23)

        doc.text(`Aula: ${data.aula}`, 13, 27)
        doc.text(`Sección: ${data.seccion} `, 68, 27)
        doc.text(`Asignatura: ${data.asignatura} `, 123, 27)
        doc.text(`Capacidad: ${data.capacidad} / ${data.cantidad} `, 178, 27)

        doc.text(`Instructor: ${data.instructor} `, 13, 31)

        const datosEncabezado =
            [
                [
                    {
                        content: "",
                        colSpan: 1,
                    },
                    {
                        content: "",
                        colSpan: 1,
                    },
                    {
                        content: "",
                        colSpan: 1,
                    },
                    {
                        content: "Asistencia",
                        colSpan: 20,
                    },
                    {
                        content: "Lectura",
                        colSpan: 4,
                    },
                    {
                        content: "Escritura",
                        colSpan: 4,
                    },
                    {
                        content: "Practica En-Linea",
                        colSpan: 4,
                    },
                    {
                        content: "Hablado",
                        colSpan: 4,
                    },
                    {
                        content: "",
                        colSpan: 1,
                    },
                    {
                        content: "",
                        colSpan: 1,
                    },
                    {
                        content: "",
                        colSpan: 1,
                    },
                ],
                [
                    { content: "#", },
                    { content: "Codigo", },
                    { content: "Estudiante", },
                    { content: "1", },
                    { content: "2", },
                    { content: "3", },
                    { content: "4", },
                    { content: "5", },
                    { content: "6", },
                    { content: "7", },
                    { content: "8", },
                    { content: "9", },
                    { content: "10", },
                    { content: "11", },
                    { content: "12", },
                    { content: "13", },
                    { content: "14", },
                    { content: "15", },
                    { content: "16", },
                    { content: "17", },
                    { content: "18", },
                    { content: "19", },
                    { content: "20", },
                    { content: "R1", },
                    { content: "R2", },
                    { content: "R3", },
                    { content: "AVG1", },
                    { content: "W1", },
                    { content: "W2", },
                    { content: "W3", },
                    { content: "AVG2", },
                    { content: "P1", },
                    { content: "P2", },
                    { content: "P3", },
                    { content: "AVG3", },
                    { content: "S1", },
                    { content: "S2", },
                    { content: "S3", },
                    { content: "AVG4", },
                    { content: "ME", },
                    { content: "FE", },
                    { content: "FINAL", },

                ],
            ]
        // [
        //     '',
        //     '',
        //     '',
        //     { content: 'Asistencia', colSpan: 20, styles: { halign: 'center' } }
        // ],
        // [
        //     '#', 'Codigo', 'Estudiante', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
        // ]

        // ['', '', '', '', '', '', '', '', '', '', '', '', 'Asistencia', '', '', '', '', '', '', '', '', '', ''],
        // ['#', 'Codigo', 'Estudiante', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],



        const opciones: UserOptions = {
            theme: 'grid',
            margin: {
                top: 33,
                bottom: 20
            },
            headStyles: {
                fontSize: 4,
                textColor: [255, 255, 255]
            },
            bodyStyles: {
                fontSize: 4,
                textColor: [0, 0, 0],
                halign: 'center'
            },
            columnStyles: {
                0: {
                    halign: 'center',
                    fillColor: [220, 220, 220]
                },
                2: {
                    halign: 'left',
                },
                // 5: {
                //     textColor: [0, 57, 129]
                // }
            },
            head: datosEncabezado,
            body: nuevaLista
        };

        // Genera el PDF a partir de la tabla
        autoTable(doc, opciones);

        // Pie y Encabezado de pagina
        const pageCount = doc.getNumberOfPages() // Obtener el número total de páginas
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)

            doc.addImage(images.logo_png, "PNG", 13, 5, 13, 12)

            doc.setFontSize(15)
            doc.setTextColor(0, 0, 0)
            //doc.setFont(prevFont, "bold")
            doc.text(`REGISTRO AUXILIAR ${props.sigla}`, pageWidth / 3, 13)
            // doc.setFontSize(12)
            // doc.setTextColor(128, 128, 128)

            doc.setFontSize(10)
            //doc.setFont(prevFont, "normal")
            doc.setTextColor(128, 128, 128)
            doc.text(getCurrentDateFormatted(), pageWidth - 30, 8)
            doc.text(getCurrentTime24hFormat(), pageWidth - 30, 14)

            doc.setDrawColor(0, 124, 188)
            doc.line(13, 19, pageWidth - 13, 19)

            doc.setFontSize(10)
            doc.setTextColor(128, 128, 128)
            //doc.setFont(prevFont, "normal")
            doc.text(`Pag ${i} de ${pageCount}`, pageWidth - 30, 200)
        }

        doc.save(fileName + ".pdf")
    }

    // Template
    const excelTemplate = () => {
        console.log()
    }

    return (

        <CustomModal
            isOpen={
                props.show
            }
            onOpen={() => {
                LoadDataMatriculados()
            }}
            onHidden={() => {

            }}
            onClose={
                props.hide
            }
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">

                    <div className="flex justify-between w-11/12">
                        <h6 className="py-1 font-bold text-lg"> Lista de Matriculados: {props.sigla}</h6>
                    </div>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}
                    >
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2 mt-3">
                    <div>
                        <div className="flex">

                            { <div className="relative flex flex-wrap">
                                <button
                                    title="Excel"
                                    className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"

                                    onClick={() => {
                                        if (listaMatriculados.length == 0) return;
                                        excelTemplate()
                                        // exportExcelToTableHtml('tabla-reporte', `Reporte-Matriculados-${props.item.modalidad}-${props.item.tipoEstudio}-${props.item.turno}-${props.item.aula}-${props.item.seccion}-${props.item.asignatura}-${props.item.anio}${props.item.mes}  ${getCurrentDateFormatted()}`, [], true)
                                    }}
                                >
                                    <i className="bi bi-file-earmark-excel-fill mr-1"></i> Excel
                                </button>
                            </div> }

                            {/* <div className="relative flex flex-wrap">
                                <button
                                    title="Pdf"
                                    className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                    onClick={() => {
                                        if (listaMatriculados.length == 0) return;
                                        const data = {
                                            periodo: props.item.anio - props.item.mes,
                                            modalidad: props.item.modalidad,
                                            tipoEstudio: props.item.tipoEstudio,
                                            turno: props.item.turno,
                                            capacidad: props.item.capacidad,

                                            aula: props.item.aula,
                                            seccion: props.item.seccion,
                                            asignatura: props.item.asignatura,
                                            instructor: props.item.docenteDni ? '' : props.item.docenteDni / props.item.docente ? '' : props.item.docente,
                                            cantidad: props.item.cantidad,

                                        }
                                        pdfListaMatriculadosHorarioAsignaturaId('tabla-reporte', `Reporte-Lista-Matriculados-Horario-X-Asignatura ${getCurrentDateFormatted()}`, data)
                                    }}
                                >
                                    <i className="bi bi-file-earmark-pdf-fill mr-1"></i> Pdf
                                </button>
                            </div> */}

                            {/* <div className="relative flex flex-wrap">
                                <button
                                    title="Registro Auxiliar de Notas"
                                    className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                    onClick={() => {
                                        if (listaMatriculados.length == 0) return;
                                        const data = {
                                            periodo: `${props.item.anio} - ${props.item.mes}`,
                                            modalidad: props.item.modalidad,
                                            tipoEstudio: props.item.tipoEstudio,
                                            turno: props.item.turno,
                                            capacidad: props.item.capacidad,

                                            aula: props.item.aula,
                                            seccion: props.item.seccion,
                                            asignatura: props.item.asignatura,
                                            instructor: props.item.docenteDni ? '' : props.item.docenteDni / props.item.docente ? '' : props.item.docente,
                                            cantidad: props.item.cantidad,
                                            sigla: props.sigla
                                        }
                                        pdfRegistroAuxiliarNotas(`Registro-Auxiliar-Notas ${props.sigla} ${getCurrentDateFormatted()}`, data)
                                    }}
                                >
                                    <i className="bi bi-file-earmark-pdf-fill mr-1"></i> Notas
                                </button>
                            </div> */}

                            <div className="relative flex flex-wrap">
                                <button
                                    title="Registro Auxiliar"
                                    className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                    onClick={() => {
                                        if (listaMatriculados.length == 0) return;
                                        const data = {
                                            periodo: `${props.item.anio} - ${props.item.mes}`,
                                            modalidad: props.item.modalidad,
                                            tipoEstudio: props.item.tipoEstudio,
                                            turno: props.item.turno,
                                            capacidad: props.item.capacidad,

                                            aula: props.item.aula,
                                            seccion: props.item.seccion,
                                            asignatura: props.item.asignatura,
                                            instructor: props.item.docenteDni ? '' : props.item.docenteDni / props.item.docente ? '' : props.item.docente,
                                            cantidad: props.item.cantidad,
                                            sigla: props.sigla

                                        }
                                        pdfRegistroAuxiliarAsistencia(`Registro-Auxiliar- ${props.sigla} ${getCurrentDateFormatted()}`, data)
                                    }}
                                >
                                    <i className="bi bi-file-earmark-pdf-fill mr-1"></i> Registro Auxiliar
                                </button>
                            </div>


                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2 mt-3">
                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                        <div className="m-2">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <div className="text-sm">
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

                <div className="relative overflow-auto rounded-md my-3 overflow-y-auto h-80">
                    <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                        <thead className="bg-upla-100 text-white">
                            <tr>
                                <th className="py-1 px-6">#</th>
                                <th className="py-1 px-6">Codigo</th>
                                <th className="py-1 px-6">Estudiante</th>
                                {/* <th className="py-1 px-6">Fac / Carr</th>  */}
                                <th className="py-1 px-6">Sede</th>
                            </tr>
                        </thead>
                        <tbody>
                            {



                                listaMatriculados.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={6} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                        </tr>
                                    ) : (
                                        listaMatriculados.map((obj, index) => (

                                            <tr key={index} className="text-sm">
                                                <td className="border p-2">{++index}</td>
                                                <td className="text-center border p-2">{obj.estudianteId}</td>
                                                <td className="border p-2">{`${obj.estPaterno} ${obj.estMaterno} ${obj.estNombres}`}</td>
                                                {/* <td className="border p-2">{obj.facultad} / {obj.carrera} </td> */}
                                                <td className="border p-2">{obj.sede}</td>
                                            </tr>

                                        ))
                                    )

                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </CustomModal>

    )
}

export default ListaEstudiantesMatriculados