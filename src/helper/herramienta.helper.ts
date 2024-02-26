export function formatTime(value: string) {
    var hourEnd = value.indexOf(":");
    var H = +value.substring(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    return h + value.substring(hourEnd, hourEnd + 3) + ":" + value.substring(6, 8) + " " + ampm;
}

export function formatDateTimeToFecha(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);
    const formatoFecha = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(fecha);

    return formatoFecha
}

export function convertHourToNumberIntege(hourString: string) {
    // usar este formato de cadena: '08:00:00.0000000', '13:00:00.0000000'
    const hour = parseInt(hourString, 10); // Convierte la cadena a entero base 10
    return hour;
}

export function keyNumberInteger(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key: string = event.key;
    const c: string = key.length === 1 ? key : '';
    if ((c < "0" || c > "9") && c !== "\b") {
        event.preventDefault();
    }
}

// export function keyNumberFloat(event: React.KeyboardEvent<HTMLInputElement>): void {
//     const c: string = event.key;
//     const input: HTMLInputElement = event.target as HTMLInputElement;

//     if ((c < "0" || c > "9") && c !== "\b" && c !== ".") {
//         event.preventDefault();
//     }
//     if (c === "." && input.value.includes(".")) {
//         event.preventDefault();
//     }
// }

export function keyNumberFloat(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key: string = event.key;
    const isDigit: boolean = /\d/.test(key);
    const isDot: boolean = key === '.';
    const hasDot: boolean = (event.target as HTMLInputElement).value.includes('.');

    if (!(isDigit || isDot || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab')) {
        event.preventDefault();
    }

    if (isDot && hasDot) {
        event.preventDefault();
    }
}

export function GenerateRangeTurno(horaInicio: string, horaFin: string, tipoEstudio: number, tipoSemana: number) {

    let estudio = 0
    if (tipoEstudio == 1 || tipoEstudio == 4) {
        if (tipoSemana == 5) {
            estudio = 90
        }
        if (tipoSemana == 2) {
            estudio = 240
        }

    }
    if (tipoEstudio == 2 || tipoEstudio == 3) {
        estudio = 180
    }

    if (estudio == 0) {
        return [];
    }

    // Convertir las horas de inicio y fin a objetos Date para cálculos
    const fechaInicio = new Date(`2000-01-01T${horaInicio}`);
    const fechaFin = new Date(`2000-01-01T${horaFin}`);

    // Array para almacenar las horas generadas
    const turnoTardeSelect = [];

    // Generar horas con intervalo de 15 minutos
    let horaActual = fechaInicio;
    let id = 1;

    while (horaActual <= fechaFin) {
        const hora = horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        turnoTardeSelect.push({ id, hora });
        horaActual.setMinutes(horaActual.getMinutes() + estudio);
        id++;

    }

    return turnoTardeSelect
}

export function FinalizarHorario(day: number, tipo: number, horaInicio: string) {
    let horasASumar: number;

    if (tipo === 1 || tipo === 4) {
        horasASumar = 1.5;
    } else if (tipo === 2 || tipo === 3) {
        horasASumar = 3;
    } else {
        throw new Error('El tipo debe ser 1 o 2');
    }

    if (day === 6 || day === 7) {
        horasASumar = 4;
    }

    // Convertir la hora inicial a minutos para facilitar la manipulación
    const [horaStr, minutoStr] = horaInicio.split(':').map(Number);
    const minutosTotales = horaStr * 60 + minutoStr;

    // Sumar las horas
    const nuevosMinutosTotales = minutosTotales + horasASumar * 60;

    // Calcular la nueva hora y minutos
    const nuevaHora = Math.floor(nuevosMinutosTotales / 60) % 24;
    const nuevoMinuto = nuevosMinutosTotales % 60;

    // Formatear la nueva hora y minutos
    const nuevaHoraStr = nuevaHora.toString().padStart(2, '0');
    const nuevoMinutoStr = nuevoMinuto.toString().padStart(2, '0');

    return `${nuevaHoraStr}:${nuevoMinutoStr}`
};

export function FinalizarHorarioCheckBox(day: number[], tipo: number, horaInicio: string) {
    let horasASumar: number;

    if (tipo === 1 || tipo === 4) {
        horasASumar = 1.5;
    } else if (tipo === 2 || tipo === 3) {
        horasASumar = 3;
    } else {
        throw new Error('El tipo debe ser 1 o 2');
    }

    if (day.includes(6) || day.includes(7)) {
        horasASumar = 4;
    }

    // Convertir la hora inicial a minutos para facilitar la manipulación
    const [horaStr, minutoStr] = horaInicio.split(':').map(Number);
    const minutosTotales = horaStr * 60 + minutoStr;

    // Sumar las horas
    const nuevosMinutosTotales = minutosTotales + horasASumar * 60;

    // Calcular la nueva hora y minutos
    const nuevaHora = Math.floor(nuevosMinutosTotales / 60) % 24;
    const nuevoMinuto = nuevosMinutosTotales % 60;

    // Formatear la nueva hora y minutos
    const nuevaHoraStr = nuevaHora.toString().padStart(2, '0');
    const nuevoMinutoStr = nuevoMinuto.toString().padStart(2, '0');

    return `${nuevaHoraStr}:${nuevoMinutoStr}`
};

export function getDateForma(value: string, format = "dd/mm/yyyy"): string {
    const parts = value.split("-");
    const today = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

    return format === "dd/mm/yyyy"
        ? (today.getDate() > 9 ? today.getDate() : "0" + today.getDate()) +
        "/" +
        (today.getMonth() + 1 > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)) +
        "/" +
        today.getFullYear()
        : today.getFullYear() +
        "-" +
        (today.getMonth() + 1 > 9 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)) +
        "-" +
        (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());
}

