import { BibliotecaItem } from "@/model/interfaces/biblioteca/bibliotecaItem"
import { FiltrosBiblioteca } from "@/model/interfaces/biblioteca/filtros"

export const ubicacionBiblioteca = [
    { id: 0, descripcion: 'Todas las bibliotecas' },
    { id: 1, descripcion: 'Biblioteca Central' },
    { id: 2, descripcion: 'Ciencias Administrativas y Contables' },
    { id: 3, descripcion: 'Ciencias de la Salud' },
    { id: 4, descripcion: 'Derecho y Ciencias Políticas' },
    { id: 5, descripcion: 'Ingeniería' },
    { id: 6, descripcion: 'Medicina' },
]

export const filtroTipo = [
    { id: 0, descripcion: 'Todos los campos' },
    { id: 1, descripcion: 'Autor' },
    { id: 2, descripcion: 'Título' },
    { id: 3, descripcion: 'Tema' },
    { id: 4, descripcion: 'Asignatura' },
    { id: 5, descripcion: 'Código' },
    { id: 6, descripcion: 'Serie' },
    { id: 7, descripcion: 'ISBN' },
]

export const formatoTipo = [
    { id: 0, descripcion: 'Todos los campos' },
    { id: 1, descripcion: 'Autor' },
    { id: 2, descripcion: 'Título' },
    { id: 3, descripcion: 'Tema' },
    { id: 4, descripcion: 'Asignatura' },
    { id: 5, descripcion: 'Código' },
    { id: 6, descripcion: 'Serie' },
    { id: 7, descripcion: 'ISBN' },
]


export const filtrosBiblioteca: FiltrosBiblioteca[] = [
    {
        id: 1,
        estado: false,
        descripcion: 'Ubicación / Colección',
        contenido: []
    },
    {
        id: 2,
        estado: true,
        descripcion: 'Tipo de material',
        contenido: [
            {
                id: 1,
                descripcion: 'Libro'
            },
            {
                id: 2,
                descripcion: 'Artículo'
            },
            {
                id: 3,
                descripcion: 'Folio'
            },
            {
                id: 4,
                descripcion: 'Folleto'
            },
            {
                id: 5,
                descripcion: 'Revista'
            },
            {
                id: 6,
                descripcion: 'Tesis'
            },

        ]
    },
    {
        id: 3,
        estado: true,
        descripcion: 'Formato',
        contenido: [
            {
                id: 7,
                descripcion: 'Libro o similar'
            },
            {
                id: 8,
                descripcion: 'Manuscrito'
            },
            {
                id: 9,
                descripcion: 'Publicación periódica'
            },
            {
                id: 10,
                descripcion: 'Recurso electrónico'
            },
        ]
    },
    {
        id: 4,
        estado: true,
        descripcion: 'Autor',
        contenido: [
            {
                id: 11,
                descripcion: 'Autor 1'
            },
            {
                id: 12,
                descripcion: 'Autor 2'
            },
            {
                id: 13,
                descripcion: 'Autor 3'
            },
            {
                id: 14,
                descripcion: 'Autor 4'
            },
            {
                id: 15,
                descripcion: 'Autor 5'
            },
            {
                id: 16,
                descripcion: 'Autor 6'
            },
        ]
    },
    {
        id: 5,
        estado: true,
        descripcion: 'Tema',
        contenido: [
            {
                id: 17,
                descripcion: 'Medicina'
            },
            {
                id: 18,
                descripcion: 'Geografía'
            },
            {
                id: 19,
                descripcion: 'Física'
            },
            {
                id: 20,
                descripcion: 'Química'
            },
            {
                id: 21,
                descripcion: 'Ciencia'
            },
            {
                id: 22,
                descripcion: 'Filosofía'
            },
        ]
    },
    {
        id: 6,
        estado: true,
        descripcion: 'Idioma',
        contenido: [
            {
                id: 23,
                descripcion: 'Español'
            },
            {
                id: 24,
                descripcion: 'Inglés'
            },
            {
                id: 25,
                descripcion: 'Francés'
            },
            {
                id: 26,
                descripcion: 'Portugués'
            },
            {
                id: 27,
                descripcion: 'Alemán'
            }
        ]
    }
]


export const bibliotecaItems: BibliotecaItem[] = [
    {
        titulo: "Introducción a la Economía",
        autor: "John Doe",
        editorial: "Editorial Universitaria",
        tipoMaterial: "Libro",
        fecha: "2023",
        format: "Impreso",
        disponibilidad: 5,
        ubicacion: "Biblioteca Central",
        idioma: "Español",
        imageUrl: ""
    },
    {
        titulo: "Introduction to Economics",
        autor: "Jane Smith",
        editorial: "University Press",
        tipoMaterial: "Book",
        fecha: "2022",
        format: "Print",
        disponibilidad: 10,
        ubicacion: "Engineering Library",
        idioma: "Inglés",
        imageUrl: "https://example.com/image2.jpg"
    },
    {
        titulo: "História da Educação",
        autor: "Fernando Oliveira",
        editorial: "Editora Universitária",
        tipoMaterial: "Livro",
        fecha: "2021",
        format: "Impresso",
        disponibilidad: 3,
        ubicacion: "Biblioteca de Ciencias Humanas",
        idioma: "Portugués",
        imageUrl: "https://example.com/image3.jpg"
    },
    // Agrega más elementos similares aquí
];
