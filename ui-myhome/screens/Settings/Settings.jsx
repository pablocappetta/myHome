import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Switch,
  List,
  RadioButton,
  Appbar,
  IconButton,
} from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";
import { currencyOptions, languageOptions } from "./SettingsUtils";
import { useScrollToTop } from "@react-navigation/native";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("es");
  const [currency, setCurrency] = useState("ARS");

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
        <Appbar.Content title="Ajustes" />
      </Appbar.Header>
      <ScrollView style={styles.settingsContainer} ref={ref}>
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
