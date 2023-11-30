export type Property = {
    address: {
        state: string;
        city: string;
        neighborhood: string;
        zipCode: string;
        street: string;
        number: number;
        floor: number | null;
        apartment: string;
    };
    geoLocation: {
        type: string;
        coordinates: [number, number];
    };
    sqm: {
        covered: number | null;
        uncovered: number | null;
    };
    expensesPrice: {
        amount: number | null;
        currency: string;
    };
    age: number | null;
    type: string;
    cardinalOrientation: string;
    relativeOrientation: string;
    rooms: number | null;
    bathrooms: number | null;
    hasTerrace: boolean;
    hasBalcony: boolean;
    hasStorageUnit: boolean;
    hasGarden: boolean;
    amenities: string[];
    photos: string[];
    video: string;
    price: {
        amount: number;
        currency: string;
    };
    _id: string;
    title: string;
    description: string;
    realtorId: string;
    creationDate: string;
};

export interface Filter {
    key: string;
    title: string;
    values: string[];
}


/**
 * Flattens the property object to a one-dimensional object.
 * 
 * @param property - The property object to flatten.
 * @returns The flattened one-dimensional object.
 */
function flattenProperty(property: Property): Record<string, any> {
    const flattenedProperty: Record<string, any> = {};

    for (const key in property) {
        if (typeof property[key] === 'object' && property[key] !== null) {
            const nestedObject = property[key];
            for (const nestedKey in nestedObject) {
                flattenedProperty[`${key}.${nestedKey}`] = nestedObject[nestedKey];
            }
        } else {
            flattenedProperty[key] = property[key];
        }
    }

    return flattenedProperty;
}

/**
 * Filters an array of properties based on the provided filters.
 * 
 * @param properties - The array of properties to filter.
 * @param filters - The filters to apply to the properties.
 * @param isAndFilter - A boolean indicating whether to apply an AND filter (true) or an OR filter (false).
 * @returns The filtered array of properties.
 */
export function filterProperties(properties: Property[], filters: Filter[], isAndFilter: boolean = false): Property[] {
    return properties?.filter(property => {
        const flattenedProperty = flattenProperty(property);
        if (isAndFilter) {
            for (const filter of filters) {
                if (!filter.values.includes(flattenedProperty[filter.key])) {
                    return false;
                }
            }
            return true;
        } else {
            for (const filter of filters) {
                if (filter.values.includes(flattenedProperty[filter.key])) {
                    return true;
                }
            }
            return false;
        }
    });
}
