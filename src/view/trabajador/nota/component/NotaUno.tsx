import { keyNumberFloat } from "@/helper/herramienta.helper";
// import { isNumeric } from "@/helper/herramienta.helper";
// import { useRef, useState } from "react"

type Props = {
    detMatriculaId: number

    detalle: any []
    nota: string
    refNota1: React.RefObject<HTMLInputElement>;
    validNota1: boolean
    handleChangeNota1:  (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotaUno = (props: Props) => {

    const regNota1 = props.detalle.filter(
        (item) => item.tipCaliId === 1
    );
    
    const cond = regNota1[0].condNota
    
    //const nota = regNota1[0].nota
    // const [nota1, setNota1] = useState<string>(nota)

    // const [valid1, setValid1] = useState<boolean>(true)
    // const refNota1 = useRef<HTMLInputElement>(null)

    const selectAllText = () => {
        if (props.refNota1.current) {
            props.refNota1.current.select();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = event.target.value;

    //     setNota1(inputValue)

    //     if (inputValue.trim() == '') {

    //         setValid1(false); // Si está vacío, se establece como inválido
    //         return
    //     }

    //     if (isNumeric(inputValue)) {
    //         if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
    //             setValid1(true); // Si es numérico y está dentro del rango, se establece como válido
    //         } else {
    //             setValid1(false); // Si es numérico pero está fuera del rango, se establece como inválido
    //         }
    //     }
    // };


    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    maxLength={5}
                    className={`font-mont border ${props.validNota1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                    ref={props.refNota1}
                    value={props.nota}
                    onChange={(e) => props.handleChangeNota1(e)}

                    onClick={selectAllText}
                    onPaste={handlePaste}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
                    //onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                />
                <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${ cond == 'no'? 'text-white' : 'text-green-400'} `}></i>
            </div>

        </>
    )

}

export default NotaUno