export type FilterOption = {
    label: string;
    filterValue: string;
    value: string;
    selected: boolean;
    subset?: {
        key: string;
        value: string;
    };
};

export type DisplayFilter = {
    title: string;
    value: string;
    options: FilterOption[];
    isSlider: boolean;
    isMultiselect: boolean;
    type: string;
    parent?: string;
};

export const filters: DisplayFilter[] = [
    {
        title: "Operacion",
        value: "type",
        options: [
            { label: "Venta", filterValue: "type", value: "venta", selected: false },
            { label: "Alquiler", filterValue: "type", value: "alquiler", selected: false }
        ],
        isSlider: false,
        isMultiselect: false,
        type: 'default'
    },
    {
        title: "Categoria",
        value: "property.type",
        options: [
            { label: "Casa", filterValue: "property.type", value: "Casa", selected: false },
            { label: "Departamento", filterValue: "property.type", value: "Departamento", selected: false },
            { label: "Oficina", filterValue: "property.type", value: "Oficina", selected: false },
            { label: "Local", filterValue: "property.type", value: "Local", selected: false },
            { label: "Terreno", filterValue: "property.type", value: "Terreno", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    },
    {
        title: "Moneda",
        value: "price.currency",
        options: [
            { label: "USD", filterValue: "price.currency", value: "USD", selected: false },
            { label: "Pesos", filterValue: "price.currency", value: "ARS", selected: false }
        ],
        isSlider: true,
        isMultiselect: false,
        type: 'default'
    },
    {
        title: "Rango de precio",
        value: "price.amount",
        options: [
            { label: "Minimo", filterValue: "price.value", value: "0", selected: false },
            { label: "Maximo", filterValue: "price.value", value: "100000000", selected: false }
        ],
        isSlider: false,
        isMultiselect: false,
        type: 'rangeInput'
    },
    {
        title: "Amenities",
        value: "property.amenities",
        options: [
            { label: "Pileta", filterValue: "property.hasPool", value: "Pileta", selected: false },
            { label: "Gimnasio", filterValue: "property.hasGym", value: "Gimnasio", selected: false },
            { label: "SUM", filterValue: "property.hasSUM", value: "SUM", selected: false },
            { label: "Seguridad", filterValue: "property.hasSecurity", value: "Seguridad", selected: false },
            { label: "Cochera", filterValue: "property.has", value: "Cochera", selected: false },
            { label: "Balcón", filterValue: "property.hasBalcony", value: "Balcon", selected: false },
            { label: "Terraza", filterValue: "property.hasTerrace", value: "Terraza", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    },
    // {
    //     title: "Cantidad de Ambientes",
    //     value: "property.ambientes",
    //     options: [
    //         { label: "1", filterValue:"ambientes", value: "1", selected: false },
    //         { label: "2", filterValue:"ambientes", value: "2", selected: false },
    //         { label: "3", filterValue:"ambientes", value: "3", selected: false },
    //         { label: "4+", filterValue:"ambientes", value: "4+", selected: false }
    //     ],
    //     isSlider: false,
    //     isMultiselect: true,
    //     type: 'range'
    // },
    {
        title: "Cantidad de Habitaciones",
        value: "property.rooms",
        options: [
            { label: "1", filterValue: "property.rooms", value: "1", selected: false },
            { label: "2", filterValue: "property.rooms", value: "2", selected: false },
            { label: "3", filterValue: "property.rooms", value: "3", selected: false },
            { label: "4+", filterValue: "property.rooms", value: "4+", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'range'
    },
    {
        title: "Cantidad de Baños",
        value: "property.bathrooms",
        options: [
            { label: "1", filterValue: "property.bathrooms", value: "1", selected: false },
            { label: "2", filterValue: "property.bathrooms", value: "2", selected: false },
            { label: "3", filterValue: "property.bathrooms", value: "3", selected: false },
            { label: "4+", filterValue: "property.bathrooms", value: "4+", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'range'
    },
    {
        title: "Antigüedad",
        value: "property.age",
        options: [
            { label: "1-5", filterValue: "property.age", value: "1-5", selected: false },
            { label: "5-10", filterValue: "property.age", value: "5-10", selected: false },
            { label: "10+", filterValue: "property.age", value: "10+", selected: false }
        ],
        isSlider: false,
        isMultiselect: false,
        type: 'range'
    },
    {
        title: "Provincia",
        value: "property.address.state",
        options: [
            { label: "Buenos Aires", filterValue: "property.address.state", value: "Buenos Aires", selected: false },
            { label: "Capital Federal", filterValue: "property.address.state", value: "Capital Federal", selected: false },
            { label: "Catamarca", filterValue: "property.address.state", value: "Catamarca", selected: false },
            { label: "Chaco", filterValue: "property.address.state", value: "Chaco", selected: false },
            { label: "Chubut", filterValue: "property.address.state", value: "Chubut", selected: false },
            { label: "Córdoba", filterValue: "property.address.state", value: "Córdoba", selected: false },
            { label: "Corrientes", filterValue: "property.address.state", value: "Corrientes", selected: false },
            { label: "Entre Ríos", filterValue: "property.address.state", value: "Entre Ríos", selected: false },
            { label: "Formosa", filterValue: "property.address.state", value: "Formosa", selected: false },
            { label: "Jujuy", filterValue: "property.address.state", value: "Jujuy", selected: false },
            { label: "La Pampa", filterValue: "property.address.state", value: "La Pampa", selected: false },
            { label: "La Rioja", filterValue: "property.address.state", value: "La Rioja", selected: false },
            { label: "Mendoza", filterValue: "property.address.state", value: "Mendoza", selected: false },
            { label: "Misiones", filterValue: "property.address.state", value: "Misiones", selected: false },
            { label: "Neuquén", filterValue: "property.address.state", value: "Neuquén", selected: false },
            { label: "Río Negro", filterValue: "property.address.state", value: "Río Negro", selected: false },
            { label: "Salta", filterValue: "property.address.state", value: "Salta", selected: false },
            { label: "San Juan", filterValue: "property.address.state", value: "San Juan", selected: false },
            { label: "San Luis", filterValue: "property.address.state", value: "San Luis", selected: false },
            { label: "Santa Cruz", filterValue: "property.address.state", value: "Santa Cruz", selected: false },
            { label: "Santa Fe", filterValue: "property.address.state", value: "Santa Fe", selected: false },
            { label: "Santiago del Estero", filterValue: "property.address.state", value: "Santiago del Estero", selected: false },
            { label: "Tierra del Fuego", filterValue: "property.address.state", value: "Tierra del Fuego", selected: false },
            { label: "Tucumán", filterValue: "property.address.state", value: "Tucumán", selected: false }
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    },
    {
        title: "Localidad",
        value: "property.address.city",
        parent: "property.address.state",
        options: [
            { label: "Córdoba", filterValue: "property.address.city", value: "Córdoba", selected: false, subset: { key: "property.address.state", value: "Córdoba" } },
            { label: "Rosario", filterValue: "property.address.city", value: "Rosario", selected: false, subset: { key: "property.address.state", value: "Santa Fe" } },
            { label: "Mendoza", filterValue: "property.address.city", value: "Mendoza", selected: false, subset: { key: "property.address.state", value: "Mendoza" } },
            { label: "Salta", filterValue: "property.address.city", value: "Salta", selected: false, subset: { key: "property.address.state", value: "Salta" } },
            { label: "Tucumán", filterValue: "property.address.city", value: "Tucumán", selected: false, subset: { key: "property.address.state", value: "Tucumán" } },
            { label: "Mar del Plata", filterValue: "property.address.city", value: "Mar del Plata", selected: false, subset: { key: "property.address.state", value: "Buenos Aires" } },
            { label: "La Plata", filterValue: "property.address.city", value: "La Plata", selected: false, subset: { key: "property.address.state", value: "Buenos Aires" } },
            { label: "San Miguel de Tucumán", filterValue: "property.address.city", value: "San Miguel de Tucumán", selected: false, subset: { key: "property.address.state", value: "Tucumán" } },
            { label: "Ciudad Autónoma de Buenos Aires", filterValue: "property.address.city", value: "Ciudad Autónoma de Buenos Aires", selected: false, subset: { key: "property.address.state", value: "Capital Federal" } },
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    },
    {
        title: "Barrio",
        value: "property.address.neighborhood",
        parent: "property.address.city",
        options: [
            { label: "Avellaneda", filterValue: "property.address.neighborhood", value: "Avellaneda", selected: false, subset: { key: "property.address.city", value: "Avellaneda" } },
            { label: "Bariloche", filterValue: "property.address.neighborhood", value: "Bariloche", selected: false, subset: { key: "property.address.city", value: "San Carlos de Bariloche" } },
            { label: "Chascomus", filterValue: "property.address.neighborhood", value: "Chascomus", selected: false, subset: { key: "property.address.city", value: "Chascomus" } },
            { label: "Lanus", filterValue: "property.address.neighborhood", value: "Lanus", selected: false, subset: { key: "property.address.city", value: "Lanus" } },
            { label: "Lomas de Zamora", filterValue: "property.address.neighborhood", value: "Lomas de Zamora", selected: false, subset: { key: "property.address.city", value: "Lomas de Zamora" } },
            { label: "Palermo", filterValue: "property.address.neighborhood", value: "Palermo", selected: false, subset: { key: "property.address.city", value: "Ciudad Autónoma de Buenos Aires" } },
            { label: "Recoleta", filterValue: "property.address.neighborhood", value: "Recoleta", selected: false, subset: { key: "property.address.city", value: "Ciudad Autónoma de Buenos Aires" } },
        ],
        isSlider: false,
        isMultiselect: true,
        type: 'default'
    }
];
