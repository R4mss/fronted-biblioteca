import { useEffect, useRef, useState } from "react";
import { ListarAsignatura, ListarIdioma, ListarModalidad, ListarPeriodo, ListarSede, ListarTipoEstudio, ReporteHorarioAsignatura } from '../../../network/rest/idiomas.network';
import Listas from '../../../model/interfaces/Listas.model.interface';
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";
import Response from "../../../model/class/response.model.class";

import { Bandera } from '../../../component/Iconos';
import Idioma from "@/model/interfaces/idioma/idioma";
import Sede from "@/model/interfaces/sede/sede";
import Modalidad from "@/model/interfaces/modalidad/modalidad";
import Periodo from "@/model/interfaces/periodo/periodo";
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio";

import { getCurrentTime24hFormat, getCurrentDateFormatted, denominacionHorario, convertirNumeroAMes } from "@/helper/herramienta.helper";

import { jsPDF } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'
import * as XLSX from 'xlsx';
import { images } from "@/helper/index.helper";

import ModalListasMatricualdos from './modal/ListaEstudiantesMatriculados'
import Asignatura from "@/model/interfaces/asignatura/asignatura";


const RepHorarioAsignatura = () => {

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    const [comboBoxAsignatura, setComboBoxAsignatura] = useState<Asignatura[]>([])


    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const [idAsignatura, setIdAsignatura] = useState<string>("0")

    const [reporteDisponibles, setReporteDisponible] = useState<any[]>([]);

    const [capacidadTotal, setCapacidadTotal] = useState<number>(0)
    const [totalMatriculados, setTotalMatriculados] = useState<number>(0)

    const [vacantesDisponibles, setVacantesDisponibles] = useState<number>(0)
    const [aulasLibres, setAulasLibres] = useState<number>(0)

    const [isOpenModal, setIsOpenModal] = useState(false);


    const [item, setItem] = useState({})
    const [idHorarioAsignatura, setIdHorarioAsignatura] = useState<number>(0)


    const abortController = useRef(new AbortController());

    const [valueIdioma, SetValueIdioma] = useState<string>("-")
    const [valueSede, SetValueSede] = useState<string>("-")
    const [valuePeriodo, SetValuePeriodo] = useState<string>("-")
    const [valueModalidad, SetValueModalidad] = useState<string>("-")
    const [valueTipoEstudio, SetValueTipoEstudio] = useState<string>("-")

    const [sigla, setSigla] = useState("")

    const refIdioma = useRef<HTMLSelectElement>(null)

    useEffect(() => {

        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()
        LoadDataTipoEstudio()
    }, [])


    const LoadRepHorarioAsignatura = async () => {

        if(idIdioma == 0){
            refIdioma.current?.focus()
            return
        }

        setReporteDisponible([])

        const response = await ReporteHorarioAsignatura<Listas>(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio,idAsignatura,  abortController.current);
        if (response instanceof Response) {

            const data = response.data.resultado as any[]

            const totCapacidades = data.reduce((total, item) => total + item.capacidad, 0);
            setCapacidadTotal(totCapacidades);

            const totMatriculados = data.reduce((total, item) => total + item.cantidad, 0);
            setTotalMatriculados(totMatriculados)

            const totalCantidadCero = data.reduce((total, item) => {
                return item.cantidad === 0 ? total + 1 : total;
            }, 0);
            setAulasLibres(totalCantidadCero)

            if (totMatriculados > totCapacidades) {
                setVacantesDisponibles(0)
            } else {
                setVacantesDisponibles(totCapacidades - totMatriculados)
            }


            setReporteDisponible(response.data.resultado);

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage());
        }
    }

    //carga de datos
    const LoadDataIdioma = async () => {

        setComboBoxIdioma([])

        const response = await ListarIdioma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxIdioma(response.data.resultado as Idioma[])
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

    const LoadDataPeriodo = async () => {

        setComboBoxPeriodo([])

        const response = await ListarPeriodo<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxPeriodo(response.data.resultado as Periodo[])
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

    const LoadDataAsignatura = async (idIdioma: number) => {


        setComboBoxAsignatura([])

        const response = await ListarAsignatura<Listas>(abortController.current)
        if (response instanceof Response) {

            const data = response.data.resultado as Asignatura[]
            const filteredData = data.filter(asignatura => asignatura.idiomaId == idIdioma);

            setComboBoxAsignatura(filteredData)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const handleOpenModal = (item: any, idHorarioAsig: number, formaSigla: string) => {

        setIsOpenModal(true);

        setItem(item)
        setIdHorarioAsignatura(idHorarioAsig)
        setSigla(formaSigla)
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const pdfHorariosAsignatura = async (idElementTable: string, fileName: string, data: any, idioma: string, sede: string, periodo: string, modalidad: string, tipoEstudio: string) => {


        const tabla = document.getElementById(idElementTable);
        const tbCopia = tabla?.cloneNode(true) as HTMLElement;;

        const doc = new jsPDF({
            orientation: 'landscape', // Orientación vertical (por defecto)
            unit: 'mm', // Unidad de medida en milímetros
            format: 'a4' // Tamaño A4
        })

        // const prevFont = doc.getFontList()[0];

        const pageWidth = doc.internal.pageSize.width
        //const pageHeight = doc.internal.pageSize.height

        // Cuerpo
        doc.setFontSize(9)
        // doc.setFont("", "normal")
        doc.text(`Idioma: ${idioma}`, 13, 23)
        doc.text(`Sede: ${sede}`, 68, 23)
        doc.text(`Periodo: ${periodo}`, 123, 23)
        doc.text(`Modalidad: ${modalidad}`, 178, 23)
        doc.text(`Tipo estudio: ${tipoEstudio}`, 233, 23)
        doc.text(`Capacidad Total: ${data.capacidadTotal}`, 13, 27)
        doc.text(`Vacantes Disponibles: ${data.vacantesDisponibles} `, pageWidth / 2, 27)

        doc.text(`Cantidad de Matriculados: ${data.cantidadMatriculados}`, 13, 31)
        doc.text(`Aulas Libres: ${data.aulasLibres}`, pageWidth / 2, 31)

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
            doc.text("REPORTE DE MATRICULADOS POR HORARIOS", 100, 13)
            // doc.setFontSize(12)
            // doc.setTextColor(128, 128, 128)
            // doc.text(`Filtrado por`, pageWidth / 3, 17)

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
        shouldRemoveColumns: boolean = false,
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

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <ModalListasMatricualdos
                            show={isOpenModal}
                            item={item}
                            idHorarioAsignatura={idHorarioAsignatura}
                            sigla={sigla}
                            hide={handleCloseModal}

                        />

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Reporte de Matriculados por horarios con filtros</h2>
                            <div className="w-full">

                                <div className="flex flex-col shadow-md border-solid border-2 border-gray-300 ">
                                    <div className="bg-teal-500 h-1 flex flex-col justify-center items-center"></div>

                                    <div className="w-full  p-4">
                                        <div className="bg-teal-400 rounded-md p-4 flex items-center">
                                            <div className="bg-teal-500 rounded-full p-3 mr-4">
                                                <Bandera className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold mb-2 text-white">Información</h2>
                                                <h3 className="text-gray-200">Te mostramos el consolidado de aulas con su detalle de matriculados</h3>
                                                {/* <h3 className="text-gray-200">El reporte pertence al perido académico 2024-1 y es la que fue eligida hasta la fecha 28/12/2023.</h3> */}

                                            </div>
                                        </div>
                                    </div>


                                </div>


                                <div className="p-6">
                                    {/* <h2 className="text-xl mb-5">Reporte de matriculados</h2> */}
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-4">
                                        <div>
                                            <label
                                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                            >
                                                Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                ref={refIdioma}
                                                value={idIdioma}
                                                onChange={(event) => {
                                                    const selectedIdiomaId = event.currentTarget.value;
                                                    setIdIdioma(parseInt(selectedIdiomaId));

                                                    const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                                    if (selectedIdioma) {
                                                        SetValueIdioma(selectedIdioma.idiomaNombre);
                                                        LoadDataAsignatura(parseInt(selectedIdiomaId))
                                                    } else {
                                                        SetValueIdioma("-");
                                                        setIdAsignatura("0")
                                                    }

                                                    
                                                }}
                                            >
                                                <option value={0}>- Seleccione -</option>
                                                {
                                                    comboBoxIdioma.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.idiomaId}>
                                                                {item.idiomaNombre}
                                                            </option>
                                                        );
                                                    })
                                                }

                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                            >
                                                Sede
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                //ref={refSede}
                                                value={idSede}
                                                onChange={(event) => {
                                                    const selectedSedeId = event.currentTarget.value;
                                                    setIdSede(selectedSedeId);

                                                    const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                                    if (selectedSede) {
                                                        SetValueSede(selectedSede.sede);
                                                    } else {
                                                        SetValueSede("-");
                                                    }
                                                }}
                                            >
                                                <option value="0">- Seleccione -</option>
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
                                            <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                Periodo
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                //ref={refPeriodo}
                                                value={idPeriodo}
                                                onChange={(event) => {
                                                    const selectedPeriodoId = event.currentTarget.value;
                                                    setIdPeriodo(parseInt(selectedPeriodoId));

                                                    const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                                    if (selectedPeriodo) {
                                                        SetValuePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                                    } else {
                                                        SetValuePeriodo("-");
                                                    }
                                                }}
                                            >
                                                <option value={0}>- Seleccione -</option>
                                                {
                                                    comboBoxPeriodo.map((item, index) => {


                                                        return (
                                                            <option key={index} value={item.periodoId}>
                                                                {item.anio} - {item.mes}
                                                            </option>
                                                        );

                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label
                                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                            >
                                                Modalidad
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                //ref={refModalidad}
                                                value={idModalidad}
                                                onChange={(event) => {
                                                    const selectedModalidadId = event.currentTarget.value;
                                                    setIdModalidad(parseInt(selectedModalidadId));

                                                    const selectedModalidad = comboBoxModalidad.find(item => item.modalidadId === parseInt(selectedModalidadId));

                                                    if (selectedModalidad) {
                                                        SetValueModalidad(selectedModalidad.modalidad);
                                                    } else {
                                                        SetValueModalidad("-");
                                                    }
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
                                        </div>

                                        <div>
                                            <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                Tipo Estudio
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                //ref={refTipoEstudio}
                                                value={idTipoEstudio}
                                                onChange={(event) => {
                                                    const selectedTipoEstudioId = event.currentTarget.value;
                                                    setIdTipoEstudio(parseInt(selectedTipoEstudioId));

                                                    const selectedTipoEstudio = comboBoxTipoEstudio.find(item => item.tipEstudioId.toString() === selectedTipoEstudioId);

                                                    if (selectedTipoEstudio) {
                                                        SetValueTipoEstudio(`${selectedTipoEstudio.tipoEstudio}`);
                                                    } else {
                                                        SetValueTipoEstudio("-");
                                                    }
                                                }}
                                            >
                                                <option value={0}>- Seleccione -</option>
                                                {
                                                    comboBoxTipoEstudio.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.tipEstudioId}>
                                                                {item.tipoEstudio}
                                                            </option>
                                                        )
                                                    })
                                                }
                                                <option value={12}>I & SI</option>
                                                <option value={34}>IQ & SIQ</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                Asignatura
                                            </label>
                                            <select
                                                className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                value={idAsignatura}
                                                onChange={(event) => {
                                                    setIdAsignatura(event.currentTarget.value)
                                                }}
                                            >
                                                <option value={"0"}>- Seleccione -</option>
                                                {
                                                    comboBoxAsignatura.map((item, index) => {

                                                        return (
                                                            <option key={index} value={item.asiId}>
                                                                {item.asignatura} - {item.asiNivel}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>



                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label
                                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                            >
                                                Opciones
                                            </label>
                                            <div className="flex">
                                                <div className="relative flex flex-wrap">
                                                    <button
                                                        title="Buscar"
                                                        className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                        onClick={LoadRepHorarioAsignatura}
                                                    >
                                                        <i className="bi bi-search mr-1"></i> BUSCAR
                                                    </button>
                                                </div>
                                                <div className="relative flex flex-wrap">
                                                    <button
                                                        title="Excel"
                                                        className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                                                        onClick={() => {
                                                            if (reporteDisponibles.length == 0) return;
                                                            exportExcelToTableHtml('tabla-reporte-matriculados-horario', `Reporte-Cantidad-Matriculados-Horario-X-Asignatura ${getCurrentDateFormatted()}`, [13], true)
                                                        }}
                                                    >
                                                        <i className="bi bi-file-earmark-excel-fill mr-1"></i> Excel
                                                    </button>
                                                </div>
                                                <div className="relative flex flex-wrap">
                                                    <button
                                                        title="Pdf"
                                                        className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                                        onClick={() => {
                                                            if (reporteDisponibles.length == 0) return;
                                                            const data = {
                                                                capacidadTotal: capacidadTotal,
                                                                cantidadMatriculados: totalMatriculados,
                                                                vacantesDisponibles: vacantesDisponibles,
                                                                aulasLibres: aulasLibres

                                                            }
                                                            pdfHorariosAsignatura('tabla-reporte-matriculados-horario', `Reporte-Cantidad-Matriculados-Horario-X-Asignatura ${getCurrentDateFormatted()}`, data, valueIdioma, valueSede, valuePeriodo, valueModalidad, valueTipoEstudio)
                                                        }}
                                                    >
                                                        <i className="bi bi-file-earmark-pdf-fill mr-1"></i> Pdf
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
                                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                            <div className="m-2">

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                                    <div className="text-sm">
                                                        <p>Capacidad Total: <span className="text-blue-700 font-bold">{capacidadTotal}</span></p>
                                                        <p>Vacantes Disponibles: <span className="text-blue-700 font-bold ">{vacantesDisponibles}</span></p>
                                                        {/* <p>Tipo de Estudio: <span className="text-blue-700 font-bold "></span></p> */}
                                                    </div>
                                                    <div className="text-sm">
                                                        <p>Cantidad de Matriculados: <span className="text-blue-700 font-bold">{totalMatriculados}</span></p>
                                                        <p>Aulas Libres: <span className="text-blue-700 font-bold">{aulasLibres}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative overflow-auto rounded-md my-6">
                                        <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="tabla-reporte-matriculados-horario">
                                            <thead className="align-bottom">
                                                <tr>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Siglas</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidad</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">T. Estudio</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Seccion</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Turno</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Asignatura</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Cant/Cap</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Dias</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Inicio</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Fin</th>
                                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Opcion</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {

                                                    // loading ? (
                                                    //     <tr className="text-center bg-white border-b">
                                                    //         <td colSpan={7} className="text-sm p-2 border-b border-solid">
                                                    //             <div className="flex items-center justify-center">
                                                    //                 <LoaderSvg /> <span>Cargando datos...</span>
                                                    //             </div>
                                                    //         </td>
                                                    //     </tr>
                                                    // ) : (
                                                    reporteDisponibles.length == 0 ?
                                                        (
                                                            <tr className="text-center bg-white border-b">
                                                                {/* <td colSpan={7} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td> */}
                                                                <td colSpan={15} className="text-sm p-2  border-b border-solid">No hay datos disponibles</td>
                                                            </tr>
                                                        )

                                                        :
                                                        (
                                                            reporteDisponibles.map((item, index) => {

                                                                let cantDias = item.cantDias
                                                                let tipoEst = item.tipEstudioId
                                                                let denominacionH: string | undefined

                                                                if (tipoEst == 1 || tipoEst == 4) {
                                                                    if (cantDias == 5) {
                                                                        denominacionH = denominacionHorario.intensivoLV.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion
                                                                    }
                                                                    if (cantDias == 2) {
                                                                        denominacionH = denominacionHorario.intensivoSD.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion

                                                                    }
                                                                }
                                                                if (tipoEst == 2 || tipoEst == 3) {
                                                                    denominacionH = denominacionHorario.superintensivoLV.find((obj: any) => item.horaInicio.slice(0, -3) == obj.horaInicio)?.denominacion

                                                                }

                                                                const codAsig = item.asiId.substring(0, 3)
                                                                const codNivel = parseInt(item.asiNivel)
                                                                const codModalidad = item.modalidad.charAt(0);
                                                                const codTipoEst = tipoEst == 1 ? 'I'
                                                                    : tipoEst == 2 ? 'SI'
                                                                        : tipoEst == 4 ? 'IQ'
                                                                            : tipoEst == 3 ? 'SIQ' : '0'

                                                                const codDias = cantDias == 5 ? 'LV'
                                                                    : cantDias == 2 ? 'SD' : '0'

                                                                const codPer = convertirNumeroAMes(item.mes)?.substring(0, 3);
                                                                const codAnio = item.anio.toString().slice(-2);

                                                                const formaSigla = `${codAsig}${codNivel}-${codModalidad}${codTipoEst}-${codDias}-${item.aula}-${denominacionH}-${codAnio}${codPer}`

                                                                return (
                                                                    <tr key={index} className="bg-white border-b">
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{++index}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{formaSigla}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.sede}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio} - {item.mes}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tipoEstudio}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.aula}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.seccion}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.turno}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.asignatura}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.cantidad}/{item.capacidad}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.dias}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaInicio.slice(0, -3)}</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaFin.slice(0, -3)}</td>

                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                            <button
                                                                                title="Detalle"
                                                                                className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                onClick={() => handleOpenModal(item, item.horarioAsigId, formaSigla)}
                                                                            >
                                                                                <i className="bi bi-list text-sm"></i>

                                                                            </button>
                                                                        </td>



                                                                    </tr>
                                                                );
                                                            })
                                                        )
                                                    // )

                                                }
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </>
    );
};

export default RepHorarioAsignatura;
