import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
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
import * as ImagePicker from "expo-image-picker";

const UserProfile = ({ navigation }) => {
  const { user, setIsUserLogged, wipeUserData, setUser } = useUserContext();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleLogout = () => {
    wipeUserData();
    navigation.navigate("MiCuenta");
    navigation.navigate("Home");
  };

  // Manejo de imagen
  const [image, setImage] = React.useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  function deleteImage() {
    ToastAndroid.show("Foto de perfil eliminada", ToastAndroid.LONG);
    const requestBody = {
      name: user.name,
      contactEmail: user.contactEmail,
      phone: user.phone,
      logo: null,
    };
    console.log(requestBody);
    fetch("http://3.144.94.74:8000/api/realtors/" + user._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let token = user.token;
        setUser({
          ...json,
          isRealtor: true,
          token: token,
        });
      });
  }

  const handleFileUpload = async () => {
    console.debug("imagen");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets);
      changeUserImage(result.assets);
    }
  };

  function changeUserImage(URI) {
    ToastAndroid.show("Foto de perfil actualizada", ToastAndroid.LONG);

    const requestBody = {
      name: user.name,
      contactEmail: user.contactEmail,
      phone: user.phone,
      logo: URI[0].uri,
    };
    console.log(requestBody);
    fetch("http://3.144.94.74:8000/api/realtors/" + user._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let token = user.token;
        setUser({
          ...json,
          isRealtor: true,
          token: token,
        });
      });
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
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
                source={{
                  uri:
                    image[0]?.uri ||
                    user?.logo ||
                    user?.profilePicture ||
                    "https://api-private.atlassian.com/users/50b335ba706e5610e24fdea2b4af98f8/avatar",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={handleFileUpload}
            title="Modificar"
            leadingIcon="image"
          />
          <Divider />
          <Menu.Item
            onPress={deleteImage}
            title="Eliminar"
            leadingIcon={"delete"}
          />
        </Menu>
        <Text style={styles.fullName} numberOfLines={1}>{`${user.name}`}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email} numberOfLines={1}>
            {user.loginEmail || user.contactEmail || user.email}
          </Text>
          <IconButton
            icon={user.isRealtor ? "check" : "alert"}
            mode="contained"
            size={16}
          />
        </View>

        <View style={styles.actions}>
          {!user.isRealtor ? (
            <View style={styles.actions}>
              <Button
                mode="outlined"
                style={styles.actionButton}
                onPress={() => navigation.navigate("EditProf")}
                icon={"account-edit"}
              >
                Editar mi perfil
              </Button>
              <Button
                icon="heart"
                mode="contained-tonal"
                style={styles.actionButton}
                onPress={() => navigation.navigate("Favoritos")}
              >
                Ver Favoritos
              </Button>
            </View>
          ) : (
            <Button
              mode="outlined"
              style={styles.actionButton}
              onPress={() => navigation.navigate("EditProf")}
              icon={"account-edit"}
            >
              Editar mi perfil
            </Button>
          )}
        </View>

        <Button
          mode="contained"
          style={styles.logoutButton}
          onPress={handleLogout}
          icon={"logout"}
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
