import React, { useState } from 'react';
import { TextInput, Button, Snackbar, Dialog, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import {
    Appbar,
  } from "react-native-paper";


function SendQuestion({ navigation}) {
    const [question, setQuestion] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleQuestionChange = (text) => {
        setQuestion(text);
    };

    const handleSendQuestion = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    question: question
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDialogVisible(true);
            } else {
                setSnackbarType('error');
                setSnackbarMessage('Error al enviar la consulta. Intente nuevamente');
                setSnackbarVisible(true);
            }
        } catch (error) {
            setSnackbarType('error');
            setSnackbarMessage('Error al enviar la consulta. Intente nuevamente');
            setSnackbarVisible(true);
        }
    };

    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false);
        if (snackbarType === 'success') {
            navigation.goBack();
        }
    };

    const handleDialogDismiss = () => {
        setDialogVisible(false);
        navigation.goBack();
    };

    const sendQuestionTitle = 'Enviar pregunta';

    return (

        <View style={styles.container}>
            <Appbar.Header elevated={true}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={sendQuestionTitle} />
            </Appbar.Header>

            <View style={styles.formContainer}>
            <TextInput
                styles={styles.input}
                mode="outlined"
                label="Mensaje"
                value={question}
                onChangeText={handleQuestionChange}
                multiline={true}
            />
            <Button style={styles.button} mode="contained" onPress={handleSendQuestion}>
                Enviar Consulta
            </Button>
            </View>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={handleSnackbarDismiss}
                duration={3000}
                action={{
                    label: 'OK',
                    onPress: handleSnackbarDismiss,
                }}
            >
                {snackbarMessage}
            </Snackbar>

            <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
                <Dialog.Title>Recibimos tu consulta</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>En breve te consteramos en tu correo electrónico</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleDialogDismiss}>Volver</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    formContainer: {
        flex: 1,
        marginTop: 50,
        padding: 20,
    },
    button: {
        marginTop: 20,
    },
});

export default SendQuestion;
