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
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "../../contexts/FirebaseContext";
import * as Google from "expo-auth-session/providers/google";



const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const Login = ({ navigation }) => {
  const fireBaseApp = useFirebase();
  const provider = new GoogleAuthProvider(fireBaseApp);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "78227269948-mk5jjqg671rssjhev8bvikpkbdpntb8a.apps.googleusercontent.com",
    androidClientId: "78227269948-hoo6255a6a4e8uq3i8luo648kgpraiq4.apps.googleusercontent.com",
  });

  const auth = getAuth(fireBaseApp);

  React.useEffect( () => {
    if (response?.type === "success") { 
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential).then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      }).catch((error) => {
        console.log(error)
      }
      )
    }
  }, [response]);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
      } else {
        console.log("no user")
      }
    });
    return () => unsub();
  }, [])
  



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

  const handleGoogleLogin = async () => {
    try {
      const response = await singIn(auth, provider)
      const { user } = response
      const token = await user.getIdToken()
      const idTokenResult = await user.getIdTokenResult()
      if (hasuraClaim) {
        setUser({
          ...user,
          token,
          isRealtor: false,
        });
      }
    } catch (error) { 
      console.log(error)
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
