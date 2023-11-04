import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Card, IconButton, Text } from "react-native-paper";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Políticas de privacidad" />
        <Appbar.Action onPress={() => navigation.goBack()} icon="close" />
      </Appbar.Header>

      <ScrollView style={styles.privacyPolicyContainer}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text variant="titleLarge" style={{ paddingVertical: 8 }}>
            Introducción
          </Text>
          <Text style={{ textAlign: "justify" }} variant="bodyMedium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
            diam euismod, aliquam nunc quis, ultricies nisl. Donec aliquam, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
          </Text>
          <Text variant="titleLarge" style={{ paddingVertical: 8 }}>
            Justificación
          </Text>
          <Text style={{ textAlign: "justify" }} variant="bodyMedium">
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
          </Text>
          <Text variant="titleLarge" style={{ paddingVertical: 8 }}>
            Por último...
          </Text>
          <Text style={{ textAlign: "justify" }} variant="bodyMedium">
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl. Donec euismod, nisl vitae aliquam ultricies,
            nunc nisl ultrices nunc, vitae aliquam nisl nunc sit amet nisl.
            Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultrices
            nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl
            vitae aliquam ultricies, nunc nisl ultrices nunc, vitae aliquam nisl
            nunc sit amet nisl.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PrivacyPolicy;
