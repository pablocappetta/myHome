import React from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  Appbar,
  IconButton,
  Divider,
  Text,
} from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserContext } from "../../../contexts/UserContext";
import { REACT_APP_API_URL } from "@env";
import { useTheme } from "../../../contexts/ThemeContext";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
});

const ForgotPassword = ({ navigation }) => {
  const { theme } = useTheme();

  const handlePasswordChange = (values) => {
    const requestBody = {
      email: values.email,
    };
    console.log(requestBody);
    fetch("http://3.144.94.74:8000/api/" + "realtors/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          ToastAndroid.show(
            "Te enviamos un mail con un codigo para cambiar tu contraseña",
            ToastAndroid.LONG
          );
          navigation.navigate("PasswordRecovery");
        } else {
          ToastAndroid.show(
            "Ocurrio un error, revisá que el mail sea correcto o intente de nuevo más tarde.",
            ToastAndroid.LONG
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Olvidé mi contraseña" />
      </Appbar.Header>
      <ScrollView vertical automaticallyAdjustKeyboardInsets={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.passwordChangeContainer}>
              <Image
                source={
                  !theme.dark
                    ? require("../../../assets/images/logo.png")
                    : require("../../../assets/images/logo-light.png")
                }
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: "center",
                }}
              />

              <Text variant="bodyMedium" marginBottom={16}>
                Ingresá tu mail de registro y te enviaremos un correo
                electrónico con un código para restablecer tu contraseña.
              </Text>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handlePasswordChange}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const isEmailError = touched.email && !!errors.email;
                  return (
                    <>
                      <TextInput
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        mode="outlined"
                        style={styles.input}
                        error={isEmailError}
                        keyboardType="email-address"
                      />
                      <HelperText type="error" visible={isEmailError}>
                        {errors.email}
                      </HelperText>
                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={!values.email || isEmailError}
                      >
                        Enviar
                      </Button>
                    </>
                  );
                }}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  passwordChangeContainer: {
    padding: 32,
    justifyContent: "center",
  },
  button: {
    marginTop: 8,
  },
});

export default ForgotPassword;
