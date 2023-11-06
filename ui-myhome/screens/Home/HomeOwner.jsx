import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { mockedHighlightedListings } from "./mock/MockedHomeData";
import ListingCard from "../../components/ListingCard/ListingCard";
import { ScrollView } from "react-native-gesture-handler";
import { useUserContext } from "../../contexts/UserContext";
import { Avatar, Text } from "react-native-paper";

const HomeOwner = ({ navigation }) => {
  const { user, isUserLogged } = useUserContext();

  const [highlightedListings, setHighlightedListing] = useState(
    [].concat(mockedHighlightedListings)
  );

  return (
    <View>
      <ScrollView vertical className="mt-10">
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
          Mis Publicaciones
        </Text>
        <View horizontal style={styles.listingCardsContainer}>
          {highlightedListings.map((item, index) => (
            <TouchableOpacity
              key={index + item.id}
              onPress={() => navigation.navigate("Post", item)}
            >
              <ListingCard listing={item} type={"recent"} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        TouchableOpacity
        onPress={() => navigation.navigate("NewPost")}
        className="absolute right-3 bottom-3 rounded-full bg-[#6750a4] h-16 w-16 flex items-center justify-center"
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
