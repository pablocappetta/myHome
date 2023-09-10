//create a react native screen tha will show three inputs for the user to enter their name, email and phone number
// component should use the material paper components for the inputs\
//

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';

export const BookingInfo = ({ navigation }) => {
    const [name, onChangeName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [phone, onChangePhone] = React.useState("");

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
                    Ingresá tus datos
                </Text>
                <View style={styles.section}>
                    <TextInput
                        label="Nombre"
                        value={name}
                        onChangeText={text => onChangeName(text)}
                        mode="outlined"
                    />
                </View>
                <View style={styles.section}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => onChangeEmail(text)}
                        mode="outlined"
                    />
                </View>
                <View style={styles.section}>
                    <TextInput
                        label="Teléfono"
                        value={phone}
                        onChangeText={text => onChangePhone(text)}
                        mode="outlined"
                    />
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        onPress={() => navigation.navigate('BookingPayment')}
                        accessibilityLabel="Continuar a la siguiente pantalla para elegir el medio de pago"
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
        marginTop: 20,
    },
    bottomButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
});

export default BookingInfo;
