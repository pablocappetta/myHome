import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { notifications } from "./mock/notificationsMock";
import Notification from "../../components/Notification/Notification";
import { Text, Divider, Appbar } from "react-native-paper";

const Notifications = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState(
    [].concat(notifications)
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title={"Notificaciones"} />
      </Appbar.Header>
      <ScrollView vertical>
        {notificaciones
          .map((noti) => (
            <TouchableOpacity
              key={noti.id}
              onPress={() => navigation.navigate("Notificacion", noti)}
            >
              <Notification noti={noti} />
              <Divider />
            </TouchableOpacity>
          ))
          .reverse()}
      </ScrollView>
    </View>
  );
};

export default Notifications;
