import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  Appbar,
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface BookingSummaryProps {
  navigation: any;
  propertyProps: {
    property: {
      propertyName: string;
      propertyAddress: string;
      propertyPrice: number;
      propertyCurrency: string;
      frequency: string;
      propertyImage: string;
    };
    paymentInfo: {
      cardType: string;
      last4Digits: number;
    };
    priceInfo: {
      total: number;
      tax: number;
      subtotal: number;
    };
  };
}

export const BookingSummary = ({
  navigation,
  propertyProps = {
    property: {
      propertyName: "Default Property Name",
      propertyAddress: "Default Property Address",
      propertyPrice: 0,
      propertyCurrency: "USD",
      frequency: "per night",
      propertyImage: "https://via.placeholder.com/200x200.png?text=No+Image",
    },
    paymentInfo: {
      cardType: "Default Card Type",
      last4Digits: 1234,
    },
    priceInfo: {
      total: 0,
      tax: 0,
      subtotal: 0,
    },
  },
}: BookingSummaryProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const bookingTitle = "Resumen de la reserva";

  const handleConfirmReservation = async () => {
    // Simulate a 2 second delay and show a spinner while confirming the reservation before showing the dialog
    setIsConfirming(true); // Show spinner while confirming the reservation
    try {
      await setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
      setIsDialogVisible(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleDialogDismiss = () => {
    dismissDialog();
    navigation.navigate("Home");
  };

  const navigateToReview = () => {
    dismissDialog();
    navigation.navigate("Review");
  };

  const dismissDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={bookingTitle} />
      </Appbar.Header>
      <ScrollView style={styles.summaryContainer}>
        <View style={styles.body}>
          <View style={styles.section}>
            <Image
              style={styles.image}
              source={{
                uri: propertyProps.property.propertyImage,
              }}
            />
            <Text variant="titleMedium" style={{ marginTop: 6 }}>
              {propertyProps.property.propertyName}
            </Text>
            <Text variant="bodySmall" style={{ marginTop: 6 }}>
              {propertyProps.property.propertyAddress}
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 6 }}>
              {propertyProps.property.propertyPrice}{" "}
              {propertyProps.property.propertyCurrency}{" "}
              {propertyProps.property.frequency}
            </Text>
          </View>
          <View style={styles.section}>
            <Text variant="titleMedium" style={{ marginTop: 6 }}>
              Precio
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 6 }}>
              ${propertyProps.priceInfo.subtotal}
            </Text>
            <Text variant="titleMedium" style={{ marginTop: 6 }}>
              Impuestos
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 6 }}>
              ${propertyProps.priceInfo.tax}
            </Text>
            <Text variant="titleMedium" style={{ marginTop: 6 }}>
              Total
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 6 }}>
              ${propertyProps.priceInfo.total}
            </Text>
          </View>
          <View style={styles.section}>
            <Text variant="titleMedium" style={{ marginTop: 6 }}>
              Método de pago
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 6 }}>
              {propertyProps.paymentInfo.cardType} **** **** ****{" "}
              {propertyProps.paymentInfo.last4Digits}
            </Text>
            <Button
              onPress={() => navigation.navigate("Review")}
              accessibilityLabel="Cambiar el método de pago"
              mode="text"
            >
              Cambiar
            </Button>
          </View>
          <View style={styles.bottomButton}>
            <Button
              onPress={handleConfirmReservation}
              accessibilityLabel="Confirmar la reserva"
              mode="contained"
              disabled={isConfirming}
            >
              {isConfirming ? "Confirmando..." : "Confirmar"}
            </Button>
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dismissDialog}>
          <Dialog.Title>Reserva confirmada</Dialog.Title>
          <Dialog.Content>
            <Text>Aguardá el contacto de la inmobiliaria</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogDismiss}>Volver</Button>
            <Button onPress={navigateToReview}>Dejar una reseña</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {isConfirming && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default BookingSummary;
