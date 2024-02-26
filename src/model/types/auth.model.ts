type Auth = {
    cargando: boolean,
    codigo: string,
    token: string | null,
    autenticado: boolean,
    tipoUsuario: string;
}

export default Auth;