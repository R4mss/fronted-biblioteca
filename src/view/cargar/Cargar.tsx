import { useEffect } from 'react';
import '../../assets/css/loader.css';
import Response from "../../model/class/response.model.class";
import { useDispatch } from 'react-redux';
import { restore, starting } from '../../store/authSlice.store';
import { ValidarTokenRest } from '../../network/rest/services.network';
import { images } from '../../helper/index.helper';

const Cargar = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        valid();
    }, []);

    const valid = async () => {       
        const token = window.localStorage.getItem("token");
        const codigo = window.localStorage.getItem("codigo");
        // const tipUsuario = window.localStorage.getItem("tipoUsuario");

        if (token == null || codigo == null) {
            dispatch(starting());
            return;
        }

        const response = await ValidarTokenRest();

        if(response instanceof Response){
            dispatch(restore({ codigo: JSON.parse(codigo), token: JSON.parse(token), authentication: true }));
            return;
        }

        dispatch(starting());
        return;
    }

    return (
        <>
            <div className="fixed z-[500] w-screen h-screen">
                <div className=" w-screen h-screen bg-gray-900"></div>
                <div className=" w-full h-full absolute left-0 top-0 text-white flex justify-center items-center flex-col">
                    <img src={images.logo} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                    <div style={{ "borderTopColor": "transparent" }}
                        className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                    </div>
                    <h1 className='m-3 text-center'>Se está estableciendo conexión con el servidor..</h1>
                </div>
            </div>
        </>
    );
}

export default Cargar;