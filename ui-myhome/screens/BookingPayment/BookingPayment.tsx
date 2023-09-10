// Create a screen where the user will be able to select it's payment method
// //create a react native screen that will show a list of payment methods
// the payment methods will have an icon a text description and a radio button to select it
// // component should use the material paper components for the inputs
// only one payment method can be selected at a time

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

export const BookingPayment = ({ navigation }) => {
    const [checked, setChecked] = React.useState('first');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon={'arrow-left'}
                    onPress={() => navigation.goBack()}
                />
                <Text variant='titleMedium'>Reservar Departamento</Text>
            </View>

            <View style={styles.body}>

                <Text variant="titleLarge" style={{ marginTop: 6 }}>
                    Elegí tu método de pago
                </Text>
                <View style={styles.section}>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Button icon="credit-card-outline">
                        </Button>
                        <Text variant='bodyLarge' style={{ marginLeft: 6 }}>Tarjeta de crédito</Text>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        {/* TODO: change to correct icon */}

                        <Button icon="credit-card-outline">
                        </Button>
                        <Text variant='bodyLarge' style={{ marginLeft: 6 }}>Mercado Pago</Text>
                    </View>
                    <RadioButton

                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                </View>
                <View style={styles.section}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        {/* TODO: change to correct icon */}

                        <Button icon="credit-card-outline">
                        </Button>
                        <Text variant='bodyLarge' style={{ marginLeft: 6 }}>PayPal</Text>
                    </View>
                    <RadioButton
                        value="third"
                        status={checked === 'third' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('third')}
                    />
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        onPress={() => navigation.navigate('BookingSummary')}
                        accessibilityLabel="Continuar a la siguiente pantalla para confirmar la reserva"
                        mode="contained"
                    >
                        Continuar
                    </Button>
                </View>
            </View>
        </View>
    );
};

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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        flex: 1,
        justifyContent: 'space-between',
    },
    bottomButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
});

export default BookingPayment;