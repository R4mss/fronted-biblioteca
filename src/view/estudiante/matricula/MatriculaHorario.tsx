import { useState } from 'react';

import 'devextreme/dist/css/dx.light.css';

import ModalMatricula from './modal/Matricula.modal';


import Horario from '@/component/pages/horario/Horario';

// import { Scheduler, View, Resource } from 'devextreme-react/scheduler';

const MatriculaHorario = () => {
    
    const fechaActual: Date = new Date();

    function diaActual() {
        switch (fechaActual.getDay()) {
            case 1:
                return [0, 1, 2, 3, 4, 5, 6]
            case 2:
                return [-1, 0, 1, 2, 3, 4, 5]
            case 3:
                return [-2, -1, 0, 1, 2, 3, 4]
            case 4:
                return [-3, -2, -1, 0, 1, 2, 3]
            case 5:
                return [-4, -3, -2, -1, 0, 1, 2]
            case 6:
                return [-5, -4, -3, -2, -1, 0, 1]
            case 0:
                return [-6, -5, -4, -3, -2, -1, 0]
            default:
                return []
        }
    }

    const diaSemana = diaActual()

    const data = [
        {
            text: 'HORARIO REGULAR 1',
            roomId: 3,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[0], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[0], 9, 30),
            // recurrenceRule: 'FREQ=WEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            text: 'HORARIO REGULAR 1',
            roomId: 1,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[1], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[1], 9, 30),
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            text: 'HORARIO REGULAR 1',
            roomId: 4,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[2], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[2], 9, 30),
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            text: 'HORARIO REGULAR 1',
            roomId: 1,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[3], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[3], 9, 30),
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            text: 'HORARIO REGULAR 1',
            roomId: 1,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[4], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[4], 9, 30),
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        // {
        //     text: 'HORARIO REGULAR 2',
        //     roomId: 2,
        //     startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 9, 30),
        //     endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 11, 0),
        //     recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        // }, 
        // {
        //     text: 'HORARIO REGULAR 3',
        //     roomId: 3,
        //     startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 11, 0),
        //     endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 12, 30),
        //     recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        // }, 
        // {
        //     text: 'HORARIO REGULAR 4',
        //     roomId: 4,
        //     startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 12, 30),
        //     endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 6, 14, 0),
        //     recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        // }, 
        {
            text: 'HORARIO INTENSIVO 1',
            roomId: 5,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 12, 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 12, 11, 0),

        },
        {
            text: 'HORARIO INTENSIVO 2',
            roomId: 6,
            startDate: new Date(fechaActual.getFullYear(), 10, 12, 11, 0),
            endDate: new Date(fechaActual.getFullYear(), 10, 12, 14, 0),
        },
    ];

    const colorCR = [
        {
            text: 'ClassRoom 1',
            id: 1,
            color: '#6C3483',
        },
        {
            text: 'ClassRoom 2',
            id: 2,
            color: '#1ABC9C',
        },
        {
            text: 'ClassRoom 3',
            id: 3,
            color: '#F1C40F',
        },
        {
            text: 'ClassRoom 4',
            id: 4,
            color: '#D35400',
        },
        {
            text: 'ClassRoom 5',
            id: 5,
            color: '#2ECC71',
        },
        {
            text: 'ClassRoom 6',
            id: 6,
            color: '#5D6D7E',
        },
    ];

    // const turno = [
    //     {
    //         text: 'Mañana',
    //         id: 1,
    //     },
    //     {
    //         text: 'Tarde',
    //         id: 2,
    //     },
    //     {
    //         text: 'Noche',
    //         id: 3,
    //     },
    // ]


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const showToast = (event: string, value: string, type: string) => {
    //     notify(`${event} "${value}" task`, type, 800);
    // };
    return (
        <>
            <Horario data={data} color={colorCR} handleShow={handleShow}/>
            <ModalMatricula show={show} hide={handleClose} />
        </>
    )
}
export default MatriculaHorario