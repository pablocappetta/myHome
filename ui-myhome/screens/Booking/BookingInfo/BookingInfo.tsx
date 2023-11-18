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
  telefono: yup.string().required("El teléfono es obligatorio"),
});

const BookingInfo = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Appbar.Header>
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
          <View style={styles.containerUserDetails}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <Formik
                  initialValues={{ nombre: "", email: "", telefono: "" }}
                  validationSchema={validationSchema}
                  onSubmit={() =>
                    navigation.navigate("Booking", { screen: "Payment" })
                  }
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => {
                    const isNameError = touched.nombre && !!errors.nombre;
                    const isEmailError = touched.email && !!errors.email;
                    const isPhoneError = touched.telefono && !!errors.telefono;
                    return (
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
                        <TextInput
                          label="Email"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          mode="outlined"
                          error={isEmailError}
                          keyboardType="email-address"
                        />
                        <HelperText type="error" visible={isEmailError}>
                          {errors.email}
                        </HelperText>
                        <TextInput
                          label="Teléfono"
                          value={values.telefono}
                          onChangeText={handleChange("telefono")}
                          mode="outlined"
                          error={isPhoneError}
                          keyboardType="phone-pad"
                        />
                        <HelperText type="error" visible={isPhoneError}>
                          {errors.telefono}
                        </HelperText>

                        <Button
                          mode="contained"
                          onPress={handleSubmit}
                          style={styles.button}
                          disabled={
                            !values.nombre ||
                            !values.email ||
                            !values.telefono ||
                            isPhoneError ||
                            isEmailError
                          }
                        >
                          Continuar
                        </Button>
                      </View>
                    );
                  }}
                </Formik>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  button: {
    width: "100%",
    position: "absolute",
    top: 458,
  },
});

export default BookingInfo;
