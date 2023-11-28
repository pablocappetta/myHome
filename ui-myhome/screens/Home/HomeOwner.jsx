import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ListingCard from "../../components/ListingCard/ListingCard";
import { useUserContext } from "../../contexts/UserContext";
import { Avatar, Button, Icon, IconButton, Text } from "react-native-paper";
import { useScrollToTop } from "@react-navigation/native";

const HomeOwner = ({ navigation }) => {
  const { user, isUserLogged } = useUserContext();
  const [ownerListings, setOwnerListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useScrollToTop(ref);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch("http://3.144.94.74:8000/api/listings/realtor/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setOwnerListings(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetch("http://3.144.94.74:8000/api/listings/realtor/" + user._id)
      .then((response) => response.json())
      .then((data) => {
        setOwnerListings(data);
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
    <View>
      <FlatList
        ref={ref}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        data={DATA}
        renderItem={({ item }) => (
          <View className="mt-10 min-h-[680px]">
            <TouchableOpacity
              style={styles.userHomeWelcomeHeader}
              onPress={() =>
                navigation.navigate(isUserLogged ? "Perfil" : "Login")
              }
            >
              {isUserLogged ? (
                <Avatar.Image
                  size={48}
                  source={{ uri: user?.profilePicture || user?.logo }}
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 24,
                marginTop: 32,
                marginBottom: 0,
              }}
            >
              <Text className="font-bold text-[20px]">Mis publicaciones</Text>
              <Button
                icon="refresh"
                animated
                selected
                onPress={onRefresh}
                loading={refreshing}
              >
                {refreshing ? "Actualizando" : "Actualizar"}
              </Button>
            </View>
            <View horizontal style={styles.listingCardsContainer}>
              {loading ? (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#6750a4" />
                </View>
              ) : (
                <View horizontal style={styles.listingCardsContainer}>
                  {ownerListings.length > 0 ? (
                    ownerListings.map((item, index) => (
                      <TouchableOpacity
                        key={index + item._id}
                        onPress={() => navigation.navigate("Post", item)}
                      >
                        <ListingCard listing={item} type={"recent"} />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.containerListingsHome}>
                      <Icon source="home-flood" size={72} />
                      <Text variant="titleMedium">
                        No tenés propiedades publicadas 😔
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <IconButton
        onPress={() => navigation.navigate("NewPost")}
        mode="contained"
        style={{
          position: "absolute",
          right: 8,
          bottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
        }}
        icon="plus"
        size={32}
        selected
      />
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
  containerListingsHome: {
    display: "flex",
    margin: 24,
    alignItems: "center",
    gap: 48,
  },
});

export default HomeOwner;
