import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  Appbar,
  Text,
} from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

const bookingTitle = "Reservar propiedad";

const validationSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  telefono: yup
    .string()
    .matches(/^\d+$/, "Teléfono no válido")
    .required("El teléfono es obligatorio"),
});

const BookingInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={bookingTitle} />
      </Appbar.Header>

      <View>
        <Text
          variant="titleLarge"
          style={{ marginTop: 6, paddingHorizontal: 24, paddingTop: 40 }}
        >
          Ingresá tus datos de contacto
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerUserDetails}>
              <Formik
                initialValues={{ nombre: "", email: "", telefono: "" }}
                // validationSchema={validationSchema}
                onSubmit={() =>
                  navigation.navigate("Booking", { screen: "Payment" })
                }
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const isNameError = touched.nombre && !!errors.nombre;
                  const isEmailError = touched.email && !!errors.email;
                  const isPhoneError = touched.telefono && !!errors.telefono;
                  return (
                    <>
                      <View style={styles.containerInputs}>
                        <View>
                          <TextInput
                            label="Nombre"
                            value={values.nombre}
                            onChangeText={handleChange("nombre")}
                            mode="outlined"
                          />
                          <HelperText type="error" visible={isNameError}>
                            {errors.nombre}
                          </HelperText>
                        </View>
                        <View>
                          <TextInput
                            label="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            mode="outlined"
                            error={isEmailError}
                          />
                          <HelperText type="error" visible={isEmailError}>
                            {errors.email}
                          </HelperText>
                        </View>
                        <View>
                          <TextInput
                            label="Teléfono"
                            value={values.telefono}
                            onChangeText={handleChange("telefono")}
                            mode="outlined"
                            error={isPhoneError}
                            required
                          />
                          <HelperText type="error" visible={isPhoneError}>
                            {errors.telefono}
                          </HelperText>
                        </View>
                      </View>

                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        // disabled={
                        //   !values.nombre ||
                        //   !values.email ||
                        //   !values.telefono ||
                        //   isPhoneError ||
                        //   isEmailError
                        // }
                      >
                        Continuar
                      </Button>
                    </>
                  );
                }}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUserDetails: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  containerInputs: {
    display: "flex",
  },
  button: {
    marginTop: 226,
  },
});

export default BookingInfo;