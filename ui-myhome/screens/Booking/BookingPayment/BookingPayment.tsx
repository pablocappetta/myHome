// Create a screen where the user will be able to select it's payment method
// //create a react native screen that will show a list of payment methods
// the payment methods will have an icon a text description and a radio button to select it
// // component should use the material paper components for the inputs
// only one payment method can be selected at a time

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Appbar, List } from "react-native-paper";
import { RadioButton } from "react-native-paper";

const bookingTitle = "Reservar propiedad";

export const BookingPayment = ({ navigation }) => {
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={bookingTitle} />
      </Appbar.Header>
      <Text
        variant="titleLarge"
        style={{ marginTop: 6, paddingHorizontal: 24, paddingTop: 40 }}
      >
        Elegí el método de pago
      </Text>
      <View style={styles.containerPaymentOptions}>
        <List.Section>
          <List.Item
            title={"Tarjeta de crédito/débito"}
            left={() => (
              <List.Icon icon="credit-card" style={styles.leftIcons} />
            )}
            right={() => <RadioButton.Android value="Option 1" />}
          />
          <List.Item
            title={"MercadoPago"}
            left={() => <List.Icon icon="cash" style={styles.leftIcons} />}
            right={() => <RadioButton.Android value="Option 1" />}
          />
          <List.Item
            title={"Efectivo/Transferencia"}
            left={() => <List.Icon icon="bank" style={styles.leftIcons} />}
            right={() => <RadioButton.Android value="Option 1" />}
          />
        </List.Section>

        <View style={styles.bottomButton}>
          <Button
            onPress={() =>
              navigation.navigate("Booking", { screen: "BookingSummary" })
            }
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
  },
  containerPaymentOptions: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  leftIcons: {
    paddingLeft: 16,
  },
  bottomButton: {
    flex: 1,
    marginBottom: 32,
    justifyContent: "flex-end",
  },
});

export default BookingPayment;
