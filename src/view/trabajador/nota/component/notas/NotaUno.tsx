import { keyNumberFloat } from "@/helper/herramienta.helper";
import { isNumeric } from "@/helper/herramienta.helper";
import { useRef, useState } from "react"

type Props = {
    detMatriculaId: number
    detalle: any []
}

const NotaUno = (props: Props) => {

    const regNota1 = props.detalle.filter(
        (item) => item.tipCaliId === 1
    );    


    const [nota1, setNota1] = useState<string>(regNota1[0].nota)

    const [valid, setValid] = useState<boolean>(true)

    const refNota1 = useRef<HTMLInputElement>(null)

    const selectAllText = () => {
        if (refNota1.current) {
            refNota1.current.select();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        setNota1(inputValue)

        if (inputValue.trim() == '') {

            setValid(false); // Si está vacío, se establece como inválido
            return
        }

        if (isNumeric(inputValue)) {
            if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
                setValid(true); // Si es numérico y está dentro del rango, se establece como válido
            } else {
                setValid(false); // Si es numérico pero está fuera del rango, se establece como inválido
            }
        }
    };

    const handleNextInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // if (event.key === 'Enter') {
        //     const nextInput = event.target.parentElement.parentElement.nextElementSibling.querySelector('input',);
        //     nextInput.focus();
        // }
        //   if (event.key === 'Enter' && isLastRow) {
        //     const firstInput = event.target.parentElement.parentElement.parentElement.querySelector('input',);
        //     firstInput.focus();
        //   }
    }

    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    maxLength={5}
                    className={`font-mont border ${valid ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                    ref={refNota1}
                    value={nota1}
                    onChange={handleChange}
                    onClick={selectAllText}
                    onPaste={handlePaste}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
                // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                />
                <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${regNota1[0].condNota == 'no'? 'text-white' : 'text-green-400'} `}></i>
            </div>

        </>
    )

}

export default NotaUno