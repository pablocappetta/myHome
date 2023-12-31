//create a react native screen that will show a date input that opens a calendar selection
// also add a time selection component
// component should use the material paper components for the time selection and calendar input

import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Appbar,
  SegmentedButtons,
  Dialog,
  Portal,
} from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { es, en, enGB, registerTranslation } from "react-native-paper-dates";
import { useUserContext } from "../../../contexts/UserContext";

const languageMap = {
  "en-GB": enGB,
  es: es,
  en: en,
};

for (const language in languageMap) {
  registerTranslation(language, languageMap[language]);
}

const bookingTitle = "Agendar visita";

export const BookingDate = ({ navigation, route }) => {
  const [date, onChangeDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("Mañana");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { user } = useUserContext();

  const onTimeChange = useCallback((value) => {
    setSelectedTime(value);
  }, []);

  const visitAlreadyScheduled = () => {
    fetch(
      "http://3.144.94.74:8000/api/listings/" +
        route?.params?.listingId +
        "/visits",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((visit) => {
          if (visit.userId === user._id) {
            setAlreadyBooked(true);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  visitAlreadyScheduled();

  console.log(alreadyBooked, "VEAMOS");

  const handleAgendar = () => {
    try {
      const request = {
        date: date.toISOString().split("T")[0],
        userId: user?._id,
        time: selectedTime,
      };
      fetch(
        `http://3.144.94.74:8000/api/listings/${route?.params?.listingId}/visits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      ).then((response) => {
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          setShowSuccessDialog(true);
        } else {
          setShowErrorDialog(true);
        }
      });
    } catch (error) {
      setShowErrorDialog(true);
    }
  };

  const handleReturn = () => {
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={bookingTitle} />
      </Appbar.Header>
      <View style={styles.containerBookingDate}>
        <Text variant="titleLarge" style={{ marginTop: 6 }}>
          Elegí la fecha y hora de tu visita
        </Text>
        <View style={styles.section}>
          <DatePickerInput
            locale="es"
            label="Fecha"
            value={date}
            onChange={(d) => onChangeDate(d)}
            inputMode="start"
            mode="outlined"
            style={{ marginTop: 50 }}
          />
          <View style={{ flexDirection: "column", marginTop: 48 }}>
            <Text
              variant="titleLarge"
              style={{ marginTop: 6, marginBottom: 20 }}
            >
              Horario
            </Text>
            <SegmentedButtons
              value={selectedTime}
              onValueChange={onTimeChange}
              style={{ height: 40, width: 350 }}
              buttons={[
                { label: "Mañana", value: "Mañana" },
                { label: "Tarde", value: "Tarde" },
              ]}
            />
          </View>
        </View>
        <View style={styles.bottomButton}>
          <Button
            onPress={handleAgendar}
            accessibilityLabel="Continuar a la siguiente pantalla para editar datos de contacto"
            mode="contained"
            disabled={!date || alreadyBooked} // Disable the button if no date is selected
          >
            {alreadyBooked ? "Ya agendaste una visita" : "Agendar"}
          </Button>
        </View>
      </View>
      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={handleReturn}>
          <Dialog.Title>¡Visita agendada!</Dialog.Title>
          <Dialog.Content>
            <Text>
              La visita ha sido agendada exitosamente. La inmobiliaria te
              contactara con mas detalles.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleReturn}>Volver</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={showErrorDialog} onDismiss={handleReturn}>
          <Dialog.Title>Error inesperado</Dialog.Title>
          <Dialog.Content>
            <Text>Hubo un error al agendar la visita, intente nuevamente</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleReturn}>Volver</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  containerBookingDate: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
    display: "flex",
    gap: 16,
  },
  bottomButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});

export default BookingDate;
