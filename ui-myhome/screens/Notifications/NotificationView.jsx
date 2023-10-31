import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, Button, IconButton } from 'react-native-paper'

const NotificationView = ({navigation, ...props}) => {

  const notification = props.route.params;
  
  return (
    <View>
      <Appbar.Header elevated={true}>
        <Appbar.BackAction onPress={() => navigation.navigate("Notificaciones")} />
        <Appbar.Content title={"Notificacion"} />
      </Appbar.Header>
      <View className="px-6 py-4">
        <View className="flex flex-row items-center">
          <IconButton size={35} iconColor='#6750a4' icon={notification.type == "Reserva" ? "calendar-check" : "message-badge-outline"} />
          <Text className="text-[#6750a4] font-bold text-[20px]">{notification.type}</Text>
        </View>
        <View >
          <Text className="my-1 text-[18px] font-medium">{notification.description}</Text>
        </View>
        <View className="flex flex-row">
          <Text className="my-1 text-[15px] font-medium">De: </Text>
          <Text className="my-1 text-[15px] font-medium">{notification.name}</Text>
        </View>
        <View>
          <Text className="my-4 text-[15px] font-medium">{notification.message}</Text>
        </View>
      </View>
    </View>
  )
}

export default NotificationView