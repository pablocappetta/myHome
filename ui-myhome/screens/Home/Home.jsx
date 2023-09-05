import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

import { SegmentedButtons } from "react-native-paper";

import { Avatar, Card, Text, Searchbar, Chip } from "react-native-paper";
import {
  mockedHighlightedListings,
  mockedRecentListings,
} from "./mock/MockedHomeData";
import {
  getFilteredListingByQuery,
  getFilteredListingByType,
} from "./HomeUtils";

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
  };

  const handleSearchStringChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmitChange = ({ nativeEvent }) => {
    setSearchQuery(nativeEvent.text);
    setHighlightedListing(
      getFilteredListingByQuery(mockedHighlightedListings, nativeEvent.text)
    );
    setRecentListings(
      getFilteredListingByQuery(mockedRecentListings, nativeEvent.text)
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
          mode="bar"
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
            <Card
              key={index + item.id}
              style={{
                marginVertical: 8,
                marginLeft: 16,
                position: "relative",
              }}
              width={180}
              height={300}
            >
              <View>
                <Chip
                  icon={
                    item.listingType === "Alquiler"
                      ? "key-chain"
                      : "currency-usd"
                  }
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: 8,
                    top: 8,
                  }}
                >
                  {item.listingType}
                </Chip>
              </View>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Text variant="titleSmall" style={{ marginTop: 6 }}>
                  {item.type}
                </Text>
                <Text
                  variant="bodySmall"
                  numberOfLines={2}
                  style={{ width: "100%" }}
                >
                  {item.location}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: 12,
                    position: "absolute",
                    top: 64,
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
                    <Text variant="bodyMedium" style={{ fontWeight: 600 }}>
                      {item.currency}
                    </Text>
                    <Text variant="bodyMedium" style={{ fontWeight: 800 }}>
                      ${item.price}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
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
            <Card
              key={index + item.id}
              height={300}
              style={{
                marginVertical: 8,
                position: "relative",
                width: "45%",
                marginHorizontal: 8,
              }}
            >
              <View>
                <Chip
                  icon={
                    item.listingType === "Alquiler"
                      ? "key-chain"
                      : "currency-usd"
                  }
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    right: 8,
                    top: 8,
                  }}
                >
                  {item.listingType}
                </Chip>
              </View>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text variant="titleSmall" style={{ marginTop: 6 }}>
                  {item.type}
                </Text>
                <Text variant="bodySmall" numberOfLines={2}>
                  {item.location}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: 12,
                    position: "absolute",
                    top: 64,
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
                    <Text variant="bodyMedium" style={{ fontWeight: 600 }}>
                      {item.currency}
                    </Text>
                    <Text variant="bodyMedium" style={{ fontWeight: 800 }}>
                      ${item.price}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
