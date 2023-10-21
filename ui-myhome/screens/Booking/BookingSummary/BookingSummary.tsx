import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button, IconButton, Appbar } from 'react-native-paper';
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
const bookingTitle = 'Resumen de la reserva';


export const BookingSummary = ({ navigation, propertyProps = {
    property: {
        propertyName: 'Default Property Name',
        propertyAddress: 'Default Property Address',
        propertyPrice: 0,
        propertyCurrency: 'USD',
        frequency: 'per night',
        propertyImage: 'https://via.placeholder.com/200x200.png?text=No+Image',
    },
    paymentInfo: {
        cardType: 'Default Card Type',
        last4Digits: 1234,
    },
    priceInfo: {
        total: 0,
        tax: 0,
        subtotal: 0,
    },
} }: BookingSummaryProps) => {
    const bookingSummaryData: Partial<BookingSummaryProps> = MockBookingSummary;
    return (
        <View style={styles.container}>
            <Appbar.Header elevated={true}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={bookingTitle} />
            </Appbar.Header>
            <ScrollView style={styles.summaryContainer}>
                <View style={styles.body}>
                    <View style={styles.section}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: propertyProps.property.propertyImage,
                            }}
                        />
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            {propertyProps.property.propertyName}
                        </Text>
                        <Text variant="bodySmall" style={{ marginTop: 6 }}>
                            {propertyProps.property.propertyAddress}
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                            {propertyProps.property.propertyPrice} {propertyProps.property.propertyCurrency} {propertyProps.property.frequency}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            Precio
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                            ${propertyProps.priceInfo.subtotal}
                        </Text>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            Impuestos
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                            ${propertyProps.priceInfo.tax}
                        </Text>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            Total
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                            ${propertyProps.priceInfo.total}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text variant="titleMedium" style={{ marginTop: 6 }}>
                            Método de pago
                        </Text>
                        <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                            {propertyProps.paymentInfo.cardType} **** **** **** {propertyProps.paymentInfo.last4Digits}
                        </Text>
                        <Button
                            onPress={() => navigation.navigate("Review")}
                            accessibilityLabel="Cambiar el método de pago"
                            mode="text"
                        >
                            Cambiar
                        </Button>
                    </View>
                    <View style={styles.bottomButton}>
                        <Button
                            onPress={() => navigation.navigate("Review")}
                            accessibilityLabel="Confirmar la reserva"
                            mode="contained"
                        >
                            Confirmar
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    summaryContainer: {
        padding: 20,
        marginBottom: 20,
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