import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Avatar, Text, Searchbar, SegmentedButtons } from "react-native-paper";
import {
  getFilteredListingByQuery,
  getFilteredListingByType,
} from "./HomeUtils";
import ListingCard from "../../components/ListingCard/ListingCard";
import {
  mockedHighlightedListings,
  mockedRecentListings,
} from "./mock/MockedHomeData";
import { useUserContext } from "../../contexts/UserContext";

const Home = ({ navigation }) => {
  const { user } = useUserContext();

  const [searchQuery, setSearchQuery] = useState("");

  const [isQueryActive, setIsQueryActive] = useState(false);

  const [highlightedListings, setHighlightedListing] = useState(
    [].concat(mockedHighlightedListings)
  );

  const [recentListings, setRecentListings] = useState(
    [].concat(mockedRecentListings)
  );

  const [filterSelection, setFilterSelection] = useState("todos");

  const handleButtonFilterChange = (listingType) => {
    setFilterSelection(listingType);
    setHighlightedListing(
      getFilteredListingByType(mockedHighlightedListings, listingType)
    );
    setRecentListings(
      getFilteredListingByType(mockedRecentListings, listingType)
    );
    setSearchQuery("");
  };

  const handleSearchStringChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmitChange = ({ nativeEvent }) => {
    setSearchQuery(nativeEvent.text);
    setHighlightedListing(
      getFilteredListingByQuery(highlightedListings, nativeEvent.text)
    );
    setRecentListings(
      getFilteredListingByQuery(recentListings, nativeEvent.text)
    );
    setIsQueryActive(true);
  };

  const handleSearchClearIconPress = () => {
    setSearchQuery("");
    setHighlightedListing(mockedHighlightedListings);
    setRecentListings(mockedRecentListings);
    setIsQueryActive(false);
  };

  return (
    <ScrollView vertical>
      <View style={styles.userHomeWelcomeHeader}>
        <Avatar.Image size={36} source={{ uri: user.profilePicture }} />
        <Text variant="titleLarge">
          ¡Hola, <Text style={{ fontWeight: 800 }}>{user.name}</Text>!
        </Text>
      </View>

      <View>
        <SegmentedButtons
          buttons={[
            {
              value: "alquiler",
              label: "Alquilar",
              icon: "key-chain",
            },
            {
              value: "todos",
              icon: "circle-outline",
            },
            {
              value: "venta",
              label: "Comprar",
              icon: "currency-usd",
            },
          ]}
          value={filterSelection}
          onValueChange={handleButtonFilterChange}
          style={{
            marginTop: 16,
            marginBottom: 16,
            paddingHorizontal: 48,
          }}
        />
      </View>

      <View
        style={{
          display: "flex",
          marginTop: 16,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Searchbar
          placeholder="Buscar..."
          onChangeText={handleSearchStringChange}
          onSubmitEditing={handleSearchSubmitChange}
          onClearIconPress={handleSearchClearIconPress}
          value={searchQuery}
        />
      </View>

      {highlightedListings.length > 0 && !isQueryActive && (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                paddingHorizontal: 16,
              }}
            >
              Destacados
            </Text>
            <TouchableOpacity>
              <Text
                variant="labelLarge"
                style={{
                  paddingHorizontal: 16,
                }}
              >
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={{ paddingHorizontal: 8 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 16,
                marginBottom: 16,
                justifyContent: "center",
                gap: 16,
              }}
            >
              {highlightedListings.map((item, index) => (
                <ListingCard
                  key={index + item.id}
                  listing={item}
                  type={"highlighted"}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {recentListings.length > 0 && !isQueryActive && (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                paddingHorizontal: 16,
              }}
            >
              Últimas publicaciones
            </Text>
            <TouchableOpacity>
              <Text
                variant="labelLarge"
                style={{
                  paddingHorizontal: 16,
                }}
              >
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <View
            horizontal
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 16,
              marginBottom: 16,
              justifyContent: "center",
              gap: 16,
            }}
          >
            {recentListings.map((item, index) => (
              <ListingCard
                key={index + item.id}
                listing={item}
                type={"recent"}
              />
            ))}
          </View>
        </View>
      )}

      {searchQuery.length > 0 && isQueryActive && (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                paddingHorizontal: 16,
              }}
            >
              Resultados de la búsqueda
            </Text>
            <TouchableOpacity>
              <Text
                variant="labelLarge"
                style={{
                  paddingHorizontal: 16,
                }}
              >
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <View
            horizontal
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 16,
              marginBottom: 16,
              justifyContent: "center",
              gap: 16,
            }}
          >
            {highlightedListings.map((item, index) => (
              <ListingCard
                key={index + item.id}
                listing={item}
                type={"recent"}
              />
            ))}
          </View>
        </View>
      )}

      {!highlightedListings.length > 0 && !recentListings.length > 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 64,
          }}
        >
          <Text variant="labelLarge">No hay publicaciones</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userHomeWelcomeHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginTop: 64,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
