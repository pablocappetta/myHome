import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { notifications } from './mock/notificationsMock'
import Notification from '../../components/Notification/Notification'
import { Divider } from 'react-native-paper'

const Notifications = ({navigation}) => {

  const [notificaciones, setNotificaciones] = useState([].concat(notifications));

  return (
    <View className="mt-[60px] px-4">
      <Text className="text-[25px] font-bold pl-4">Notificaciones</Text>
      <ScrollView vertical className="mt-6">
        {
          notificaciones.map((noti) => (
            <TouchableOpacity key={noti.id} onPress={() => navigation.navigate("Notificacion",noti)}>
              <Notification  noti={noti} />
              <Divider />
            </TouchableOpacity>
          )).reverse()
        }
      </ScrollView>
    </View>
  )
}

export default Notifications