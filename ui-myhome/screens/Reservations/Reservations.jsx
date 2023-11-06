import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Dialog, Button } from "react-native-paper";
import { Appbar } from "react-native-paper";
import ListingReservationCard from "./ListingReservationCard/ListingReservationCard";
import { useScrollToTop } from "@react-navigation/native";
import { mockedReservations } from "./mock/MockedReservationsData";

const Reservations = ({ navigation }) => {
  const ref = useRef(null);

  const [listingToRemove, setListingToRemove] = useState(null);
  const [listings, setListings] = useState(mockedReservations);

  useScrollToTop(ref);

  const handleRemoveFromReservationAction = () => {
    //filter listing to remove from listings
    const newListings = listings.filter(
      (listing) => listing.id !== listingToRemove.id
    );
    setListingToRemove(null);
    setListings(newListings);
    setDialogVisible(false);
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleRemoveReservation = (listing) => {
    setListingToRemove(listing);
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Reservas" />
      </Appbar.Header>
      <ScrollView vertical ref={ref}>
        <View style={styles.containerCardsReservationListing}>
          {listings.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => navigation.navigate("Post", listing)}
            >
              <ListingReservationCard
                reservation={listing}
                handleRemoveFavorite={handleRemoveReservation}
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
          >
            Volver
          </Button>
          <Button
            onPress={handleRemoveFromReservationAction}
            mode="contained"
            buttonColor={"#FF5A5F"}
            textColor="#FFFFFF"
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
});

export default Reservations;
