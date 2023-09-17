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
          <View style={{ width: "100%", marginTop: 16 }}>
            <Card>
              <IconButton icon={"home-circle"} size={32} />
              <Card.Content>
                <Text>
                  Accedé a tus reservas, favoritos y publicaciones desde tu
                  cuenta. Si no tenés una cuenta, podés crear una ahora.
                </Text>
              </Card.Content>

              <Card.Actions
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 8,
                  marginBottom: 8,
                  gap: 16,
                }}
              >
                <Button onPress={() => navigation.navigate("Login")}>
                  Iniciar Sesión
                </Button>
                <Button onPress={() => navigation.navigate("Register")}>
                  Registrarse
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Perfil")}
            style={{ width: "47%" }}
          >
            <Card>
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                }}
              >
                <IconButton icon={"account"} style={{ marginLeft: 0 }} />
                <Text>Mi Perfil</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{ width: "47%" }}>
            <Card>
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                }}
              >
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
  settingsContainer: {
    paddingHorizontal: 16,
  },
});

export default Settings;
