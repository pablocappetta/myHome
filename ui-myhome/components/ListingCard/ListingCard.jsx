import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import ListingTypeChip from "../ListingTypeChip/ListingTypeChip";
import commaNumber from "comma-number";
import { useTheme } from "../../contexts/ThemeContext";

const ListingCard = ({ listing, type }) => {
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
      height: type === "highlighted" ? 295 : 195,
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
      flexDirection: "row",
      justifyContent: "flex-end",
      alignlistings: "center",
      marginTop: 12,
      position: "absolute",
      top: 56,
      right: 16,
    },
    cardContentContainer: { display: "flex", flexDirection: "column" },
  });

  const { theme } = useTheme();

  return (
    <Card
      style={type === "highlighted" ? styles.highlighted : styles.recent}
      width={180}
      height={type === "highlighted" ? 400 : 300}
    >
      <View style={styles.listingTypeChip}>
        <ListingTypeChip listingType={listing.listingType}>
          {listing.listingType}
        </ListingTypeChip>
      </View>
      <Card.Cover
        source={{ uri: listing.image }}
        style={styles.listingImage}
        defaultSource={
          theme.dark
            ? require("../../assets/images/darkBlurredImage.jpg")
            : require("../../assets/images/blurredImage.jpg")
        }
      />
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="titleSmall" style={{ marginTop: 6 }}>
          {listing.type}
        </Text>
        <Text variant="bodySmall" numberOfLines={2} style={{ width: "100%" }}>
          {listing.location}
        </Text>
        <View style={styles.priceContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text variant="bodyLarge" style={{ fontWeight: 600 }}>
              {listing.currency}
            </Text>
            <Text variant="bodyLarge" style={{ fontWeight: 800 }}>
              ${commaNumber(listing.price)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListingCard;
