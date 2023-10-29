export const filters = [
    {
        title: "Operacion",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "Venta", value: "venta", selected: false },
            { label: "Alquiler", value: "alquiler", selected: false }
        ]
    },
    {
        title: "Categoria",
        options: [
            { label: "Todas", value: "todas", selected: false },
            { label: "Casa", value: "casa", selected: false },
            { label: "Departamento", value: "departamento", selected: false },
            { label: "Oficina", value: "oficina", selected: false },
            { label: "Local", value: "local", selected: false },
            { label: "Terreno", value: "terreno", selected: false }
        ]
    },
    {
        title: "Precio",
        options: [
            { label: "USD", value: "usd", selected: true },
            { label: "Pesos", value: "pesos", selected: true }
        ],
        isSlider: true
    },
    {
        title: "Amenities",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "Pileta", value: "pileta", selected: false },
            { label: "Gimnasio", value: "gimnasio", selected: false },
            { label: "SUM", value: "sum", selected: false },
            { label: "Seguridad", value: "seguridad", selected: false },
            { label: "Cochera", value: "cochera", selected: false },
            { label: "Balcón", value: "balcon", selected: false },
            { label: "Terraza", value: "terraza", selected: false }
        ]
    },
    {
        title: "Cantidad de Ambientes",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "1", value: "1", selected: false },
            { label: "2", value: "2", selected: false },
            { label: "3", value: "3", selected: false },
            { label: "4+", value: "4+", selected: false }
        ]
    },
    {
        title: "Cantidad de Habitaciones",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "1", value: "1", selected: false },
            { label: "2", value: "2", selected: false },
            { label: "3", value: "3", selected: false },
            { label: "4+", value: "4+", selected: false }
        ]
    },
    {
        title: "Cantidad de Baños",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "1", value: "1", selected: false },
            { label: "2", value: "2", selected: false },
            { label: "3", value: "3", selected: false },
            { label: "4+", value: "4+", selected: false }
        ]
    },
    {
        title: "Antigüedad",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "1-5", value: "1-5", selected: false },
            { label: "5-10", value: "5-10", selected: false },
            { label: "10+", value: "10+", selected: false }
        ]
    },
    {
        title:"Localidad",
        options: [
            { label: "Todas", value: "todas", selected: true },
            { label: "Avellaneda", value: "avellaneda", selected: false },
            { label: "Lanus", value: "lanus", selected: false },
            { label: "Lomas de Zamora", value: "lomas de zamora", selected: false },
            { label: "Palermo Soho", value: "palermo soho", selected: false },
            { label: "Chascomus", value: "chascomus", selected: false },
            { label: "Bariloche", value: "bariloche", selected: false }
        ],
        isMutiselect: true
    }
];
