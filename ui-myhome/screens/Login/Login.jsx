import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const Login = ({ navigation }) => {
  const handleLogin = (values) => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/loginVector.png")}
        style={{
          width: 300,
          height: 300,
          alignSelf: "center",
        }}
      />

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
              />
              <HelperText type="error" visible={isPasswordError}>
                {errors.password}
              </HelperText>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
              >
                Iniciar sesión
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
