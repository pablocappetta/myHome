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
  ToastAndroid
} from "react-native";
import { TextInput, Button, HelperText, Appbar, IconButton, Divider, Text } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { useUserContext } from "../../../contexts/UserContext";
import { REACT_APP_API_URL } from "@env";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
});

const ForgotPassword = ({ navigation }) => {

  const handlePasswordChange = (values) => {
    const requestBody = {
                    email: values.email,
            }
            console.log(requestBody);
            fetch(REACT_APP_API_URL + 'realtors/password-reset', {
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
            })
                    .then(response => {
                            if (response.ok) {
                                ToastAndroid.show("Recibiras un mail para restablecer tu contraseña.", ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Ocurrio un error, intente de nuevo mas tarde.", ToastAndroid.LONG);
                            }
                    })
                    .catch(error => {
                            console.log(error);
                    });            
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
                            <View style={styles.passwordChangeContainer}>
                                <Image
                                    source={require("../../../assets/images/logo.png")}
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
                                >Recuperar Contraseña</Text>
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
                                                    disabled={
                                                        !values.email ||
                                                        isEmailError
                                                    }
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
