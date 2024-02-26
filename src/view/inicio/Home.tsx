import Card from "../../component/pages/cards/CardDash"

//import CardLink from "@/component/pages/cards/Card"

import { Vida, Matricula } from '../../component/Iconos';
import { RootState } from "@/store/configureStore.store";
import { useSelector } from "react-redux";
import { TipUser } from "@/model/enum/types.model.enum";




const HomeEstudiante = () => {
    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    return (
        <>
            {
                tipoUsuario == TipUser.EST ?
                    (
                        <>
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-wrap">
                                    <div className="w-full sm:w-1/2 p-4">
                                        <Card
                                            imagen={<Matricula />}
                                            titulo={'Matrícula'}
                                            subTitulo={'Realiza tu matrícula.'}
                                            color={'green'}
                                            to={'/inicio/matricula-interna'}
                                            info={''}
                                        />

                                    </div>
                                    <div className="w-full sm:w-1/2 p-4">
                                        <Card
                                            imagen={<Vida />}
                                            titulo={'Vida académica'}
                                            subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                                            color={'yellow'}
                                            to={'/inicio/vida-academica'}
                                            info={''}
                                        />
                                    </div>

                                    {/* <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                        <Card
                                            imagen={<Libro />}
                                            titulo={''}
                                            color={'blue'}
                                            to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                                            info={''}
                                        />
                                    </div> */}

                                </div>

                                {/* <div className="flex justify-center mt-16 p-1">
                                    <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                        <CardLink
                                            imagen={<Libro />}
                                            titulo={'Manual de matrícula'}
                                            color={'blue'}
                                            to={'https://upla.edu.pe/nw/2023/NewFolder/CRONOGRAMA%20IDIOMAS.pdf?_t=1702403729'}
                                            info={''}
                                        />
                                    </div>
                                </div> */}

                            </div></>
                    ) : (
                        <></>
                    )
            }


        </>


    );
};

export default HomeEstudiante;