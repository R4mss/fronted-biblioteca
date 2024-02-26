import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/configureStore.store';
import Aside from '../pages/layout/aside/Aside';
import Nav from '../pages/layout/nav/Nav';

import { css, images } from '../../helper/index.helper';

import { useEffectOnce } from 'react-use';
import { Toaster } from 'react-hot-toast';

import TrabajadorLogin from '../../model/interfaces/login/trabajador.login';

type Props = {
    cargando: boolean,
    informacion: TrabajadorLogin | undefined,
}

const Contenido = (props: Props) => {

    
    const autenticado = useSelector((state: RootState) => state.autenticacion.autenticado)

    if (!autenticado) {
        return <Navigate to="/acceso" />
    }

    const location = useLocation();

    const refAside = useRef<HTMLInputElement>(null);

    const refBlock = useRef<HTMLInputElement>(null);

    const refMain = useRef<HTMLInputElement>(null);

    const refOverlay = useRef<HTMLInputElement>(null);

    useEffectOnce(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const menus = document.querySelectorAll<HTMLElement>("#menus li button") as NodeListOf<HTMLButtonElement>;
        for (const button of menus) {
            button.addEventListener("click", () => {
                const element = button.parentNode?.querySelector("ul") as HTMLElement;

                if (element.getAttribute("aria-expanded") !== "true") {
                    element.setAttribute("aria-expanded", "true");
                    element.style.maxHeight = element.scrollHeight + "px";

                    button.classList.remove("text-gray-400");
                    button.classList.add("text-white");
                    button.classList.add("bg-gray-700");

                    button.children[2].classList.remove("rotate-[-90deg]");

                    const list = button.parentElement?.parentElement?.querySelectorAll<HTMLElement>("button") as NodeListOf<HTMLButtonElement>;
                    for (const bu of list) {
                        if (button.getAttribute("id-list") !== bu.getAttribute("id-list")) {
                            const elementUl = bu.parentNode?.querySelector("ul") as HTMLElement;
                            if (elementUl.getAttribute("aria-expanded") == "true") {
                                elementUl.setAttribute("aria-expanded", "false");
                                elementUl!.style.maxHeight = elementUl.style.maxHeight = "0px";

                                bu!.classList.remove("text-white");
                                bu!.classList.add("text-gray-400");
                                bu!.classList.remove("bg-gray-700");
                                bu.children[2].classList.add("rotate-[-90deg]");
                            }
                        }
                    }


                } else {
                    element.setAttribute("aria-expanded", "false");
                    element.style.maxHeight = element.style.maxHeight = "0px";

                    button.classList.remove("text-white");
                    button.classList.add("text-gray-400");
                    button.classList.remove("bg-gray-700");

                    button.children[2].classList.add("rotate-[-90deg]");
                }
            });
        }
    });

    useEffect(() => {
        const onEventResize = (event: Event) => {
            const target = event.target as Window;
            if (target.innerWidth > 768) {
                refAside.current?.classList.add("ml-[-256px]");

                refOverlay.current?.classList.add("hidden");
            }
        }

        window.addEventListener('resize', onEventResize);

        return () => window.removeEventListener('resize', onEventResize)
    }, []);

    useEffect(() => {
        const onEventFocused = () => {
            // console.log("lasd")
        }

        window.addEventListener('focus', onEventFocused);

        return () => window.removeEventListener('focus', onEventFocused);
    }, []);

    const onEventOverlay = () => {
        refAside.current?.classList.toggle("ml-[-256px]");
        refOverlay.current?.classList.toggle("hidden");
    }

    const onEventMenu = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            refAside.current?.classList.toggle("ml-[-256px]");
            refOverlay.current?.classList.toggle("hidden");
        } else {
            refAside.current?.classList.toggle("md:ml-[0px]");
            refMain.current?.classList.toggle("md:ml-[256px]");
            refBlock.current?.classList.toggle("md:w-64");
        }
    }

    return (
        <>
            {

                <div className="flex w-full">

                    {
                        props.cargando && <div className="fixed z-[500] w-screen h-screen">
                            <div className=" w-screen h-screen bg-gray-900"></div>
                            <div className=" w-full h-full absolute left-0 top-0 text-white flex justify-center items-center flex-col">
                                <img src={images.logo} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                                <div style={{ "borderTopColor": "transparent" }}
                                    className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                                </div>
                                <h1 className='m-3 text-center'>Cargando información, espere por favor...</h1>
                            </div>
                        </div>}

                    {/* Navbar */}
                    <Nav refBlock={refBlock} onEventMenu={onEventMenu} />
                    {/*  */}

                    {/* Aside */}
                    <Aside informacion={props.informacion} pathname={location.pathname} refAside={refAside} refOverlay={refOverlay} onEventOverlay={onEventOverlay} />
                    {/*  */}

                    {/*  */}
                    <div
                        ref={refMain}
                        className={css.DivMain}>
                        <div className="w-full p-4 font-mont overflow-hidden">
                            {/*INICIO NAVEGACION */}
                            <div className="content-wrapper flex-wrap">

                                <Outlet />

                            </div>
                            {/* FIN NAVEGACION  */}
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                    <Toaster />
                </div>
            }


        </>
    );
}

export default Contenido;
