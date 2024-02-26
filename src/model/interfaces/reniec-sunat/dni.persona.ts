export default interface DniPersona{
    success: boolean,
    data: {
        numero: string,
        nombre_completo: string,
        nombres:string,
        apellido_paterno: string,
        apellido_materno: string,
        sexo: string,
        fecha_nacimiento: string,
        direccion: string,
    }
}
