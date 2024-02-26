import { menusAdmin } from "@/helper/menu.helper";
import { RootState } from "@/store/configureStore.store";
import { useSelector } from "react-redux";


const useValidatePath=()=>{

    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)

    const validate = () => menusAdmin.some(item=>item.tipoUser === tipoUsuario)

    return {
        validate
    }
}

export default useValidatePath;