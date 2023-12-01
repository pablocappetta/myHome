import { Alert, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, IconButton, Text } from "react-native-paper";
import { useUserContext } from "../../contexts/UserContext";

const NotificationView = ({ navigation, ...props }) => {
  const notification = props.route.params;

  const { user } = useUserContext();

  const [listing, setListing] = useState();

  useEffect(() => {
    fetch(`http://3.144.94.74:8000/api/listings/${notification.listingId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.debug("Listing: " + data);
        setListing(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleDelete() {
    Alert.alert(
      "Eliminar notificación",
      "Se eliminará la notificación. ¿Está seguro de que desea eliminarla?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed") },
        {
          text: "Eliminar",
          onPress: () => (
            fetch(
              `http://3.144.94.74:8000/api/realtors/${user._id}/notifications/${notification._id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            ),
            ToastAndroid.show("Notificacion eliminada", ToastAndroid.LONG),
            navigation.navigate("Notificaciones")
          ),
        },
      ]
    );
  }

  console.log(listing);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.navigate("Notificaciones")}
        />
        <Appbar.Content title={"Notificación"} />
      </Appbar.Header>
      <View className="px-6 py-4">
        <View className="flex flex-row items-center mb-4">
          <IconButton
            size={32}
            icon={
              notification?.type == "Reserva"
                ? "calendar-check"
                : "message-badge-outline"
            }
            mode="contained-outline"
          />
          <Text className="font-bold text-[20px] ml-4">
            {notification?.type || "Consulta"}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="my-1 text-[18px] font-medium"
            numberOfLines={1}
            style={{ width: "50%" }}
          >
            {listing?.title || "listing title"}
          </Text>
          <Button
            icon="eye"
            onPress={() => navigation.navigate("Post", listing)}
            mode="text"
          >
            Ver propiedad
          </Button>
        </View>
        <View className="flex px-2 mt-1">
          <Text className="my-4 text-[15px] font-medium">
            {notification.message}
          </Text>
        </View>
        <Button
          mode="contained"
          className="mt-10"
          onPress={() => handleDelete()}
        >
          Eliminar notificacíon
        </Button>
      </View>
    </View>
  );
};

export default NotificationView;
