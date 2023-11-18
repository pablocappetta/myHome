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
import { REACT_APP_API_URL } from "@env";
import { useTheme } from "../../../contexts/ThemeContext";

const validationSchema = yup.object().shape({
  token: yup.string().required("El codigo es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const PasswordRecovery = ({ navigation }) => {
  const { theme } = useTheme();

  const handlePasswordChange = (values) => {
    const requestBody = {
      password: values.password,
    };
    console.log(requestBody);
    fetch(
      "http://3.144.94.74:8000/api/" +
        "realtors/password-reset/" +
        values.token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => {
        if (response.ok) {
          ToastAndroid.show("Contraseña cambiada", ToastAndroid.LONG);
          navigation.navigate("Login");
        } else {
          ToastAndroid.show(
            "Ocurrio un error, intente de nuevo mas tarde.",
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
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 16,
                  color: "#FFFFFF",
                }}
              >
                Modificar contraseña
              </Text>
              <Formik
                initialValues={{ token: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handlePasswordChange}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const isTokenError = touched.token && !!errors.token;
                  const isPasswordError = touched.password && !!errors.password;
                  return (
                    <>
                      <TextInput
                        label="Token"
                        value={values.token}
                        onChangeText={handleChange("token")}
                        mode="outlined"
                        style={styles.input}
                        error={isTokenError}
                        keyboardType="default"
                      />
                      <HelperText type="info" visible={true}>
                        Ingrese el codigo recibido por mail
                      </HelperText>
                      <TextInput
                        label="Contraseña Nueva"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        mode="outlined"
                        style={styles.input}
                        error={isPasswordError}
                        secureTextEntry={true}
                        keyboardType="default"
                      />
                      <HelperText type="error" visible={isPasswordError}>
                        Ingrese el codigo recibido por mail
                      </HelperText>
                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={
                          !values.token ||
                          isTokenError ||
                          !values.password ||
                          isPasswordError
                        }
                      >
                        Modificar contraseña
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

export default PasswordRecovery;
