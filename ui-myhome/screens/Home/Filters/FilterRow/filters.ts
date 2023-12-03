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
    type: string;
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
        isMultiselect: false,
        type: 'default'
    },
    {
        title: "Categoria",
        value: "property.type",
        options: [
            { label: "Casa", filterValue:"property.type", value: "Casa", selected: false },
            { label: "Departamento", filterValue:"property.type", value: "Departamento", selected: false },
            { label: "Oficina", filterValue:"property.type", value: "Oficina", selected: false },
            { label: "Local", filterValue:"property.type", value: "Local", selected: false },
            { label: "Terreno", filterValue:"property.type", value: "Terreno", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    },
    {
        title: "Precio",
        value: "price.currency",
        options: [
            { label: "USD", filterValue:"price.currency", value: "USD", selected: false },
            { label: "Pesos", filterValue:"price.currency", value: "ARS", selected: false }
        ],
        isSlider: true,
        isMultiselect: false,
        type: 'default'
    },
    {
        title: "Rango de precio",
        value: "price.value",
        options: [
            { label: "Minimo", filterValue:"price.value", value: "0", selected: false },
            { label: "Maximo", filterValue:"price.value", value: "100000000", selected: false}
        ],
        isSlider: false,
        isMultiselect: false,
        type: 'rangeInput'
    },
    {
        title: "Amenities",
        value: "property.amenities",
        options: [
            { label: "Pileta", filterValue:"property.hasPool",  value: "Pileta", selected: false },
            { label: "Gimnasio", filterValue:"property.hasGym",  value: "Gimnasio", selected: false },
            { label: "SUM", filterValue:"property.hasSUM",  value: "SUM", selected: false },
            { label: "Seguridad", filterValue:"property.hasSecurity",  value: "Seguridad", selected: false },
            { label: "Cochera", filterValue:"property.has",  value: "Cochera", selected: false },
            { label: "Balcón", filterValue:"property.hasBalcony",  value: "Balcon", selected: false },
            { label: "Terraza", filterValue:"property.hasTerrace",  value: "Terraza", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
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
        isMultiselect: false,
        type: 'range'
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
        isMultiselect: false,
        type: 'range'
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
        isMultiselect: false,
        type: 'range'
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
        isMultiselect: false,
        type: 'range'
    },
    {
        title:"Localidad",
        value: "property.address.neighborhood",
        options: [
            { label: "Avellaneda", filterValue:"property.address.neighborhood", value: "Avellaneda", selected: false },
            { label: "Lanus", filterValue:"property.address.neighborhood", value: "Lanus", selected: false },
            { label: "Lomas de Zamora", filterValue:"property.address.neighborhood", value: "Lomas de Zamora", selected: false },
            { label: "Palermo", filterValue:"property.address.neighborhood", value: "Palermo", selected: false },
            { label: "Chascomus", filterValue:"property.address.neighborhood", value: "Chascomus", selected: false },
            { label: "Bariloche", filterValue:"property.address.neighborhood", value: "Bariloche", selected: false },
            { label: "Cordoba", filterValue:"property.address.neighborhood", value: "Cordoba", selected: false },
            { label: "Rosario", filterValue:"property.address.neighborhood", value: "Rosario", selected: false },
            { label: "Mendoza", filterValue:"property.address.neighborhood", value: "Mendoza", selected: false },
            { label: "Mar del Plata", filterValue:"property.address.neighborhood", value: "Mar del Plata", selected: false },
            { label: "Tigre", filterValue:"property.address.neighborhood", value: "Tigre", selected: false },
            { label: "San Isidro", filterValue:"property.address.neighborhood", value: "San Isidro", selected: false },
            { label: "San Miguel", filterValue:"property.address.neighborhood", value: "San Miguel", selected: false },
            { label: "San Martin", filterValue:"property.address.neighborhood", value: "San Martin", selected: false },
            { label: "San Fernando", filterValue:"property.address.neighborhood", value: "San Fernando", selected: false },
            { label: "San Telmo", filterValue:"property.address.neighborhood", value: "San Telmo", selected: false },
            { label: "San Cristobal", filterValue:"property.address.neighborhood", value: "San Cristobal", selected: false },
            { label: "San Justo", filterValue:"property.address.neighborhood", value: "San Justo", selected: false },
            { label: "San Bernardo", filterValue:"property.address.neighborhood", value: "San Bernardo", selected: false },
            { label: "San Carlos de Bariloche", filterValue:"property.address.neighborhood", value: "San Carlos de Bariloche", selected: false },
            { label: "San Rafael", filterValue:"property.address.neighborhood", value: "San Rafael", selected: false },
            { label: "Recoleta", filterValue:"property.address.neighborhood", value: "Recoleta", selected: false },
            { label: "Retiro", filterValue:"property.address.neighborhood", value: "Retiro", selected: false },
            { label: "Villa Crespo", filterValue:"property.address.neighborhood", value: "Villa Crespo", selected: false },
            { label: "Villa Urquiza", filterValue:"property.address.neighborhood", value: "Villa Urquiza", selected: false },
            { label: "Villa Devoto", filterValue:"property.address.neighborhood", value: "Villa Devoto", selected: false },
            { label: "Villa del Parque", filterValue:"property.address.neighborhood", value: "Villa del Parque", selected: false },
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    }
];
