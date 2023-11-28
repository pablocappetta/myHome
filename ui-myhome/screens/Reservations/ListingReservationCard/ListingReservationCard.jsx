import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, IconButton, Text, Dialog, Button } from "react-native-paper";
import commaNumber from "comma-number";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";
import { upperCaseFirst } from "../../../helpers/helpers";

const ListingReservationCard = ({
  navigation,
  reservation,
  handleRemoveFavorite,
}) => {
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
      marginTop: 18,
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
        <ListingTypeChip listingType={reservation.listingDetails.type}>
          {upperCaseFirst(reservation.listingDetails.type)}
        </ListingTypeChip>
      </View>
      <Card.Cover
        source={{ uri: reservation.listingDetails.property.photos[0] }}
        style={styles.reservationImage}
        defaultSource={
          theme.dark
            ? require("../../../assets/images/darkBlurredImage.jpg")
            : require("../../../assets/images/blurredImage.jpg")
        }
      />
      <Card.Content style={styles.cardContentContainer}>
        <View>
          <Text
            variant="titleMedium"
            style={{ marginTop: 6 }}
            numberOfLines={1}
          >
            {reservation.listingDetails.type}
          </Text>
          <IconButton
            icon="star"
            size={20}
            style={{ bottom: 35, left: 130 }}
            onPress={() => navigation.navigate("Review")}
            iconColor="#6750A4"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignlistings: "center",
            marginTop: 5,
            position: "absolute",
            left: 17,
            top: 30,
          }}
        >
          <Text variant="bodySmall" numberOfLines={1}>
            {reservation.listingDetails.property.address.city}
          </Text>
          <Text variant="bodySmall" numberOfLines={1}>
            Vencimiento:
          </Text>
          <Text variant="bodySmall" numberOfLines={1}>
            {new Date(reservation.reservationEndDate).toLocaleDateString('es-AR')}
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
              Reserva: {reservation.listingDetails.price.currency}
            </Text>
            <Text variant="bodySmall" style={{ fontWeight: 800 }}>
              ${commaNumber(reservation.listingDetails.price.amount / 2)}
            </Text>
          </View>
        </View>
        <Button
          icon={"close"}
          mode="contained-tonal"
          style={{ bottom: -55, left: 64, width: 108 }}
          onPress={() => handleRemoveFavorite(reservation)}
        >
          Cancelar
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ListingReservationCard;
