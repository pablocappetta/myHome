import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Avatar, Text, Searchbar, SegmentedButtons } from "react-native-paper";
import {
  getFilteredListingByQuery,
  getFilteredListingByType,
  segmentedButtons,
} from "./HomeUtils";
import ListingCard from "../../components/ListingCard/ListingCard";
import {
  mockedHighlightedListings,
  mockedRecentListings,
} from "./mock/MockedHomeData";
import { useUserContext } from "../../contexts/UserContext";
import { useScrollToTop } from "@react-navigation/native";

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

  const [filterSelection, setFilterSelection] = useState("todos");

  const ref = useRef(null);

  useScrollToTop(ref);

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
    <SafeAreaView>
      <ScrollView vertical ref={ref}>
        <TouchableOpacity
          style={styles.userHomeWelcomeHeader}
          onPress={() => navigation.navigate(isUserLogged ? "Perfil" : "Login")}
        >
          {isUserLogged ? (
            <Avatar.Image size={36} source={{ uri: user.profilePicture }} />
          ) : (
            <Avatar.Icon size={36} icon="account" />
          )}
          <Text variant="titleLarge">
            ¡Hola,{" "}
            <Text style={styles.userNameGreeting} numberOfLines={1}>
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

        {highlightedListings.length > 0 && !isQueryActive && (
          <View>
            <View style={styles.listingHeader}>
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
              <View style={styles.listingCardsContainer}>
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
            <View horizontal style={styles.listingCardsContainer}>
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
            <View style={styles.listingHeader}>
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
            <View horizontal style={styles.listingCardsContainer}>
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
          <View style={styles.noListingResultsContainer}>
            <Text variant="labelLarge">No hay publicaciones</Text>
          </View>
        )}
      </ScrollView>
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
});

export default Home;
