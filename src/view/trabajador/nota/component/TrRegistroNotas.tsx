import { useRef, useState } from "react";
import { isNumeric, keyNumberFloat } from "@/helper/herramienta.helper";

type Props = {
    index: number
    item: any
    listaOriginal: any[],
    handleInputDetalle: (event: React.ChangeEvent<HTMLInputElement>, idDetalle: number,  tipo: number ) => void
}

const TrRegistroNotas = (props: Props) => {

    const { item, listaOriginal } = props
    let { index } = props

    const regNota1 = item.detalle.filter(
        (filter: any) => filter.tipCaliId === 1
    );

    const [nota1, setNota1] = useState<string>(regNota1[0].nota)
    const [validNota1, setValidNota1] = useState<boolean>(true)
    const [condNota1, setCondNota1] = useState(regNota1[0].condNota)

    const refNota1 = useRef<HTMLInputElement>(null)


    const handleChangeNota1 = (event: React.ChangeEvent<HTMLInputElement>, detMatriculaId: number, tipCaliId1: number) => {
        const inputValue = event.target.value;

        setNota1(inputValue)

        // setNota1((prevState) =>
        //     prevState.map((item: any) =>
        //         item.idProducto === idProducto ? { ...item, cantidad: value } : item
        //     )
        // );

        // this.setState((prevState) => ({
        //     detalle: prevState.detalle.map((item) =>
        //       item.idProducto === idProducto ? { ...item, cantidad: value } : item,
        //     ),
        //   }));

        if (inputValue.trim() == '') {

            setValidNota1(false); // Si está vacío, se establece como inválido
            return
        }

        if (isNumeric(inputValue)) {
            if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
                setValidNota1(true); // Si es numérico y está dentro del rango, se establece como válido
            } else {
                setValidNota1(false); // Si es numérico pero está fuera del rango, se establece como inválido
            }
        }





    };

    return (
        <>
            <tr key={index} className="text-sm">
                <td className="border p-2">{++index}</td>
                <td className="border p-2">{item.estudianteId}</td>
                <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                <td className="border p-2">
                    <div className="relative">
                        <input
                            type="text"
                            maxLength={5}
                            className={`font-mont border ${validNota1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                            ref={refNota1}
                            value={nota1}
                            onChange={(e) => props.handleInputDetalle(e, item.detMuatriculaId, 1)}

                            onKeyDown={keyNumberFloat}
                        // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                        />
                        <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${condNota1 == 'no' ? 'text-gray-400' : 'text-green-400'} `}></i>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TrRegistroNotas