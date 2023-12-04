import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, IconButton, Text, Dialog, Button } from "react-native-paper";
import commaNumber from "comma-number";
import { useTheme } from "../../../contexts/ThemeContext";
import { upperCaseFirst } from "../../../helpers/helpers";
import { useUserContext } from "../../../contexts/UserContext";

const ListingReservationCard = ({
  navigation,
  reservation,
  handleRemoveFavorite,
}) => {
  const styles = StyleSheet.create({
    reservationImage: {
      width: "50%",
      height: 80,
    },
  });

  const { theme } = useTheme();

  const { user } = useUserContext();

  return (
    <Card>
      <Card.Content style={styles.cardContentContainer}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Card.Cover
            source={{ uri: reservation.listingDetails.property.photos[0] }}
            style={styles.reservationImage}
            defaultSource={
              theme.dark
                ? require("../../../assets/images/darkBlurredImage.jpg")
                : require("../../../assets/images/blurredImage.jpg")
            }
          />
          <View
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 8,
              }}
            >
              <Button
                icon={"information-outline"}
                labelStyle={{ fontSize: 18 }}
              >
                {upperCaseFirst(reservation.listingDetails.type)}
              </Button>
              {!user.isRealtor && (
                <IconButton
                  icon="star"
                  size={16}
                  onPress={() => navigation.navigate("Review", reservation._id)}
                  mode="contained"
                  style={{ margin: 0, padding: 0 }}
                />
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <IconButton icon={"map-marker"} size={14} />
              <Text>{reservation.listingDetails.property.address.city}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton icon={"cash"} size={18} />
            <Text variant="bodySmall">
              ${commaNumber(reservation?.listingDetails?.price?.amount / 2)}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton icon={"calendar"} size={18} />
            <Text variant="bodySmall" numberOfLines={1}>
              {reservation.reservationEndDate
                ? new Date(reservation.reservationEndDate).toLocaleDateString(
                    "es-AR"
                  )
                : new Date(
                    new Date(reservation.reservationDate).setMonth(
                      new Date(reservation.reservationDate).getMonth() + 1
                    )
                  ).toLocaleDateString("es-AR")}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 24,
          }}
        >
          <Button
            icon={"close"}
            mode="contained-tonal"
            onPress={() => handleRemoveFavorite(reservation)}
            width="50%"
          >
            Cancelar
          </Button>
          <Button
            icon={"eye"}
            mode="contained"
            width="50%"
            onPress={() =>
              navigation.navigate("Post", reservation.listingDetails)
            }
          >
            Ver propiedad
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListingReservationCard;
