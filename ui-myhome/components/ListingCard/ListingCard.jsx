import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import ListingTypeChip from "../ListingTypeChip/ListingTypeChip";

const ListingCard = ({ listing, type }) => (
  <Card
    style={type === "highlighted" ? styles.highlighted : styles.recent}
    width={180}
    height={300}
  >
    <View>
      <ListingTypeChip listingType={listing.listingType}>
        {listing.listingType}
      </ListingTypeChip>
    </View>
    <Card.Cover source={{ uri: listing.image }} />
    <Card.Content style={{ display: "flex", flexDirection: "column" }}>
      <Text variant="titleSmall" style={{ marginTop: 6 }}>
        {listing.type}
      </Text>
      <Text variant="bodySmall" numberOfLines={2} style={{ width: "100%" }}>
        {listing.location}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignlistings: "center",
          marginTop: 12,
          position: "absolute",
          top: 56,
          right: 16,
        }}
      >
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
            ${listing.price}
          </Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);

const sharedStyles = {
  position: "relative",
};

const styles = StyleSheet.create({
  highlighted: {
    ...sharedStyles,
    marginLeft: 6,
    marginRight: 6,
  },
  recent: {
    ...sharedStyles,
  },
});

export default ListingCard;