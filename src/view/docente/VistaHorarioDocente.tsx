import Horario from "@/component/pages/horario/Horario"

const VistaHorarioDocente = () => {

    const data = [{}]
    const color = [{}]

    const handleShow = () => {

    }

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        Vista Horario Docente

                        <Horario data={data} color={color} handleShow={handleShow}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VistaHorarioDocente