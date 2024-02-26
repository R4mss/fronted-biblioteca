type Data = {
    id: string,
    nombre: string,
    nota1: string,
    nota2: string,
    nota3: string,
    notaExamen: string,
}

type Props = {
    data: Data
}

const IndividualData = (props: Props) => {
    return(
        <>
            <th>{props.data.id}</th>
            <th>{props.data.nombre}</th>
            <th>{props.data.nota1}</th>
            <th>{props.data.nota2}</th>
            <th>{props.data.nota3}</th>
            <th>{props.data.notaExamen}</th>
        </>
    )
}
export default IndividualData