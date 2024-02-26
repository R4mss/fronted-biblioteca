import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';


type Props = {
    data: object[];
    color: object[];
    handleShow: () => void;
}

const Horario = (props: Props) => {

    return (
        <>
            <Scheduler
                defaultCurrentView="week"
                dataSource={props.data}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                cellDuration={30}
                showCurrentTimeIndicator={false}
                onAppointmentClick={props.handleShow}
                editing={false}
            >
                <View
                    type="week"
                    startDayHour={8}
                    endDayHour={14}
                />
                <Resource
                    dataSource={props.color}
                    fieldExpr="roomId"
                    label="Room"
                />
            </Scheduler >
        </>
    )
}
export default Horario