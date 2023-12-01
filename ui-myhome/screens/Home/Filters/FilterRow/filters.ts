export type FilterOption = {
    label: string;
    filterValue: string;
    value: string;
    selected: boolean;
};

export type DisplayFilter = {
    title: string;
    value: string;
    options: FilterOption[];
    isSlider: boolean;
    isMultiselect: boolean;
};

export const filters: DisplayFilter[] = [
    {
        title: "Operacion",
        value: "type",
        options: [
            { label: "Venta", filterValue:"type", value: "venta", selected: false },
            { label: "Alquiler", filterValue:"type", value: "alquiler", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title: "Categoria",
        value: "property.type",
        options: [
            { label: "Casa", filterValue:"property.type", value: "casa", selected: false },
            { label: "Departamento", filterValue:"property.type", value: "departamento", selected: false },
            { label: "Oficina", filterValue:"property.type", value: "oficina", selected: false },
            { label: "Local", filterValue:"property.type", value: "local", selected: false },
            { label: "Terreno", filterValue:"property.type", value: "terreno", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title: "Precio",
        value: "price.currency",
        options: [
            { label: "USD", filterValue:"price.currency", value: "usd", selected: false },
            { label: "Pesos", filterValue:"price.currency", value: "pesos", selected: false }
        ],
        isSlider: true,
        isMultiselect: false
    },
    {
        title: "Amenities",
        value: "property.amenities",
        options: [
            { label: "Pileta", filterValue:"property.amenities",  value: "pileta", selected: false },
            { label: "Gimnasio", filterValue:"property.amenities",  value: "gimnasio", selected: false },
            { label: "SUM", filterValue:"property.amenities",  value: "sum", selected: false },
            { label: "Seguridad", filterValue:"property.amenities",  value: "seguridad", selected: false },
            { label: "Cochera", filterValue:"property.amenities",  value: "cochera", selected: false },
            { label: "Balcón", filterValue:"property.amenities",  value: "balcon", selected: false },
            { label: "Terraza", filterValue:"property.amenities",  value: "terraza", selected: false }
        ],
        isSlider: false,
        isMultiselect: true
    },
    {
        title: "Cantidad de Ambientes",
        value: "ambientes",
        options: [
            { label: "1", filterValue:"ambientes", value: "1", selected: false },
            { label: "2", filterValue:"ambientes", value: "2", selected: false },
            { label: "3", filterValue:"ambientes", value: "3", selected: false },
            { label: "4+", filterValue:"ambientes", value: "4+", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title: "Cantidad de Habitaciones",
        value: "property.rooms",
        options: [
            { label: "1", filterValue:"property.rooms", value: "1", selected: false },
            { label: "2", filterValue:"property.rooms", value: "2", selected: false },
            { label: "3", filterValue:"property.rooms", value: "3", selected: false },
            { label: "4+", filterValue:"property.rooms", value: "4+", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title: "Cantidad de Baños",
        value: "property.bathrooms",
        options: [
            { label: "1", filterValue:"property.bathrooms", value: "1", selected: false },
            { label: "2", filterValue:"property.bathrooms", value: "2", selected: false },
            { label: "3", filterValue:"property.bathrooms", value: "3", selected: false },
            { label: "4+", filterValue:"property.bathrooms", value: "4+", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title: "Antigüedad",
        value: "property.age",
        options: [
            { label: "1-5", filterValue:"property.age", value: "1-5", selected: false },
            { label: "5-10", filterValue:"property.age", value: "5-10", selected: false },
            { label: "10+", filterValue:"property.age", value: "10+", selected: false }
        ],
        isSlider: false,
        isMultiselect: false
    },
    {
        title:"Localidad",
        value: "localidad",
        options: [
            { label: "Avellaneda", filterValue:"localidad", value: "avellaneda", selected: false },
            { label: "Lanus", filterValue:"localidad", value: "lanus", selected: false },
            { label: "Lomas de Zamora", filterValue:"localidad", value: "lomas de zamora", selected: false },
            { label: "Palermo Soho", filterValue:"localidad", value: "palermo soho", selected: false },
            { label: "Chascomus", filterValue:"localidad", value: "chascomus", selected: false },
            { label: "Bariloche", filterValue:"localidad", value: "bariloche", selected: false }
        ],
        isSlider: false,
        isMultiselect: true
    }
];
