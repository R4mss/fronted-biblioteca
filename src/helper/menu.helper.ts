export type MenuItem = {
    id: string,
    titulo: string,
    url?: string,
    icono: string,
    moduPadre: boolean,
    modPosicion: number,
    subMenu: boolean,
    subMenuItems?: MenuItem[]
    tipoUser: string
}

export const menusAdmin: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio/resoluciones-upla",
        icono: "bi-house-fill",
        moduPadre: true,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: [],
        tipoUser: "admin"
    },
    {
        id: "2",
        titulo: "Opciones",
        icono: "bi-gear-fill",
        moduPadre: true,
        modPosicion: 2,
        subMenu: true,
        tipoUser: "admin",
        subMenuItems: [

            {
                id: "1",
                titulo: "Registro de Solicituds",
                url: "/inicio/solicitudes",
                icono: "bi-calendar-week",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
                tipoUser: "admin",
            },
            {
                id: "1",
                titulo: "Busqueda de Libros",
                url: "/inicio/busqueda-libro",
                icono: "bi-calendar-week",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
                tipoUser: "admin",
            },

        ]
    },
    {
        id: "3",
        titulo: "Reportes",
        icono: "bi-card-list",
        moduPadre: true,
        modPosicion: 3,
        subMenu: true,
        tipoUser: "admin",
        subMenuItems: [
            {

                id: "1",
                titulo: "Reporte General",
                url: "/inicio/Reportes",
                icono: "bi-file-text-fill",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
                tipoUser: "admin"
            },

        ]
    },
]
