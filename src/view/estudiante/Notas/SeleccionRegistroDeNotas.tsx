import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import Idioma from "@/model/interfaces/idioma/idioma"
import { ListarIdioma } from "@/network/rest/idiomas.network";
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom";


const SelecionRegistroDeNotas = () => {

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])

    const abortController = useRef(new AbortController());

    useEffect(() => {

        LoadDataIdioma()

    }, [])

    const LoadDataIdioma = async () => {

        setComboBoxIdioma([])

        const response = await ListarIdioma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxIdioma(response.data.resultado as Idioma[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div>
                        <h2 className="font-semibold text-xl">
                            Seleccione el Idioma y visualize sus notas:
                        </h2>
                    </div>

                    {
                        comboBoxIdioma.map((item, key) => {
                            return (
                                <div key={key} className="flex flex-row mx-auto my-4 border-2 rounded-lg p-4 w-2/3 justify-between ">
                                    <h2 className="px-3 py-2 font-semibold">
                                        {item.idiomaNombre}
                                    </h2>
                                    <NavLink
                                    to={'/inicio/notas-estudiante'}
                                    >
                                        <button className="px-3 py-2 bg-upla-100 rounded-lg text-white font-semibold">
                                            Ver Notas
                                        </button>
                                    </NavLink>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
export default SelecionRegistroDeNotas