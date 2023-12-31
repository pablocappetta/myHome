import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, IconButton, Text, Dialog, Button } from "react-native-paper";
import commaNumber from "comma-number";
import { useTheme } from "../../../contexts/ThemeContext";
import ListingTypeChip from "../../../components/ListingTypeChip/ListingTypeChip";
import { upperCaseFirst } from "../../../helpers/helpers";

const ListingFavoriteCard = ({ listing, handleRemoveFavorite }) => {
  const styles = StyleSheet.create({
    listingImage: {
      width: 180,
      height: 128,
    },
    listingTypeChip: {
      position: "absolute",
      zIndex: 1,
      left: 8,
      top: 8,
    },
    priceContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignlistings: "center",
      marginTop: 12,
      position: "absolute",
      right: 8,
      top: 72,
    },
    cardContentContainer: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      width: 172,
      top: 8,
      right: 8,
    },
  });

  const { theme } = useTheme();

  return (
    <Card>
      <View style={styles.listingTypeChip}>
        <ListingTypeChip listingType={upperCaseFirst(listing?.type)}>
          {upperCaseFirst(listing?.type)}
        </ListingTypeChip>
        <IconButton
          icon="heart"
          size={16}
          mode="contained"
          style={{ bottom: 38, left: 126 }}
          onPress={() => handleRemoveFavorite(listing)}
        />
      </View>
      <Card.Cover
        source={{ uri: listing?.property?.photos?.[0] }}
        style={styles.listingImage}
        defaultSource={
          theme?.dark
            ? require("../../../assets/images/darkBlurredImage.jpg")
            : require("../../../assets/images/blurredImage.jpg")
        }
      />
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="titleMedium" style={{ marginTop: 6 }} numberOfLines={1}>
          {listing?.property?.type}
        </Text>
        <Text variant="bodySmall" numberOfLines={1}>
          {listing?.property?.address?.city}
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
              {listing?.price?.currency }
            </Text>
            <Text variant="bodyLarge" style={{ fontWeight: 800 }}>
              ${commaNumber(listing?.price?.amount)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListingFavoriteCard;
