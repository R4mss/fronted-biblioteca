import { keyNumberFloat } from "@/helper/herramienta.helper";
import { isNumeric } from "@/helper/herramienta.helper";
import { useRef, useState } from "react"

type Props = {
    nota2: number
    condNota2: string
}

const NotaDos = (props: Props) => {

    const [nota2, setNota2] = useState<string>(props.nota2.toString())

    const [valid, setValid] = useState<boolean>(true)

    const refNota2 = useRef<HTMLInputElement>(null)

    const selectAllText = () => {
        if (refNota2.current) {
            refNota2.current.select();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        setNota2(inputValue)

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

    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    maxLength={5}
                    className={`font-mont border ${valid ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                    ref={refNota2}
                    value={nota2}
                    onChange={handleChange}
                    onClick={selectAllText}
                    onPaste={handlePaste}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
                // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                />
                <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${props.condNota2 == 'no' ? 'text-white' : 'text-green-400'} `}></i>

            </div>

        </>
    )

}

export default NotaDos