export function getCurrentDate(): string {
    const today = new Date();
    const formatted_date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 > 9
            ? today.getMonth() + 1
            : "0" + (today.getMonth() + 1)) +
        "-" +
        (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());
    return formatted_date;
}

export function getCurrentDateFormatted() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Obtiene el día y ajusta al formato de 2 dígitos
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes y ajusta al formato de 2 dígitos
    const year = currentDate.getFullYear().toString(); // Obtiene el año

    return `${day}/${month}/${year}`; // Retorna la fecha en formato 'dd/mm/yyyy'
}

export function getCurrentTime24hFormat() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Obtiene las horas y las ajusta al formato de 2 dígitos
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos y los ajusta al formato de 2 dígitos
    const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Obtiene los segundos y los ajusta al formato de 2 dígitos

    return `${hours}:${minutes}:${seconds}`; // Retorna la hora en formato de 24 horas (HH:MM:SS)
}

export function convertirFormatoFechaSql(fechaHora: string): string {
    const fecha = new Date(fechaHora);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}


export function convertirFormatoHoraSql(fechaHora: string): string {
    const fecha = new Date(fechaHora);

    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
}

export function convertirNumeroAMes(numero: number): string | undefined {
    const meses = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL',
        'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
        'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];

    if (numero >= 1 && numero <= 12) {
        return meses[numero - 1];
    } else {
        return undefined; // Si el número no está en el rango válido de meses
    }
}

export function isNumeric(valor: any): boolean {
    return !isNaN(valor) && !isNaN(parseFloat(valor));
}

