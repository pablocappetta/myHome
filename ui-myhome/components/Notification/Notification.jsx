import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import React from "react";

const Notification = ({ noti }) => {
  return (
    <View className="flex flex-row gap-6 px-2 py-6">
      <View className="flex gap-1 items-center">
        <IconButton
          icon={noti.type === "Consulta" ? "message-badge" : "check-circle"}
          mode="contained-outline"
          style={{ padding: 0, margin: 0 }}
        />
      </View>
      <View className="flex gap-1">
        <View className="flex flex-row">
          <Text className="font-bold text-[#6750a4] text-[16px] mr-2">
            {noti.type}:
          </Text>
          <Text className="font-bold text- text-[16px]">{noti.name}</Text>
        </View>
        <Text className="cursor-vertical-text overflow-hidden line-clamp-1 ">
          {noti.description}
        </Text>
      </View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            gap: 4,
            marginTop: 8,
          }}
        >
          <Text style={{ fontSize: 14 }}>{noti.hour}</Text>
          <Text style={{ fontSize: 9.5 }}>{noti.date}</Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;
