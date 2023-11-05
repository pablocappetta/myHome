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
} from "react-native";
import { TextInput, Button, HelperText, Appbar, IconButton, Divider, Text } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserContext } from "../../contexts/UserContext";
import { mockedUser } from "./mock/MockedLoginData";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const Login = ({ navigation }) => {
  const { setUser } = useUserContext();

  const handleLogin = (values) => {
    setUser(mockedUser);
    console.log(values);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <ScrollView vertical automaticallyAdjustKeyboardInsets={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
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
              >Ingresar como usuario</Text>
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
                onPress={() => console.log("Google login pressed")}
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
                  color: "#FFFFFF",
                }}
              >¿Sos propietario?</Text>
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
                      <View style={{
                        flexDirection: 'column', justifyContent: 'space-between', marginTop: 16,
                        alignContent: 'center', alignItems: 'center'
                      }}>
                        <Text style={{
                          color: '#6750A4',
                          fontWeight: 'bold',
                        }}
                        onPress={() => navigation.navigate('ForgotPassword')}
                        >Me olvide mi contraseña</Text>
                        <Text style={{ color: '#6750A4', fontWeight: 'bold' }} onPress={() => navigation.navigate('Register')}>¿No tenés cuenta? Registrarse</Text>
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
  button: {
    marginTop: 8,
  },
});

export default Login;
