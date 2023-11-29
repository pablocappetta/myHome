import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Switch,
  List,
  Appbar,
  IconButton,
  Card,
  Text,
  Button,
  Avatar,
  Divider,
} from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";
import { useScrollToTop } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";

const Settings = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isUserLogged, wipeUserData } = useUserContext();

  const handleLogout = () => {
    wipeUserData();
    navigation.navigate("tabBuscar");
  };

  const handleDeleteAccount = () => {
    // Call API to delete account
    const userId = user.id;
    // Replace `API_ENDPOINT` with the actual endpoint for deleting an account
    fetch(`API_ENDPOINT/deleteAccount?userId=${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response
        wipeUserData();
        navigation.navigate("tabBuscar");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting account:", error);
      });
  };

  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.settingsContainer} ref={ref}>
        {!isUserLogged ? (
          <View style={styles.topBannerContainer}>
            <Card>
              <IconButton icon={"home-circle"} size={32} />
              <Card.Content>
                <Text>
                  Accedé a tus reservas, favoritos y publicaciones desde tu
                  cuenta. Si no estás registrado, podés hacerlo desde acá.
                </Text>
              </Card.Content>

              <Card.Actions style={styles.topBannerCardActionsContainer}>
                <Button
                  onPress={() => navigation.navigate("Login")}
                  width={138}
                >
                  Ingresar
                </Button>
                <Button
                  onPress={() => navigation.navigate("Register")}
                  width={138}
                  icon={"account-plus"}
                >
                  Registrarse
                </Button>
              </Card.Actions>
            </Card>
          </View>
        ) : (
          <View style={styles.containerUserDetails}>
            <Avatar.Image
              size={48}
              source={{ uri: user?.logo || user?.profilePicture }}
            />

            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text variant="titleLarge" numberOfLines={1}>
                {user.name}
              </Text>
              <Text variant="labelSmall" numberOfLines={1}>
                {user.loginEmail || user.email}
              </Text>
            </View>
          </View>
        )}
        {isUserLogged && (
          <View style={styles.userActionsButtonContainer}>
            <TouchableOpacity
              onPress={() =>
                isUserLogged
                  ? navigation.navigate("Perfil")
                  : navigation.navigate("Login")
              }
              style={styles.userActionsButton}
            >
              <Card>
                <Card.Content style={styles.userActionsButtonCardContent}>
                  <IconButton icon={"account"} style={{ marginLeft: 0 }} />
                  <Text>Mi Perfil</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MisReservas")}
              style={styles.userActionsButton}
            >
              <Card>
                <Card.Content style={styles.userActionsButtonCardContent}>
                  <IconButton icon={"book"} style={{ marginLeft: 0 }} />
                  <Text>Mis Reservas</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        )}
        <List.Section>
          <List.Subheader>Modo Oscuro</List.Subheader>
          <List.Item
            title="Modo Oscuro"
            left={() => (
              <IconButton
                icon={theme.dark ? "weather-night" : "white-balance-sunny"}
              />
            )}
            right={() => (
              <Switch
                value={theme.dark}
                onValueChange={toggleTheme}
                style={{ alignSelf: "center" }}
              />
            )}
            onPress={toggleTheme}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Privacidad y legal</List.Subheader>
          <List.Item
            title="Políticas de privacidad"
            left={() => <IconButton icon={"file-document-outline"} />}
            right={() => <IconButton icon={"chevron-right"} />}
            onPress={() => navigation.navigate("Privacidad")}
          />
          <Divider />
          <List.Item
            title="Términos y condiciones"
            left={() => <IconButton icon={"information-outline"} />}
            right={() => <IconButton icon={"chevron-right"} />}
            onPress={() => navigation.navigate("Terms")}
          />
        </List.Section>

        {isUserLogged && (
          <List.Section>
            <List.Subheader>Seguridad de la cuenta</List.Subheader>
            <List.Item
              title="Cerrar sesión"
              left={() => <IconButton icon={"logout"} />}
              onPress={handleLogout}
            />
            <List.Item
              title="Eliminar cuenta"
              left={() => <IconButton icon={"delete"} />}
              onPress={handleDeleteAccount}
            />
          </List.Section>
        )}

        <Text style={{ paddingVertical: 24 }}>
          Versión de la aplicación: {require("../../package.json").version}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBannerContainer: {
    marginTop: 48,
    width: "98%",
    alignSelf: "center",
  },
  topBannerCardActionsContainer: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
    gap: 16,
    paddingRight: 16,
  },
  userActionsButtonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 16,
    width: "99%",
    alignSelf: "center",
  },
  userActionsButton: { width: "47%" },
  userActionsButtonCardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 64,
  },
  containerUserDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 48,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  settingsContainer: {
    paddingHorizontal: 16,
  },
});

export default Settings;
