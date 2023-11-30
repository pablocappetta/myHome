import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { notifications } from "./mock/notificationsMock";
// import Notification from "../../components/Notification/Notification";
import { Text, Divider, Appbar, Button } from "react-native-paper";
import { useUserContext } from "../../contexts/UserContext";
import Notification from "../../components/Notification/Notification";
import { RefreshControl } from "react-native-gesture-handler";

const Notifications = ({ navigation }) => {
  const { user } = useUserContext();

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    getNotificaciones();
  }, []);

  const getNotificaciones = () => {
    fetch(`http://3.144.94.74:8000/api/realtors/${user._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.notifications);
        setNotificaciones(data.notifications);
        setRefreshing(false);
      })
      .catch((error) => console.error(error));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotificaciones();
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={"Notificaciones"} />
        <TouchableOpacity>
          <Button
            icon="refresh"
            animated
            selected
            onPress={onRefresh}
            loading={refreshing}
          >
            {refreshing ? "Actualizando" : "Actualizar"}
          </Button>
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView
        vertical
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {notificaciones.length > 0 ? (
          notificaciones
            .map((noti) => (
              <TouchableOpacity
                key={noti._id}
                onPress={() => navigation.navigate("Notificacion", noti)}
              >
                <Notification noti={noti} />
                <Divider />
              </TouchableOpacity>
            ))
            .reverse()
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, marginTop: 25 }}>
              No hay notificaciones
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;
