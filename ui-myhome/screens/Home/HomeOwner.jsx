import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ListingCard from "../../components/ListingCard/ListingCard";
import { ScrollView } from "react-native-gesture-handler";
import { useUserContext } from "../../contexts/UserContext";
import { Avatar, Text } from "react-native-paper";

const HomeOwner = ({ navigation }) => {
  const { user, isUserLogged } = useUserContext();
  const [highlightedListings, setHighlightedListing] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch("http://3.144.94.74:8000/api/listings/realtor/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setHighlightedListing(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetch("http://3.144.94.74:8000/api/listings/realtor/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setHighlightedListing(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <ScrollView
        vertical
        className="mt-10 min-h-[680px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        <Text className="font-bold text-[20px] pl-4 mt-6">
          Mis publicaciones
        </Text>
        <View horizontal style={styles.listingCardsContainer}>
          {loading ? (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color="#6750a4" />
            </View>
          ) : (
            <View horizontal style={styles.listingCardsContainer}>
              {highlightedListings.length > 0 &&
                highlightedListings.map((item, index) => (
                  <TouchableOpacity
                    key={index + item._id}
                    onPress={() => navigation.navigate("Post", item)}
                  >
                    <ListingCard listing={item} type={"recent"} />
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        TouchableOpacity
        onPress={() => navigation.navigate("NewPost")}
        className="absolute right-3 bottom-8 rounded-full bg-[#6750a4] h-16 w-16 flex items-center justify-center"
      >
        <Text className="text-[30px] text-white">+</Text>
      </TouchableOpacity>
    </View>
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
  listingCardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "center",
    gap: 16,
  },
});

export default HomeOwner;
