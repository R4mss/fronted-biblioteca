import Menu from "./widget/Menu";
import ListMenu from "./widget/ListMenu";
import Title from "./widget/Title";
import SubTitle from "./widget/SubTitle";
import Overlay from "./widget/Overlay";
import Body from "./widget/Body";
import EstudianteLogin from "../../../../model/interfaces/login/estudiante.login";
import TrabajadorLogin from "../../../../model/interfaces/login/trabajador.login";


type Props = {

    informacion: EstudianteLogin | TrabajadorLogin | undefined,
    pathname: string,
    refAside: React.RefObject<HTMLInputElement>,
    refOverlay: React.RefObject<HTMLInputElement>,
    onEventOverlay: React.MouseEventHandler,
}

type MenuItem = {
    id: string,
    titulo: string,
    url?: string,
    icono: string,
    moduPadre: boolean,
    modPosicion: number,
    subMenu: boolean,
    subMenuItems?: MenuItem[]
}

const menusAdmin: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio/centro-idiomas",
        icono: "bi-house-fill",
        moduPadre: true,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "2",
        titulo: "Opciones",
        icono: "bi-gear-fill",
        moduPadre: true,
        modPosicion: 2,
        subMenu: true,
        subMenuItems: [

            {
                id: "1",
                titulo: "Registro de Horarios",
                url: "/inicio/horario-idiomas",
                icono: "bi-calendar-week",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },
            {
                id: "2",
                titulo: "Registro de Notas",
                url: "/inicio/buscar-aulas-asignaturas",
                icono: "bi-card-checklist",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,
            },

            {
                id: "3",
                titulo: "Registro de Calendario",
                url: "/inicio/calendario",
                icono: "bi-calendar2-check",
                moduPadre: false,
                modPosicion: 3,
                subMenu: false,
            },

        ]
    },
    {
        id: "1",
        titulo: "Reportes",
        icono: "bi-card-list",
        moduPadre: true,
        modPosicion: 3,
        subMenu: true,
        subMenuItems: [
            {

                id: "1",
                titulo: "Reporte General",
                url: "/inicio/Reportes",
                icono: "bi-file-text-fill",

                moduPadre: false,
                modPosicion: 2,
                subMenu: false,
            },
            {
                id: "2",
                titulo: "Reportes filtros",
                url: "/inicio/Reportes-Filtros",
                icono: "bi-file-text-fill",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,
            },
            {
                id: "3",
                titulo: "Buscar Aula Excel",
                url: "/inicio/buscar-aulas-asignaturas-excel",
                icono: "bi-file-text-fill",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,
            },
        ]
    },
]

const menusEst: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio/centro-idiomas",
        icono: "bi-house-fill",
        moduPadre: true,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "2",
        titulo: "Opciones",
        icono: "bi-gear-fill",
        moduPadre: true,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: [
            {
                id: "1",
                titulo: "Matricula",
                url: "/inicio/matricula-interna",
                icono: "bi-pencil-square",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },


        ],
    },
]


const Aside = (props: Props) => {

    // const tipoUser = window.localStorage.getItem("tipoUsuario")
    // const cod = window.localStorage.getItem("codigo")
    const tipoUser = window.localStorage.getItem("tipoUsuario")?.replace(/"/g, '');


    const menus: MenuItem[] = tipoUser == "est" ? menusEst : menusAdmin


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