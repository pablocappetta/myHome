import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Dialog, Button, MD3Colors, Icon } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useScrollToTop } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";
import ListingFavoriteCard from "./ListingFavoriteCard/ListingFavoriteCard";

const Favorites = ({ navigation }) => {
  const ref = useRef(null);

  const [listingToRemove, setListingToRemove] = useState(null);
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUserContext();

  useScrollToTop(ref);

  useEffect(() => {
    // Fetch favorites from API
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://3.144.94.74:8000/api/users/${user._id}/favorites`
      );
      if (response.length === 0) return;
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemoveFromFavoritesAction = () => {
     // Remove favorite
     fetch(`http://3.144.94.74:8000/api/users/${user._id}/favorites/${listing._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.ok) {
          const newListings = listings.filter(
            (listing) => listing._id !== listingToRemove._id
          );
          setListingToRemove(null);
          setListings(newListings);
          setDialogVisible(false);
        } else {
          // Handle error
          console.error("Failed to remove favorite");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to remove favorite", error);
      });

  };

  const handleRefreshFavorites = async () => {
    setRefreshing(true);
    await fetchFavorites();
    setRefreshing(false);
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
        <Appbar.Action
          icon="refresh"
          onPress={handleRefreshFavorites}
          disabled={refreshing}
        />
      </Appbar.Header>
      <ScrollView vertical ref={ref}>
        <View style={styles.containerCardsFavoriteListing}>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <TouchableOpacity
                key={listing._id}
                onPress={() => navigation.navigate("Post", listing)}
              >
                <ListingFavoriteCard
                  listing={listing}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.containerNoFavorites}>
              <Icon source="heart-off" size={72} />
              <Text variant="titleLarge">No tenés ningún favorito...aún</Text>
            </View>
          )}
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
  containerNoFavorites: {
    display: "flex",
    margin: 24,
    alignItems: "center",
    gap: 24,
  },
});

export default Favorites;
