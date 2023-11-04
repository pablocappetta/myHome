export const mockedReservations = [
    {
        id: 1,
        type: "Departamento",
        publishedDate: "01/03/21",
        listingType: "Alquiler",
        price: 120000,
        currency: "ARS",
        location: "Lanús, Buenos Aires",
        image:
            "https://images.unsplash.com/photo-1605283176568-9b41fde3672e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
        expirationDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString('es-AR'), // add expiration date with random future date
        reservationAmount: 60000,
    },
    {
        id: 2,
        type: "Casa",
        publishedDate: "01/03/21",
        listingType: "Alquiler",
        price: 88000,
        currency: "USD",
        location: "Avellaneda, Buenos Aires",
        image:
            "https://images.unsplash.com/photo-1568295123886-8d09a5986b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
        expirationDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString('es-AR'), // add expiration date with random future date
        reservationAmount: 44000,
    },
    {
        id: 3,
        type: "Departamento",
        publishedDate: "01/03/21",
        listingType: "Alquiler",
        price: 65000,
        currency: "USD",
        location: "Lomas de Zamora, Buenos Aires",
        image:
            "https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
        expirationDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString('es-AR'), // add expiration date with random future date
        reservationAmount: 32500,
    },
    {
        id: 4,
        type: "Departamento",
        publishedDate: "01/03/21",
        listingType: "Alquiler",
        price: 240000,
        currency: "ARS",
        location: "Palermo Soho, Buenos Aires",
        image:
            "https://images.unsplash.com/photo-1525438160292-a4a860951216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
        expirationDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString('es-AR'), // add expiration date with random future date
        reservationAmount: 120000,
    },
];
