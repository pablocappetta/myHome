import React, { useState } from "react";
import {
  TextInput,
  Button,
  Snackbar,
  Dialog,
  Paragraph,
  Text,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useUserContext } from "../../contexts/UserContext";

function SendQuestion({ navigation, ...props }) {
  const [question, setQuestion] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const { user } = useUserContext();

  const handleQuestionChange = (text) => {
    setQuestion(text);
  };

  const realtorId = props.route.params;
  const listingId = props.route.params;

  const handleSendQuestion = async () => {
    try {
      const response = await fetch(
        `http://3.144.94.74:8000/api/realtors/${realtorId.params.realtorId}/notifications`,
        {
          method: "POST",
          body: JSON.stringify({
            date: new Date().toISOString(),
            message:
              "Nuevo mensaje de " +
              user.name +
              "\nEmail: " +
              user.email +
              "\n" +
              "\n" +
              question,
            listingId: listingId.params.listingId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDialogVisible(true);
      } else {
        setSnackbarType("error");
        setSnackbarMessage("Error al enviar la consulta. Intente nuevamente");
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarType("error");
      setSnackbarMessage("Error al enviar la consulta. Intente nuevamente");
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
    if (snackbarType === "success") {
      navigation.goBack();
    }
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
    navigation.goBack();
  };

  const sendQuestionTitle = "Enviar pregunta";

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={sendQuestionTitle} />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <Text style={{ marginBottom: 20, fontSize: 18 }}>
          Enviale tu consulta al propietario
        </Text>
        <TextInput
          styles={styles.input}
          mode="outlined"
          label="Mensaje"
          value={question}
          onChangeText={(e) => handleQuestionChange(e)}
          multiline={true}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSendQuestion}
        >
          Enviar consulta
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
        action={{
          label: "OK",
          onPress: handleSnackbarDismiss,
        }}
      >
        {snackbarMessage}
      </Snackbar>

      <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
        <Dialog.Title>Recibimos tu consulta</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            En breve te consteramos en tu correo electrónico
          </Paragraph>
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
    marginTop: 20,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default SendQuestion;
