import { View } from "react-native";
import React from "react";
import { Appbar, IconButton, Text } from "react-native-paper";

const NotificationView = ({ navigation, ...props }) => {
  const notification = props.route.params;

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
              notification.type == "Reserva"
                ? "calendar-check"
                : "message-badge-outline"
            }
            mode="contained-outline"
          />
          <Text className="font-bold text-[20px] ml-4">
            {notification.type}
          </Text>
        </View>
        <View>
          <Text className="my-1 text-[18px] font-medium">
            {notification.description}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="my-1 text-[15px] font-medium">De: </Text>
          <Text className="my-1 text-[15px] font-medium">
            {notification.name}
          </Text>
        </View>
        <View>
          <Text className="my-4 text-[15px] font-medium">
            {notification.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationView;
