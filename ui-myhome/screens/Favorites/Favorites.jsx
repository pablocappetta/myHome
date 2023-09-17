import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { mockedHighlightedListings } from "../Home/mock/MockedHomeData";
import ListingFavoriteCard from "./ListingFavoriteCard/ListingFavoriteCard";
import { useScrollToTop } from "@react-navigation/native";

const Favorites = ({ navigation }) => {
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <ScrollView vertical ref={ref}>
        <View style={styles.containerCardsFavoriteListing}>
          {mockedHighlightedListings.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => navigation.navigate("Post", listing)}
            >
              <ListingFavoriteCard listing={listing} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCardsFavoriteListing: {
    flex: 1,
    display: "flex",
    gap: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default Favorites;
