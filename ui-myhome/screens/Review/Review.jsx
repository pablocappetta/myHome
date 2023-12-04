import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Appbar,
  Paragraph,
  Text,
} from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { useUserContext } from "../../contexts/UserContext";

const Review = ({ navigation, route }) => {
  const [review, setReview] = useState("");
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false); // Added state for error dialog

  const { user } = useUserContext();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const showErrorDialog = () => setErrorDialogVisible(true); // Function to show error dialog
  const hideErrorDialog = () => setErrorDialogVisible(false); // Function to hide error dialog

  const handleCommentChange = (text) => setComment(text);

  const handleSendReview = async () => {
    try {
      const reservationId = route.params;
      const response = await fetch(
        "http://3.144.94.74:8000/api/" +
          "reservations/" +
          reservationId +
          "/review",
        {
          method: "POST",
          body: JSON.stringify({
            rating: review,
            comment,
            date: new Date().toISOString().split("T")[0],
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Show success dialog
      showDialog();
    } catch (error) {
      console.error("There was an error:", error);
      // Show error dialog
      showErrorDialog();
    }
  };

  const handleRatingChange = (rating) => {
    setReview(rating);
  };

  const title = "Reseña";

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.text}>Dejanos un mensaje para la inmobiliaria</Text>
        <TextInput
          label="Mensaje"
          value={comment}
          onChangeText={handleCommentChange}
          style={styles.input}
        />
        <Text style={styles.text}>Calificación</Text>
        <AirbnbRating
          style={styles.rating}
          type="custom"
          showRating={false}
          starContainerStyle={{ padding: 0, margin: 10 }}
          onFinishRating={handleRatingChange}
          defaultRating={0}
          size={20}
        ></AirbnbRating>

        <Button
          mode="contained"
          onPress={handleSendReview}
          style={styles.button}
        >
          Enviar
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Reseña Enviada</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Gracias por tu reseña!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  hideDialog;
                  navigation.goBack();
                }}
              >
                Volver
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog visible={errorDialogVisible} onDismiss={hideErrorDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Error al enviar la reseña</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideErrorDialog}>Volver</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  rating: {
    padding: 0,
    margin: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 16,
  },
});

export default Review;
