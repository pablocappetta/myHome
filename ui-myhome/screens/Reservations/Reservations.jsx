import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Dialog, Button, MD3Colors, Icon } from "react-native-paper";
import { Appbar } from "react-native-paper";
import ListingReservationCard from "./ListingReservationCard/ListingReservationCard";
import { useScrollToTop } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";

const Reservations = ({ navigation }) => {
  const ref = useRef(null);

  const [listingToRemove, setListingToRemove] = useState(null);
  const [listings, setListings] = useState([]);

  const { user } = useUserContext();

  useScrollToTop(ref);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReservations();
        if (reservations.length === 0) return;
        setListings(reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const getReservations = async () => {
    const response = await fetch(
      "http://3.144.94.74:8000/api/" + "reservations/user/" + user._id
    );
    const data = await response.json();
    return data;
  };

  const handleRefresh = async () => {
    try {
      const reservations = await getReservations();
      if(reservations.length === 0) return;
      setListings(reservations);
    } catch (error) {
      console.error("Error refreshing reservations:", error);
    }
  };

  const handleRemoveFromReservationAction = async () => {
    try {
      // Call API to remove the listing
      await removeListing(listingToRemove._id);

      // Filter listing to remove from listings
      const newListings = listings.filter(
        (listing) => listing._id !== listingToRemove._id
      );

      setListingToRemove(null);
      setListings(newListings);
      setDialogVisible(false);
    } catch (error) {
      console.error("Error removing listing:", error);
    }
  };

  const removeListing = async (listingId) => {
    const response = await fetch(
      "http://3.144.94.74:8000/api/reservations/" + listingId,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove listing");
    }
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleRemoveReservation = (listing) => {
    setListingToRemove(listing);
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Reservas" />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
      </Appbar.Header>
      <ScrollView vertical ref={ref}>
        <View style={styles.containerCardsReservationListing}>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <TouchableOpacity
                key={listing.id}
                onPress={() => navigation.navigate("Post", listing)}
              >
                <ListingReservationCard
                  reservation={listing}
                  handleRemoveFavorite={handleRemoveReservation}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.containerNoReservations}>
              <Icon source="calendar-remove" size={72} />
              <Text variant="titleLarge">No tenés ninguna reserva...aún</Text>
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
        <Dialog.Title>Eliminar reserva</Dialog.Title>
        <Dialog.Content>
          <Text>¿Estás seguro de que querés cancelar esta reserva?</Text>
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
            onPress={handleRemoveFromReservationAction}
            mode="contained"
            buttonColor={MD3Colors.error60}
            textColor={MD3Colors.tertiary100}
            icon={"calendar-remove"}
          >
            Cancelar reserva
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
  containerCardsReservationListing: {
    flex: 1,
    display: "flex",
    gap: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  containerNoReservations: {
    display: "flex",
    margin: 24,
    alignItems: "center",
    gap: 24,
  },
});

export default Reservations;
