import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import {
  Appbar,
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../contexts/UserContext";

interface BookingSummaryProps {
  navigation: any;
  bookingInfo: {
    realtorId: string;
    listingId: string;
    name: string;
    phone: string;
    email: string;
    paymentMethod: string;
  };
  propertyProps: {
    property: {
      propertyName: string;
      propertyAddress: string;
      propertyPrice: number;
      propertyCurrency: string;
      frequency: string;
      propertyImage: string;
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
  route,
  propertyProps = {
    property: {
      propertyName: "Default Property Name",
      propertyAddress: "Default Property Address",
      propertyPrice: 0,
      propertyCurrency: "USD",
      frequency: "per night",
      propertyImage: "https://via.placeholder.com/200x200.png?text=No+Image",
    },
    priceInfo: {
      total: 0,
      tax: 0,
      subtotal: 0,
    },
  },
}: any) => {
  const { bookingInfo } = route?.params;
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const bookingTitle = "Resumen de la reserva";
  const { user } = useUserContext();

  const handleConfirmReservation = async () => {
    setIsConfirming(true); // Show spinner while confirming the reservation

    try {
      const reservationData = {
        listingId: bookingInfo.listingId,
        realtorId: bookingInfo.realtorId,
        userId: user?._id,
        date: new Date().toLocaleDateString("es-AR"),
        time: Math.floor(Date.now() / 1000),
        status: "Pendiente",
        phone: bookingInfo.phone,
      };

      const response = await fetch("http://3.144.94.74:8000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${user?.token}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const reservationId = responseData._id; // Add this line to extract the reservation ID
        setIsDialogVisible(true);
        setReservationId(reservationId);
        ToastAndroid.show("Reserva confirmada", ToastAndroid.SHORT);
        navigation.navigate("Home");
      } else {
        console.error("Failed to confirm reservation");
        ToastAndroid.show("Error al confirmar la reserva", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Error al confirmar la reserva", ToastAndroid.SHORT);
    } finally {
      setIsConfirming(false);
    }
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
              {bookingInfo?.paymentMethod}
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
