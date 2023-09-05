import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

import { SegmentedButtons } from "react-native-paper";

import { Avatar, Text, Searchbar } from "react-native-paper";
import {
  mockedHighlightedListings,
  mockedRecentListings,
} from "./mock/MockedHomeData";
import {
  getFilteredListingByQuery,
  getFilteredListingByType,
} from "./HomeUtils";
import ListingCard from "../../components/ListingCard/ListingCard";

const Home = ({ navigation }) => {
  const user = {
    name: "Pablo",
  };

  const [searchQuery, setSearchQuery] = useState("");

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
  };

  const handleSearchClearIconPress = () => {
    setSearchQuery("");
    setHighlightedListing(mockedHighlightedListings);
    setRecentListings(mockedRecentListings);
  };

  return (
    <ScrollView vertical>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          marginTop: 64,
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          size={36}
          source={require("../../assets/images/pablo.png")}
        />
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
        <ScrollView
          horizontal
          style={{
            marginTop: 16,
            marginBottom: 16,
            paddingBottom: 4,
          }}
        >
          {highlightedListings.map((item, index) => (
            <ListingCard
              key={index + item.id}
              listing={item}
              type={"highlighted"}
            />
          ))}
        </ScrollView>
      </View>

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
          }}
        >
          {recentListings.map((item, index) => (
            <ListingCard key={index + item.id} listing={item} type={"recent"} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
