import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  Text,
} from "react-native-paper";

const Favorites = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <View style={styles.favoritesContainer}>
        <Text style={styles.fullName} numberOfLines={1}>
          Favoritos
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoritesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export default Favorites;
