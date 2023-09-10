//create a react native screen that will show a date input that opens a calendar selection 
// also add a time selection component
// component should use the material paper components for the time selection and calendar input 

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

export const BookingDate = ({ navigation }) => {
    const [date, onChangeDate] = React.useState(undefined);
    const [time, onChangeTime] = React.useState("");


    const [showTime, setShowTime] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setShowTime(false)
    }, [setShowTime])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setShowTime(false);
            onChangeTime(`${hours}:${minutes}`);
        },
        [setShowTime]
    );


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
                    Elegí la fecha y hora de tu cita
                </Text>
                <View style={styles.section}>
                    <DatePickerInput
                        locale="es"
                        label="Fecha"
                        value={date}
                        onChange={(d) => onChangeDate(d)}
                        inputMode="start"
                        mode='outlined'
                    />
                </View>
                <View style={styles.section}>

                    <TextInput
                        label="Hora"
                        value={time}
                        onChangeText={text => onChangeTime(text)}
                        mode="outlined"
                        onTouchStart={(event) => {
                            event.preventDefault();
                            setShowTime(true)
                        }
                        }
                        showSoftInputOnFocus={false}
                    />
                    <TimePickerModal
                        visible={showTime}
                        onDismiss={onDismiss}
                        onConfirm={onConfirm}
                        hours={12}
                        minutes={14}
                    />
                </View>
                <View style={styles.bottomButton}>
                    <Button
                        onPress={() => navigation.navigate('BookingInfo')}
                        accessibilityLabel="Continuar a la siguiente pantalla para editar datos de contacto"
                        mode="contained"
                    >
                        Continuar
                    </Button>
                </View>
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 5,
    },

    body: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
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

export default BookingDate;