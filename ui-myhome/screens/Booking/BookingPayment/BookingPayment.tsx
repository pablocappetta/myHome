import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Appbar, List } from "react-native-paper";
import { RadioButton } from "react-native-paper";

const bookingTitle = "Reservar propiedad";

export const BookingPayment = ({ navigation }) => {
  const [checked, setChecked] = React.useState("first");

  const handleOptionChange = (value) => {
    setChecked(value);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
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
            right={() => (
              <RadioButton.Android
                value="credit-card"
                status={checked === "credit-card" ? "checked" : "unchecked"}
                onPress={() => handleOptionChange("credit-card")}
              />
            )}
          />
          <List.Item
            title={"MercadoPago"}
            left={() => <List.Icon icon="cash" style={styles.leftIcons} />}
            right={() => (
              <RadioButton.Android
                value="mercado-pago"
                status={checked === "mercado-pago" ? "checked" : "unchecked"}
                onPress={() => handleOptionChange("mercado-pago")}
              />
            )}
          />
          <List.Item
            title={"Efectivo/Transferencia"}
            left={() => <List.Icon icon="bank" style={styles.leftIcons} />}
            right={() => (
              <RadioButton.Android
                value="efectivo-transferencia"
                status={
                  checked === "efectivo-transferencia" ? "checked" : "unchecked"
                }
                onPress={() => handleOptionChange("efectivo-transferencia")}
              />
            )}
          />
        </List.Section>

        <View style={styles.bottomButton}>
          <Button
            onPress={() =>
              navigation.navigate("Booking", { screen: "Summary" })
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
