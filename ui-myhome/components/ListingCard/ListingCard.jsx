import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import ListingTypeChip from "../ListingTypeChip/ListingTypeChip";
import commaNumber from "comma-number";
import { useTheme } from "../../contexts/ThemeContext";
import { upperCaseFirst } from "../../helpers/helpers";

const ListingCard = ({ listing, type }) => {
  const defaultImage =
    "https://www.facoelche.com/images/placeholder-noimage.jpg";
  const sharedStyles = {
    position: "relative",
  };

  const styles = StyleSheet.create({
    highlighted: {
      ...sharedStyles,
      marginLeft: 6,
      marginRight: 6,
    },
    listingImage: {
      width: "100%",
      height: type === "highlighted" ? 271 : 195,
    },
    recent: {
      ...sharedStyles,
    },
    listingTypeChip: {
      position: "absolute",
      zIndex: 1,
      right: 8,
      top: 8,
    },
    priceContainer: {
      display: "flex",
      alignlistings: "center",
      marginTop: 12,
    },
    cardContentContainer: { display: "flex", flexDirection: "column" },
  });

  const { theme } = useTheme();

  return (
    <Card
      style={type === "highlighted" ? styles.highlighted : styles.recent}
      width={180}
      height={type === "highlighted" ? 386 : 310}
    >
      <View style={styles.listingTypeChip}>
        <ListingTypeChip
          listingType={listing?.listingType || upperCaseFirst(listing?.type)}
        >
          {listing?.listingType || upperCaseFirst(listing?.type)}
        </ListingTypeChip>
      </View>
      <Card.Cover
        source={{
          uri: listing?.image || listing?.property?.photos[0] || defaultImage,
        }}
        style={styles.listingImage}
        defaultSource={
          theme.dark
            ? require("../../assets/images/darkBlurredImage.jpg")
            : require("../../assets/images/blurredImage.jpg")
        }
      />
      <Card.Content style={styles.cardContentContainer}>
        <Text
          variant="titleSmall"
          style={{ marginTop: 6, fontSize: 16, fontWeight: "bold" }}
          numberOfLines={1}
        >
          {listing?.title || "N/A"}
        </Text>
        <Text
          variant="titleSmall"
          style={{ marginTop: 2, marginBottom: 2 }}
          numberOfLines={1}
        >
          {listing?.property?.type || listing?.type}
        </Text>
        <Text variant="bodySmall" numberOfLines={1} style={{ width: "100%" }}>
          {listing?.location ||
            listing?.property?.address?.neighborhood ||
            "Sin descripción"}
        </Text>
        <View style={styles.priceContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text
              variant="bodyLarge"
              numberOfLines={1}
              style={{ fontWeight: 800, width: "75%" }}
            >
              ${commaNumber(listing?.price?.amount)}
            </Text>
            <Button icon={"cash"} contentStyle={{ height: 24 }} />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
