import { View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Notification = ({ noti }) => {
  console.debug("Notification", noti);

  const dateObject = new Date(noti.date);
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();

  const { theme } = useTheme();
  return (
    <View className="flex flex-row gap-6 px-4 py-6 justify-between">
      <View className="flex gap-1 items-center">
        <IconButton
          icon={"bell-outline"}
          mode="contained"
          style={{ padding: 0, margin: 0 }}
        />
      </View>
      <View className="flex gap-1 w-[45%] ">
        <View className="flex flex-row">
          <Text
            className="font-bold text-[16px] mr-2"
            style={{
              color: theme.dark ? MD3Colors.primary80 : MD3Colors.primary20,
            }}
          >
            Mensaje
          </Text>
        </View>
        <Text className="cursor-vertical-text overflow-hidden line-clamp-2 max-h-[35px]">
          {noti?.message || "Mensaje"}
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
            paddingRight: 8,
          }}
        >
          <Text style={{ fontSize: 14 }}>{date}</Text>
          <Text style={{ fontSize: 9.5 }}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;
