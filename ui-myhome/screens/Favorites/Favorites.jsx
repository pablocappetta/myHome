import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Dialog, Button, MD3Colors } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { mockedHighlightedListings } from "../Home/mock/MockedHomeData";
import ListingFavoriteCard from "./ListingFavoriteCard/ListingFavoriteCard";
import { useScrollToTop } from "@react-navigation/native";

const Favorites = ({ navigation }) => {
  const ref = useRef(null);

  const [listingToRemove, setListingToRemove] = useState(null);
  const [listings, setListings] = useState(mockedHighlightedListings);

  useScrollToTop(ref);

  const handleRemoveFromFavoritesAction = () => {
    //filter listing to remove from listings
    const newListings = listings.filter(
      (listing) => listing.id !== listingToRemove.id
    );
    setListingToRemove(null);
    setListings(newListings);
    setDialogVisible(false);
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleRemoveFavorite = (listing) => {
    setListingToRemove(listing);
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <ScrollView vertical ref={ref}>
        <View style={styles.containerCardsFavoriteListing}>
          {listings.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => navigation.navigate("Post", listing)}
            >
              <ListingFavoriteCard
                listing={listing}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => {
          setDialogVisible(false);
          setListingToRemove(null);
        }}
      >
        <Dialog.Title>Eliminar favorito</Dialog.Title>
        <Dialog.Content>
          <Text>
            ¿Estás seguro de que querés eliminar esta propiedad de tus
            favoritos?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setListingToRemove(null);
              setDialogVisible(false);
            }}
            style={{ marginRight: 16 }}
          >
            Volver
          </Button>
          <Button
            onPress={handleRemoveFromFavoritesAction}
            mode="contained"
            buttonColor={MD3Colors.error60}
            textColor={MD3Colors.tertiary100}
            icon={"heart-remove"}
          >
            Eliminar favorito
          </Button>
        </Dialog.Actions>
      </Dialog>
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
