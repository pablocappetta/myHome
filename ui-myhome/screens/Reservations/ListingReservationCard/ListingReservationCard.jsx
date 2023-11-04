import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, IconButton, Text, Dialog, Button } from "react-native-paper";
import commaNumber from "comma-number";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";

const ListingReservationCard = ({navigation, reservation, handleRemoveFavorite }) => {
  const styles = StyleSheet.create({
    reservationImage: {
      width: 170,
      height: 190,
    },
    reservationTypeChip: {
      position: "absolute",
      zIndex: 1,
      left: 8,
      top: 8,
    },
    priceContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignlistings: "center",
      marginTop: 12,
      position: "absolute",
      left: 17,
      top: 72,
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      width: 190,
      top: 8,
      right: 5,
    },
  });

  const { theme } = useTheme();

  return (
    <Card>
      <View style={styles.reservationTypeChip}>
        <ListingTypeChip listingType={reservation.listingType}>
          {reservation.listingType}
        </ListingTypeChip>
      </View>
      <Card.Cover
        source={{ uri: reservation.image }}
        style={styles.reservationImage}
        defaultSource={
          theme.dark
            ? require("../../../assets/images/darkBlurredImage.jpg")
            : require("../../../assets/images/blurredImage.jpg")
        }
      />
      <Card.Content style={styles.cardContentContainer}>
        <View>
        <Text variant="titleMedium" style={{ marginTop: 6 }} numberOfLines={1}>
          {reservation.type}
        </Text>
        <IconButton
          icon="star"
          size={20}
          style={{ bottom: 35, left: 130 }}
          onPress={() => 
            navigation.navigate("Review")
          }
          iconColor="#6750A4"
        />
        </View>
        <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignlistings: "center",
          marginTop: 12,
          position: "absolute",
          left: 17,
          top: 30,
        }}
        >
        <Text 
        variant="bodySmall"
        numberOfLines={1}>
          {reservation.location}
        </Text>
        <Text variant="bodySmall" numberOfLines={1}>
          Vencimiento: {reservation.expirationDate}
        </Text>
        </View>

        <View style={styles.priceContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text variant="bodySmall" style={{ fontWeight: 600 }}>
              Monto: {reservation.currency}
            </Text>
            <Text variant="bodySmall" style={{ fontWeight: 800 }}>
              ${commaNumber(reservation.price)}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text variant="bodySmall" style={{ fontWeight: 600 }}>
              Reserva: {reservation.currency}
            </Text>
            <Text variant="bodySmall" style={{ fontWeight: 800 }}>
              ${commaNumber(reservation.reservationAmount)}
            </Text>
          </View>
        </View>
        <Button
        icon={"close"}
        mode="contained"
        style={{ bottom: -55, left: 45, width: 120 }}
        onPress={() => handleRemoveFavorite(reservation)}
        >
          Cancelar
        </Button>
      </Card.Content>
    </Card>
  );
};



export default ListingReservationCard;
