import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Image, StyleSheet, ToastAndroid, View } from "react-native";
import { Appbar, Avatar, Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

export default function EditProfile({ navigation }) {
  const { user, setUser } = useUserContext();

  // Manejo de imagen
  const [image, setImage] = React.useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleFileUpload = async () => {
    console.debug("imagen");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  function handlePasswordRecovery() {
    const requestBody = {
      email: user.loginEmail,
    };
    console.log(requestBody);
    fetch("http://3.144.94.74:8000/api/" + "realtors/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          ToastAndroid.show(
            "Te enviamos un mail con un codigo para cambiar tu contraseña",
            ToastAndroid.LONG
          );
          navigation.navigate("PasswordRecovery");
        } else {
          ToastAndroid.show(
            "Ocurrio un error, revisá que el mail sea correcto o intente de nuevo más tarde.",
            ToastAndroid.LONG
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [name, setName] = useState();
  const [contactEmail, setContactEmail] = useState();
  const [phone, setPhone] = useState();

  function handleChanges() {
    const requestBody = {
      name: name || user.name,
      contactEmail: contactEmail || user.contactEmail,
      phone: phone || user.phone,
      logo: image[0]?.uri || user.logo,
    };
    console.log(requestBody);
    fetch("http://3.144.94.74:8000/api/realtors/" + user._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let token = user.token;
        setUser({
          ...json,
          isRealtor: true,
          token: token,
        });
        ToastAndroid.show("Usuario actualizada", ToastAndroid.LONG);
        navigation.navigate("Perfil");
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show(
          "Lo sentimos, no pudimos actualizar la tu usuario. Intentelo mas tarde.",
          ToastAndroid.LONG
        );
      });
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar mi perfil" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.container}>
          <Avatar.Image
            size={180}
            source={{
              uri: image[0]?.uri || user?.logo || user?.profilePicture,
            }}
            style={styles.avatar}
          />
          <View style={styles.container}>
            <Button
              icon="camera"
              mode="outlined"
              onPress={handleFileUpload}
              style={{ width: 250 }}
            >
              <Text style={{ paddingHorizontal: 10 }}>
                Cambiar foto de perfil
              </Text>
            </Button>
            <View style={{ gap: 5 }}>
              <Text style={{ paddingHorizontal: 5 }}>Nombre</Text>
              <TextInput
                defaultValue={user.name}
                placeholder="Nombre"
                style={styles.input}
                onChangeText={(e) => setName(e)}
              />
            </View>
            {/* <Text>loginEmail</Text> */}
            {/* <TextInput value={user.loginEmail} placeholder="Email"/> */}
            <View style={{ gap: 5 }}>
              <Text style={{ paddingHorizontal: 5 }}>Email de contacto</Text>
              <TextInput
                textContentType="emailAddress"
                defaultValue={user.contactEmail}
                placeholder="Sin especificar"
                style={styles.input}
                onChangeText={(e) => setContactEmail(e)}
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={{ paddingHorizontal: 5 }}>Telefono</Text>
              <TextInput
                defaultValue={user.phone}
                placeholder="Telefono"
                style={styles.input}
                onChangeText={(e) => setPhone(e)}
              />
            </View>

            <Button
              icon="lock"
              mode="outlined"
              onPress={() => {
                handlePasswordRecovery();
              }}
              style={{ width: 250 }}
            >
              <Text style={{ paddingHorizontal: 10 }}>Cambiar contraseña</Text>
            </Button>
            <Button
              icon="check"
              mode="contained-tonal"
              onPress={() => {
                handleChanges();
              }}
              style={{ width: 250, marginBottom: 60 }}
            >
              <Text style={{ paddingHorizontal: 10 }}>Realizar cambios</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingVertical: 30,
  },
  input: {
    width: 300,
    height: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
