import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Switch, List, RadioButton, Appbar } from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";
import { currencyOptions, languageOptions } from "./SettingsUtils";

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

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Ajustes" />
      </Appbar.Header>
      <View style={styles.settingsContainer}>
        <List.Section>
          <List.Subheader>Modo Oscuro</List.Subheader>
          <List.Item
            title="Activar Modo Oscuro"
            left={() => (
              <List.Icon
                icon={theme.dark ? "brightness-7" : "weather-night"}
                style={{ paddingLeft: 8, paddingRight: 4 }}
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
              left={() => (
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
              left={() => (
                <RadioButton.Android
                  value={option.value}
                  status={currency === option.value ? "checked" : "unchecked"}
                  onPress={() => handleCurrencyChange(option.value)}
                />
              )}
            />
          ))}
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default Settings;
