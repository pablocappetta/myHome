import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  Appbar,
  Divider,
  Text,
} from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserContext } from "../../contexts/UserContext";
import { REACT_APP_API_URL } from "@env";
import { useTheme } from "../../contexts/ThemeContext";
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId:"1071870411265-o00cc4jm8vm5s4gaajjo95t54leu9809.apps.googleusercontent.com",
    iosClientId:"1071870411265-rdk3c5jc1l8jmhhkr7h03u7opbqe40vn.apps.googleusercontent.com",
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',

});



const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const Login = ({ navigation }) => {
  const { setUser } = useUserContext();
  const { theme } = useTheme();

  const handleLogin = (values) => {
    const requestBody = {
      email: values.email,
      password: values.password,
    };

    fetch("http://3.144.94.74:8000/api/" + "realtors/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUser({
          ...json.data,
          isRealtor: true,
          token: json.token,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        navigation.navigate("MiCuenta");
        navigation.navigate("tabHome");
      });
  };

  const handleGoogleLogin =async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

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
            <View style={styles.loginContainer}>
              <Image
                source={
                  !theme.dark
                    ? require("../../assets/images/logo.png")
                    : require("../../assets/images/logo-light.png")
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
                }}
              >
                Ingresar como usuario
              </Text>
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{
                      width: size * 1.5,
                      height: size * 1.5,
                      tintColor: color,
                    }}
                  />
                )}
                mode="contained"
                onPress={() => promptAsync()}
                style={styles.button}
              >
                Continuar con Google
              </Button>
              <Divider style={{ marginVertical: 16 }} />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                ¿Sos propietario?
              </Text>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const isEmailError = touched.email && !!errors.email;
                  const isPasswordError = touched.password && !!errors.password;
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
                      <TextInput
                        label="Contraseña"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        secureTextEntry
                        mode="outlined"
                        style={styles.input}
                        error={isPasswordError}
                        keyboardType="default"
                      />
                      <HelperText type="error" visible={isPasswordError}>
                        {errors.password}
                      </HelperText>
                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={
                          !values.email ||
                          !values.password ||
                          isPasswordError ||
                          isEmailError
                        }
                      >
                        Ingresar
                      </Button>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                          marginTop: 16,
                          alignContent: "center",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <Text
                          variant="labelLarge"
                          onPress={() => navigation.navigate("ForgotPassword")}
                        >
                          Me olvidé mi contraseña
                        </Text>
                        <Text
                          variant="labelLarge"
                          onPress={() => navigation.navigate("Register")}
                        >
                          ¿No tenés cuenta? ¡Registrate!
                        </Text>
                      </View>
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
  loginContainer: {
    padding: 32,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default Login;
