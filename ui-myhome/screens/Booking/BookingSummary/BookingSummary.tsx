// create a react native screen that will show the summary of the booking
// the screen should show the following information:
// - the name of the apartment
// - the address of the apartment
// - image of the apartment
// - subtotal of the booking
// - tax of the booking
// - total of the booking
// - last 4 digits of the credit card used
// - type of credit card used
// - frequency of the booking
// - a button to confirm the booking
// the apartment info(name, address, image and frequency) should have a rounded border
// the payment ammount(total, tax and subtotal) should have a rounded border
// the card used should have a rounder border, should show asterisk for the digit except the last 4 and should have a link to the previous page to change the payment method


import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { MockBookingSummary } from './mock/MockedBookingSummaryData';

export interface BookingSummaryProps {
    navigation: any;
    propertyProps: {
        property: {
            propertyName: string;
            propertyAddress: string;
            propertyPrice: number;
            propertyCurrency: string;
            frequency: string;
            propertyImage: string;
        };
        paymentInfo: {
            cardType: string;
            last4Digits: number;
        };
        priceInfo: {
            total: number;
            tax: number;
            subtotal: number;
        };
    }
}

const bookingSummaryData: Partial<BookingSummaryProps> = MockBookingSummary;


export const BookingSummary = ({ navigation }) => {
    const bookingSummaryData: Partial<BookingSummaryProps> = MockBookingSummary;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon={'arrow-left'}
                    onPress={() => navigation.goBack()}
                />
                <Text variant='titleMedium'>Reservar Departamento</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.section}>
                    <Text variant="titleLarge" style={{ marginTop: 6 }}>
                        Resumen de la reserva
                    </Text>
                </View>
                <View style={styles.section}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: bookingSummaryData.propertyProps.property.propertyImage,
                        }}
                    />
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                        {bookingSummaryData.propertyProps.property.propertyName}
                    </Text>
                    <Text variant="bodySmall" style={{ marginTop: 6 }}>
                        {bookingSummaryData.propertyProps.property.propertyAddress}
                    </Text>
                    <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                        {bookingSummaryData.propertyProps.property.propertyPrice} {bookingSummaryData.propertyProps.property.propertyCurrency} {bookingSummaryData.propertyProps.property.frequency}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                        Precio
                    </Text>
                    <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                        ${bookingSummaryData.propertyProps.priceInfo.subtotal}
                    </Text>
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                        Impuestos
                    </Text>
                    <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                        ${bookingSummaryData.propertyProps.priceInfo.tax}
                    </Text>
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                        Total
                    </Text>
                    <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                        ${bookingSummaryData.propertyProps.priceInfo.total}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                        Método de pago
                    </Text>
                    <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                        {bookingSummaryData.propertyProps.paymentInfo.cardType} **** **** **** {bookingSummaryData.propertyProps.paymentInfo.last4Digits}
                    </Text>
                    <Button
                        onPress={() => navigation.navigate('BookingPayment')}
                        accessibilityLabel="Cambiar el método de pago"
                        mode="text"
                    >
                        Cambiar
                    </Button>
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        onPress={() => navigation.navigate('BookingConfirmation')}
                        accessibilityLabel="Confirmar la reserva"
                        mode="contained"
                    >
                        Confirmar
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    body: {
        flex: 1,
        marginTop: 20,
    },
    section: {
        marginTop: 20,
    },
    bottomButton: {
        marginTop: 20,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
    },
});

export default BookingSummary;