export const denominacionHorario = {
    intensivoLV: [
        {
            id: 1,
            horaInicio: '08:00',
            horaFin: '09:30',
            denominacion: 'H1'
        },
        {
            id: 2,
            horaInicio: '09:30',
            horaFin: '11:00',
            denominacion: 'H2'
        },
        {
            id: 3,
            horaInicio: '11:00',
            horaFin: '12:30',
            denominacion: 'H3'
        },
        {
            id: 4,
            horaInicio: '12:30',
            horaFin: '14:00',
            denominacion: 'H4'
        }
        ,
        {
            id: 5,
            horaInicio: '14:00',
            horaFin: '15:30',
            denominacion: 'H5'
        },
        {
            id: 6,
            horaInicio: '15:30',
            horaFin: '17:00',
            denominacion: 'H6'
        },
        {
            id: 7,
            horaInicio: '17:00',
            horaFin: '18:30',
            denominacion: 'H7'
        }
        ,
        {
            id: 8,
            horaInicio: '18:30',
            horaFin: '20:00',
            denominacion: 'H8'
        },
        {
            id: 9,
            horaInicio: '20:00',
            horaFin: '21:30',
            denominacion: 'H9'
        }
    ],

    superintensivoLV: [
        {
            id: 1,
            horaInicio: '08:00',
            horaFin: '11:00',
            denominacion: 'H1'
        },
        {
            id: 2,
            horaInicio: '11:00',
            horaFin: '14:00',
            denominacion: 'H2'
        },
        {
            id: 3,
            horaInicio: '15:30',
            horaFin: '18:30',
            denominacion: 'H3'
        },
        {
            id: 4,
            horaInicio: '18:30',
            horaFin: '21:30',
            denominacion: 'H4'
        }
    ],

    intensivoSD: [
        {
            id: 1,
            horaInicio: '08:00',
            horaFin: '12:00',
            denominacion: 'H1'
        },
        {
            id: 2,
            horaInicio: '15:00',
            horaFin: '19:00',
            denominacion: 'H2'
        }
    ]
}


export const diaSelect = [
    { "id": 1, "dia": 'Lunes' },
    { "id": 2, "dia": 'Martes' },
    { "id": 3, "dia": 'Miercoles' },
    { "id": 4, "dia": 'Jueves' },
    { "id": 5, "dia": 'Viernes' },
    { "id": 6, "dia": 'Sabado' },
    { "id": 7, "dia": 'Domingo' }
]

export const colorSelect = [
    { "id": 1, "nombreColor": 'Rojo', "codColor": '#EF9A9A' },
    { "id": 2, "nombreColor": 'Verde', "codColor": '#81C784' },
    { "id": 3, "nombreColor": 'Azul', "codColor": '#64B5F6' },
    { "id": 4, "nombreColor": 'Amarillo', "codColor": '#FFF59D' },
    { "id": 5, "nombreColor": 'Naranja', "codColor": '#FFCC80' },
    { "id": 6, "nombreColor": 'Morado', "codColor": '#BA68C8' },
    { "id": 7, "nombreColor": 'Rosa', "codColor": '#F48FB1' },
    { "id": 8, "nombreColor": 'Cyan', "codColor": '#4DD0E1' },
    { "id": 9, "nombreColor": 'Gris', "codColor": '#B0BEC5' },
    { "id": 10, "nombreColor": 'Marrón', "codColor": '#8D6E63' }
];



export const seccionSelect = [
    { "id": 1, "nombreSeccion": "A" },
    { "id": 2, "nombreSeccion": "B" },
    { "id": 3, "nombreSeccion": "C" },
    { "id": 4, "nombreSeccion": "D" },
    { "id": 5, "nombreSeccion": "E" },
    { "id": 6, "nombreSeccion": "F" },
    { "id": 7, "nombreSeccion": "G" },
    { "id": 8, "nombreSeccion": "H" },
    { "id": 9, "nombreSeccion": "I" },
    { "id": 10, "nombreSeccion": "J" },
    { "id": 11, "nombreSeccion": "K" },
    { "id": 12, "nombreSeccion": "L" },
    { "id": 13, "nombreSeccion": "M" },
    { "id": 14, "nombreSeccion": "N" },
    { "id": 15, "nombreSeccion": "O" },
    { "id": 16, "nombreSeccion": "P" },
    { "id": 17, "nombreSeccion": "Q" },
    { "id": 18, "nombreSeccion": "R" },
    { "id": 19, "nombreSeccion": "S" },
    { "id": 20, "nombreSeccion": "T" },
    { "id": 21, "nombreSeccion": "U" },
    { "id": 22, "nombreSeccion": "V" },
    { "id": 23, "nombreSeccion": "W" },
    { "id": 24, "nombreSeccion": "X" },
    { "id": 25, "nombreSeccion": "Y" },
    { "id": 26, "nombreSeccion": "Z" }
];



