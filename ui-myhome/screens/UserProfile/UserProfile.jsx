import React, { useState } from "react";
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
import { useUserContext } from "../../contexts/UserContext";

const UserProfile = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleLogout = () => {
    setUser({});
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" />
      </Appbar.Header>
      <View style={styles.profileContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          style={styles.menuBar}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Avatar.Image
                size={180}
                source={{ uri: user.profilePicture }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="Modificar" leadingIcon="image" />
          <Divider />
          <Menu.Item
            onPress={() => {}}
            title="Eliminar"
            leadingIcon={"delete"}
          />
        </Menu>
        <Text
          style={styles.fullName}
          numberOfLines={1}
        >{`${user.name}`}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email} numberOfLines={1}>
            {user.email}
          </Text>
          <IconButton
            icon={user.isVerified ? "check" : "alert"}
            mode="contained"
            size={16}
          />
        </View>

        <View style={styles.actions}>
          <Button
            icon="heart"
            mode="contained-tonal"
            style={styles.actionButton}
            onPress={() => {}}
          >
            Ver Favoritos
          </Button>
          <Button
            icon="home"
            mode="contained-tonal"
            style={styles.actionButton}
            onPress={() => {}}
          >
            Mis Propiedades
          </Button>
        </View>

        <Button
          mode="outlined"
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {},
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  email: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginRight: 8,
  },
  logoutButton: {
    width: "100%",
  },
  menuBar: { marginLeft: 12, marginTop: 8 },
});

export default UserProfile;
