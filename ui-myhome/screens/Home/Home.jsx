import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ToastAndroid,
} from "react-native";
import {
  Avatar,
  Text,
  Searchbar,
  SegmentedButtons,
  Button,
} from "react-native-paper";
import {
  getFilteredListingByQuery,
  getFilteredListingByType,
  segmentedButtons,
} from "../Login/HomeUtils";
import ListingCard from "../../components/ListingCard/ListingCard";
import {
  mockedHighlightedListings,
  mockedRecentListings,
} from "./mock/MockedHomeData";
import { useUserContext } from "../../contexts/UserContext";
import { useScrollToTop } from "@react-navigation/native";
import * as Location from "expo-location";

Location.requestForegroundPermissionsAsync();

const Home = ({ navigation }) => {
  const { user, isUserLogged } = useUserContext();

  const [searchQuery, setSearchQuery] = useState("");

  const [isQueryActive, setIsQueryActive] = useState(false);

  const [highlightedListings, setHighlightedListing] = useState(
    [].concat(mockedHighlightedListings)
  );

  const [recentListings, setRecentListings] = useState(
    [].concat(mockedRecentListings)
  );

  const [nearListings, setNearListings] = useState([]);

  const [location, setLocation] = useState(null);

  const radioInMeters = 5000;

  const [filterSelection, setFilterSelection] = useState("todos");

  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingRecent, setLoadingRecent] = useState(false);

  const ref = useRef(null);

  useScrollToTop(ref);

  const hasItLocationEnabled = async () =>
    await Location.hasServicesEnabledAsync();

  useEffect(() => {
    if (location === null) {
      Location.getCurrentPositionAsync().then((location) => {
        console.log(location);
        setLocation(location);
      });
    } else {
      getNearbyListings();
    }
  }, []);

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

  const getNearbyListings = async () => {
    console.log(location);
    if (!location?.coords?.latitude || !location?.coords?.longitude) {
      ToastAndroid.show("No se pudo obtener tu ubicación", ToastAndroid.LONG);
      return;
    }
    setLoadingRecent(true);
    await fetch(
      "http://3.144.94.74:8000/api/listings/nearby?" +
        `${
          location?.coords?.longitude
            ? `longitude=${location?.coords?.longitude}`
            : ""
        }&${
          location?.coords?.latitude
            ? `latitude=${location?.coords?.latitude}`
            : ""
        }&${
          location?.coords?.latitude && location?.coords?.longitude
            ? `radius=${radioInMeters}`
            : ""
        }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.json();
        setNearListings(data);
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show(
          "Error al obtener publicaciones cercanas",
          ToastAndroid.LONG
        );
      })
      .finally(() => setLoadingRecent(false));
  };

  const handleSearchSubmitChange = ({ nativeEvent }) => {
    navigation.navigate("Search", {
      searchText: nativeEvent.text,
      listings: recentListings,
    });
    setSearchQuery(nativeEvent.text);
    setHighlightedListing(
      getFilteredListingByQuery(highlightedListings, nativeEvent.text)
    );
    // setRecentListings(
    //   getFilteredListingByQuery(recentListings, nativeEvent.text)
    // );
    setIsQueryActive(true);
  };

  const handleSearchClearIconPress = () => {
    setSearchQuery("");
    setHighlightedListing(mockedHighlightedListings);
    setRecentListings(mockedRecentListings);
    setIsQueryActive(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch("http://3.144.94.74:8000/api/listings/")
      .then((response) => response.json())
      .then((data) => {
        setRecentListings(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetch("http://3.144.94.74:8000/api/listings/")
      .then((response) => response.json())
      .then((data) => {
        setRecentListings(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const DATA = [
    {
      id: "1",
      title: "home",
    },
  ];

  return (
    <SafeAreaView>
      {!user.isRealtor && (
        <FlatList
          ref={ref}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.userHomeWelcomeHeader}
                onPress={() =>
                  navigation.navigate(isUserLogged ? "Perfil" : "Login")
                }
              >
                {isUserLogged ? (
                  <Avatar.Image
                    size={36}
                    source={{ uri: user?.logo || user?.profilePicture }}
                  />
                ) : (
                  <Avatar.Icon size={36} icon="account" />
                )}
                <Text variant="titleLarge">
                  ¡Hola,{" "}
                  <Text
                    className="font-bold"
                    style={styles.userNameGreeting}
                    numberOfLines={1}
                  >
                    {isUserLogged ? user.name : "invitado"}
                  </Text>
                  !
                </Text>
              </TouchableOpacity>
              <View>
                <SegmentedButtons
                  buttons={segmentedButtons}
                  value={filterSelection}
                  onValueChange={handleButtonFilterChange}
                  style={styles.segmentedButtons}
                />
              </View>

              <View style={styles.searchBarContainer}>
                <Searchbar
                  placeholder="Buscar..."
                  onChangeText={handleSearchStringChange}
                  onSubmitEditing={handleSearchSubmitChange}
                  onClearIconPress={handleSearchClearIconPress}
                  value={searchQuery}
                />
              </View>

              {hasItLocationEnabled && !isQueryActive && (
                <View>
                  <View style={styles.listingHeader}>
                    <Text
                      variant="titleLarge"
                      style={{
                        paddingHorizontal: 16,
                      }}
                    >
                      Cerca tuyo
                    </Text>
                    <TouchableOpacity>
                      <Button
                        icon="refresh"
                        animated
                        selected
                        onPress={getNearbyListings}
                        loading={loadingRecent}
                      >
                        {loadingRecent ? "Actualizando" : "Actualizar"}
                      </Button>
                    </TouchableOpacity>
                  </View>

                  <ScrollView horizontal style={{ paddingHorizontal: 8 }}>
                    <View style={styles.listingCardsContainer}>
                      {nearListings.length > 0 ? (
                        nearListings.map((item, index) => (
                          <TouchableOpacity
                            key={Math.random()}
                            onPress={() => navigation.navigate("Post", item)}
                          >
                            <ListingCard listing={item} type={"highlighted"} />
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View style={styles.noNearResultsContainer}>
                          <Text variant="labelLarge">No hay publicaciones</Text>
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </View>
              )}

              {recentListings.length > 0 && !isQueryActive && (
                <View>
                  <View style={styles.listingHeader}>
                    <Text
                      variant="titleLarge"
                      style={{
                        paddingHorizontal: 16,
                      }}
                    >
                      Últimas publicaciones
                    </Text>
                    <TouchableOpacity>
                      <Button
                        icon="refresh"
                        animated
                        selected
                        onPress={onRefresh}
                        loading={refreshing}
                      >
                        {refreshing ? "Actualizando" : "Actualizar"}
                      </Button>
                    </TouchableOpacity>
                  </View>
                  <View horizontal style={styles.listingCardsContainer}>
                    {recentListings.map((item, index) => (
                      <TouchableOpacity
                        key={Math.random()}
                        onPress={() => navigation.navigate("Post", item)}
                      >
                        <ListingCard listing={item} type={"recent"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {searchQuery.length > 0 && isQueryActive && (
                <View>
                  <View style={styles.listingHeader}>
                    <Text
                      variant="titleLarge"
                      style={{
                        paddingHorizontal: 16,
                      }}
                    >
                      Resultados de la búsqueda
                    </Text>
                  </View>
                  <View horizontal style={styles.listingCardsContainer}>
                    {highlightedListings.map((item, index) => (
                      <TouchableOpacity
                        key={Math.random()}
                        onPress={() => navigation.navigate("Post", item)}
                      >
                        <ListingCard listing={item} type={"recent"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {!highlightedListings.length > 0 &&
                !recentListings.length > 0 && (
                  <View style={styles.noListingResultsContainer}>
                    <Text variant="labelLarge">No hay publicaciones</Text>
                  </View>
                )}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userHomeWelcomeHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginTop: 48,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
  },
  userNameGreeting: {
    fontWeight: 800,
  },
  segmentedButtons: {
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 48,
  },
  searchBarContainer: {
    display: "flex",
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listingHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  listingCardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "center",
    gap: 16,
  },
  noListingResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 64,
  },
  noNearResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default Home;
