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

const languageMap = {
  "en-GB": enGB,
  es: es,
  en: en,
};

for (const language in languageMap) {
  registerTranslation(language, languageMap[language]);
}

const bookingTitle = "Reservar propiedad";

export const BookingDate = ({ navigation }) => {
  const [date, onChangeDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("Mañana");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const onTimeChange = useCallback((value) => {
    setSelectedTime(value);
  }, []);

  const handleAgendar = () => {
    setShowSuccessDialog(true);
  };

  const handleReturn = () => {
    setShowSuccessDialog(false);
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
          >
            Agendar
          </Button>
        </View>
      </View>
      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={handleReturn}>
          <Dialog.Title>¡Reserva agendada!</Dialog.Title>
          <Dialog.Content>
            <Text>La reserva ha sido agendada exitosamente.</Text>
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
