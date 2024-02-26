import Menu from "./widget/Menu";
import ListMenu from "./widget/ListMenu";
import Title from "./widget/Title";
import SubTitle from "./widget/SubTitle";
import Overlay from "./widget/Overlay";
import Body from "./widget/Body";
import EstudianteLogin from "../../../../model/interfaces/login/estudiante.login";
import TrabajadorLogin from "../../../../model/interfaces/login/trabajador.login";
import { MenuItem, menusAdmin } from "@/helper/menu.helper";
//import { useSelector } from "react-redux";
//import { RootState } from "@/store/configureStore.store";


type Props = {

    informacion: EstudianteLogin | TrabajadorLogin | undefined,
    pathname: string,
    refAside: React.RefObject<HTMLInputElement>,
    refOverlay: React.RefObject<HTMLInputElement>,
    onEventOverlay: React.MouseEventHandler,
}

const Aside = (props: Props) => {

    //const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)

    const menus: MenuItem[] = menusAdmin


    return (
        <Body refAside={props.refAside}>
            <div className="relative z-30 h-full overflow-y-auto py-4">
                <Title />

                <SubTitle informacion={props.informacion} />

                <ul id="menus">
                    {
                        menus.map((menu, index) => {
                            if (menu.subMenuItems?.length == 0) {
                                return <Menu
                                    key={index}
                                    pathname={props.pathname}
                                    icon={menu.icono}
                                    nombre={menu.titulo}
                                    to={menu.url!}
                                />
                            } else {
                                return <ListMenu
                                    key={index}
                                    idList={menu.id}
                                    desplegar={menu.subMenuItems?.filter(item => item.url === props.pathname).length != 0}
                                    icon={menu.icono}
                                    nombre={menu.titulo}
                                >
                                    {
                                        menu.subMenuItems?.map((submenu, indexm) => {
                                            return <Menu
                                                key={indexm}
                                                pathname={props.pathname}
                                                icon={submenu.icono}
                                                nombre={submenu.titulo}
                                                to={submenu.url!}
                                            />
                                        })
                                    }
                                </ListMenu>
                            }
                        })
                    }
                </ul>
            </div>
            <Overlay refOverlay={props.refOverlay} onEventOverlay={props.onEventOverlay} />
        </Body>
    );
}

export default Aside;