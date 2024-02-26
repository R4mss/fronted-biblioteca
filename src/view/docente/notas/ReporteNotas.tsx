import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface ExcelDataItem {
    [key: string]: any;
}

type ExcelData = ExcelDataItem[];

const ReporteNotas = () => {

    const navigate = useNavigate()

    const [excelData, setExcelData] = useState<ExcelData | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
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
        const excelDatosNotas = excelData.slice(7)
        excelDatosNotas.map((item: any) => {
            let aux = {
                codigo: item[0],
                nombreEstudiante: item[1],
                notaA: parseFloat(item[2]),
                notaB: parseFloat(item[3]),
                notaC: parseFloat(item[4]),
                notaD: parseFloat(item[5]),
                // notaPractica: parseFloat(parseFloat((parseFloat(item[2]) + parseFloat(item[3]) + parseFloat(item[4]) + parseFloat(item[5])) / 4).toFixed(2))
                // notaPracticaporcentaje: (parseFloat(item[2])+parseFloat(item[3])+parseFloat(item[4])+parseFloat(item[5]))*0.2/4,
                notaEMC: parseFloat(item[6]),
                // notaEMCporcentaje: parseFloat(item[6])*0.4,
                notaEF: parseFloat(item[7]),
                // notaEFporcentaje: parseFloat(item[7])*0.4,
            }
            datosNotas.push(aux)
        })
    }

    // const [datosNotas,setDatosNotas] = useState()

    const resultadoPractica = (notaA: number, notaB: number, notaC: number, notaD: number): number => {
        return parseFloat(
            (
                (notaA + notaB + notaC + notaD) / 4
            ).toFixed(2)
        );
    }

    const resultadoFinal = (notaA: number, notaB: number, notaC: number, notaD: number, notaEMC: number, notaEF: number): number => {
        return parseFloat(
            (
                (notaA + notaB + notaC + notaD) * 0.2 / 4 +
                notaEMC * 0.4 +
                notaEF * 0.4
            ).toFixed(1)
        );
    }

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Lista Asignada al Docente</h2>

                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mb-6">
                            <div
                                className="border-b-2 border-gray-200 p-2 flex justify-between">
                                <div className="text-sm font-bold">
                                    TENER EN CUENTA
                                </div>
                            </div>
                            <div className="m-2">

                                <div className="px-4">

                                    <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                        <li className="pl-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">Formato de Notas: </span> Usar el formato designado, lo puede descargar <strong className='font-bold text-blue-800'>AQUI</strong>.
                                        </li>
                                        <li className="pl-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">No hay actulizacion de notas:</span> Toda actulización o corrección de notas sera mediente solicitud u oficio.
                                        </li>

                                    </ol>

                                </div>

                            </div>
                        </div>
                        <div>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                            {excelData && (
                                <div>
                                    <h2 className='my-2'>REGISTROS SUBIDOS:</h2>
                                    <table className="table-auto min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr className='text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                {/*/
                                                (excelData[6]).map((item: any, key: any) => {
                                                    return (
                                                        <th key={key} className='px-6 py-3'>{item}</th>
                                                    )
                                                })
                                                /*/}
                                                <th className='px-6 py-3'>Codigo</th>
                                                <th className='px-6 py-3'>Nombre</th>
                                                <th className='px-6 py-3'>Nota A</th>
                                                <th className='px-6 py-3'>Nota B</th>
                                                <th className='px-6 py-3'>Nota C</th>
                                                <th className='px-6 py-3'>Nota D</th>
                                                <th className='px-6 py-3'>Nota Practica (20%)</th>
                                                <th className='px-6 py-3'>Nota Examen Medio Ciclo (40%)</th>
                                                <th className='px-6 py-3'>Nota Examen Final de Ciclo (40%)</th>
                                                <th className='px-6 py-3'>Nota Final</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {/*/
                                            excelData.slice(7).map((row: any, keyRow: any) => (
                                                <tr key={keyRow} className='whitespace-nowrap text-sm text-gray-900 text-center'>
                                                    {row.map((item: any, keyCol: any) => {
                                                        return (
                                                            <td key={keyCol} className='px-6 py-4'>{item}</td>
                                                        )
                                                    })}
                                                </tr>
                                            ))
                                            /*/}
                                            {
                                                datosNotas.map((item: any, key: any) => {
                                                    return (
                                                        <tr key={key} className='whitespace-nowrap text-sm text-gray-700 text-center font-medium'>
                                                            <th className='px-6 py-4'>{item.codigo}</th>
                                                            <th className='px-6 py-4'>{item.nombreEstudiante}</th>
                                                            <th className='px-6 py-4'>{item.notaA}</th>
                                                            <th className='px-6 py-4'>{item.notaB}</th>
                                                            <th className='px-6 py-4'>{item.notaC}</th>
                                                            <th className='px-6 py-4'>{item.notaD}</th>
                                                            <th className='px-6 py-4'>{resultadoPractica(item.notaA, item.notaB, item.notaC, item.notaD)}</th>
                                                            <th className='px-6 py-4'>{item.notaEMC}</th>
                                                            <th className='px-6 py-4'>{item.notaEF}</th>
                                                            <th className={`px-6 py-4 ${resultadoFinal(item.notaA, item.notaB, item.notaC, item.notaD, item.notaEMC, item.notaEF) > 10.5 ? 'bg-green-300' : 'bg-red-300'}`}>{resultadoFinal(item.notaA, item.notaB, item.notaC, item.notaD, item.notaEMC, item.notaEF)}</th>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default ReporteNotas