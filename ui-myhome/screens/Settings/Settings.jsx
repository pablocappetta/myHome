import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  Switch,
  List,
  RadioButton,
  Appbar,
  IconButton,
  Card,
  Text,
  Button,
} from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";
import { currencyOptions, languageOptions } from "./SettingsUtils";
import { useScrollToTop } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";

const Settings = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("es");
  const [currency, setCurrency] = useState("ARS");
  const { user, isUserLogged } = useUserContext();

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Mi Cuenta" />
      </Appbar.Header>
      <ScrollView style={styles.settingsContainer} ref={ref}>
        {!isUserLogged && (
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
                  Iniciar Sesión
                </Button>
                <Button
                  onPress={() => navigation.navigate("Register")}
                  width={138}
                >
                  Registrarse
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}
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
          <TouchableOpacity onPress={() => {}} style={styles.userActionsButton}>
            <Card>
              <Card.Content style={styles.userActionsButtonCardContent}>
                <IconButton icon={"book"} style={{ marginLeft: 0 }} />
                <Text>Mis Reservas</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
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
              <Switch value={theme.dark} onValueChange={toggleTheme} />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Idioma</List.Subheader>
          {languageOptions.map((option) => (
            <List.Item
              key={option.value}
              title={option.label}
              onPress={() => handleLanguageChange(option.value)}
              right={() => (
                <RadioButton.Android
                  value={option.value}
                  status={language === option.value ? "checked" : "unchecked"}
                  onPress={() => handleLanguageChange(option.value)}
                />
              )}
            />
          ))}
        </List.Section>

        <List.Section>
          <List.Subheader>Moneda</List.Subheader>
          {currencyOptions.map((option) => (
            <List.Item
              key={option.value}
              title={option.label}
              onPress={() => handleCurrencyChange(option.value)}
              right={() => (
                <RadioButton.Android
                  value={option.value}
                  status={currency === option.value ? "checked" : "unchecked"}
                  onPress={() => handleCurrencyChange(option.value)}
                />
              )}
            />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBannerContainer: {
    marginTop: 16,
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
  settingsContainer: {
    paddingHorizontal: 16,
  },
});

export default Settings;
