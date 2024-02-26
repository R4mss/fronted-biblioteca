import { useDispatch } from "react-redux";
import { logout } from "../../../../store/authSlice.store";
// import { useEffect, useState } from "react";

// type MessageNotif = {
//     id: string;
//     codigo: string;
//     titulo: string;
//     mensaje: string;
// };

// let messageNotif: MessageNotif[] = [
//     {
//         id: "1",
//         codigo: "1111",
//         titulo: "Titulo 1",
//         mensaje: "Mensaje de Prueba 1",
//     },
//     {
//         id: "2",
//         codigo: "2222",
//         titulo: "Titulo 2",
//         mensaje: "Mensaje de Prueba 2",
//     },
//     {
//         id: "3",
//         codigo: "3333",
//         titulo: "Titulo 3",
//         mensaje: "Mensaje de Prueba 3",
//     },
//     {
//         id: "4",
//         codigo: "4444",
//         titulo: "Titulo 4",
//         mensaje: "Mensaje de Prueba 5",
//     },
// ];

type Props = {
    refBlock: React.RefObject<HTMLInputElement>,
    onEventMenu: React.MouseEventHandler,
}

const Nav = (props: Props) => {

    const dispatch = useDispatch();

    // const [open, setOpen] = useState<boolean>(false);
    // const [notif, setNotif] = useState<MessageNotif[]>([]);

    // useEffect(() => {
    //     setNotif(messageNotif);
    // }, []);

    // const removeNotif = (idEliminar: string) => {
    //     setNotif(notif.filter((item) => item.id !== idEliminar));
    // };

    return (
        <nav
            className="drop-shadow bg-upla-100 flex left-0 fixed w-full font-mont border-gray-200 z-20 h-[50px]">
            <div
                ref={props.refBlock}
                className="w-0 md:w-64 bg-gray-50 transition-all duration-500">
            </div>
            <button
                onClick={props.onEventMenu}
                className="flex items-center justify-center px-4 text-white hover:bg-white hover:text-upla-100">
                <i className="bi bi-justify text-2xl"/>
            </button>
            <ul className="flex items-center flex-1 justify-end pr-3 h-full">
                <li className="flex justify-center h-full relative">
                    {/* <button className="px-4 text-white hover:bg-white hover:text-upla-100 relative"
                        onClick={() => setOpen(!open)}>
                        <i className="bi bi-bell text-xl"></i>
                        <span className="absolute right-[5px] top-[2px] bg-yellow-300 text-yellow-800 text-xs font-medium px-1.5 py-0.5 rounded text-center">{notif.length}</span>
                    </button> */}
                    {/* <ul className={`${open ? "block" : "hidden"}  absolute h-fit translate-x-[-270px] translate-y-[53px] inset-0  w-80 bg-white rounded-sm drop-shadow-md`}>
                        <div className="max-h-[220px] overflow-y-auto">
                            {

                                notif.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="flex flex-row items-center justify-between px-2 py-5 border-b-2 border-[#ddd] border-solid m-0">
                                                <div className="p-3">
                                                    <div className="flex items-center justify-center relative w-12">
                                                        <div className="absolute left-0"><i className="bi bi-circle-fill text-5xl text-upla-100"></i> </div>
                                                        <div className="absolute left-3"><i className="bi bi-chat-dots-fill text-2xl text-white"></i></div>
                                                    </div>
                                                </div>
                                                <div className="ml-1 flex-1 w-full">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.titulo}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.mensaje}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => removeNotif(item.id)}
                                                        className="focus:outline-none text-black bg-white hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300  rounded-md text-sm px-3 py-2"
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })

                            }

                        </div>
                        <div>
                            <li className="bg-[#eee] text-sm px-2 py-3 text-center">
                                {notif.length == 0 ? "No hay notificaciones para mostrar." : `Tiene ${notif.length} ${notif.length == 1 ? "notificacion" : "notificaciones"}`}
                            </li>
                        </div>

                    </ul> */}
                </li>
                <li className="flex justify-center h-full">
                    <button
                    title="Cerrar Sesión"
                        onClick={() => dispatch(logout())}
                        className="px-4 text-white hover:bg-white hover:text-upla-100">
                        <i className="bi bi-box-arrow-left text-xl"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;