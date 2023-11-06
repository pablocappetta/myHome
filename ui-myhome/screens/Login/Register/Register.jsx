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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresá un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
    name: yup.string().required("El nombre es obligatorio"),
    phone: yup.string().matches(phoneRegExp, "Ingrese un formato valido para el numero de teléfono").required("El teléfono es obligatorio"),
});

const Register = ({ navigation }) => {
  const { setUser } = useUserContext();


  const handleRegister = (values) => {
    const requestBody = {
                    name: values.name,
                    loginEmail: values.email,
                    password: values.password,
                    contactEmail: values.email,
                    phone: values.phone,
                    // logo: "https://dummyimage.com/600x400/000/fff"
            }
            console.log(requestBody);
            fetch(REACT_APP_API_URL + 'realtors', {
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
            })
                    .then(response => {
                            if (response.ok) {
                                    ToastAndroid.show("Registro Exitoso, ingrese con sus datos", ToastAndroid.LONG);
                                    navigation.navigate("Login");
                            } else {
                                    throw new Error('Network response was not ok');
                            }
                    })
                    .catch(error => {
                            console.log(error);
                    });
            console.log(values);
            
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
                            <View style={styles.registerContainer}>
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
                                >Crear tu cuenta</Text>
                                <Formik
                                    initialValues={{ email: "", name: "", password: "" }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({ handleChange, handleSubmit, values, errors, touched }) => {
                                        const isEmailError = touched.email && !!errors.email;
                                        const isPasswordError = touched.password && !!errors.password;
                                        const isNameError = touched.name && !!errors.name;
                                        const isPhoneError = touched.phone && !!errors.phone;
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
                                                    label="Teléfono"
                                                    value={values.phone}
                                                    onChangeText={handleChange("phone")}
                                                    mode="outlined"
                                                    style={styles.input}
                                                    error={isPhoneError}
                                                    keyboardType="email-address"
                                                />
                                                <HelperText type="error" visible={isPhoneError}>
                                                    {errors.phone}
                                                </HelperText>
                                                <TextInput
                                                    label="Nombre"
                                                    value={values.name}
                                                    onChangeText={handleChange("name")}
                                                    mode="outlined"
                                                    style={styles.input}
                                                    error={isNameError}
                                                    keyboardType="default"
                                                />
                                                <HelperText type="error" visible={isNameError}>
                                                    {errors.name}
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
                                                        isEmailError ||
                                                    !values.name ||
                                                            isNameError || 
                                                            !values.phone ||
                                                            isPhoneError
                                                    }
                                                >
                                                    Registrarse
                                                </Button>
                                                <View style={{
                                                    flexDirection: 'column', justifyContent: 'space-between', marginTop: 16,
                                                    alignContent: 'center', alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        color: '#6750A4',
                                                        fontWeight: 'bold',
                                                    }}
                                                    onPress={() => navigation.navigate('Login')}
                                                    >Ya tenes cuenta? Ingresar</Text>
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
        registerContainer: {
            padding: 32,
            justifyContent: "center",
        },
        button: {
            marginTop: 8,
        },
    });

    export default Register;
