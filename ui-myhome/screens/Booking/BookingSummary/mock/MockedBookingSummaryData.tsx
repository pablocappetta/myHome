import { BookingSummaryProps } from "../BookingSummary";

export const MockBookingSummary: Partial<BookingSummaryProps> = {
    propertyProps: {
        property: {
            propertyName: 'Departamento en Palermo',
            propertyAddress: 'Av. Santa Fe 1234',
            propertyPrice: 1000,
            propertyCurrency: 'ARS',
            frequency: 'Mensual',
            propertyImage: 'https://www.infobae.com/new-resizer/4M6Xh7jZ6h3zZ7XmXm6FwQ1LJ9o=/1200x900/filters:format(jpg):quality(85)//arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/7QY6XQ5YVZG5JN2XV3G6J4P5YI.jpg',
        },
        paymentInfo: {
            cardType: 'visa',
            last4Digits: 1234,
        },
        priceInfo: {
            total: 1000,
            tax: 100,
            subtotal: 900,
        },
    }

};