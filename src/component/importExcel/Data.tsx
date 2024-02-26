import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelDataItem {
    [key: string]: any;
}

type ExcelData = ExcelDataItem[];

type Props = {
    handleNotas: () => void;
}

const Data = (props: Props) => {

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
                const jsonData = XLSX.utils.sheet_to_json<ExcelData>(sheet, { header: 1 });
                setExcelData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                {/*/excelData && (
                    <div>
                        <h2>Excel Data:</h2>
                        <pre>{JSON.stringify(excelData, null, 2)}</pre>
                    </div>
                )/*/}
            </div>
            {
                excelData &&
                <>
                    <div className='mt-4'>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {excelData[0].map((header: any, index: any) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {excelData.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell: any, cellIndex: any) => (
                                            <td
                                                key={cellIndex}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900"
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Subir Notas
                        </button>
                    </div>
                </>
            }
        </>
    );
};

export default Data