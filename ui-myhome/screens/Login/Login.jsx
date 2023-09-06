import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const Login = ({ navigation }) => {
  const handleLogin = (values) => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Iniciar sesión</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => {
          const isEmailValid = touched.email ? !errors.email : true;
          const isPasswordValid = touched.password ? !errors.password : true;

          return (
            <>
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                mode="outlined"
                style={styles.input}
                error={!isEmailValid}
              />
              <HelperText type="error" visible={!isEmailValid}>
                {errors.email}
              </HelperText>
              <TextInput
                label="Contraseña"
                value={values.password}
                onChangeText={handleChange("password")}
                secureTextEntry
                mode="outlined"
                style={styles.input}
                error={!isPasswordValid}
              />
              <HelperText type="error" visible={!isPasswordValid}>
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
