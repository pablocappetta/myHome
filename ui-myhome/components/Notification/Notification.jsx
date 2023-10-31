import { View, Text } from 'react-native'
import React from 'react'

const Notification = ({noti}) => {
  return (
    <View className="flex flex-row gap-6 px-2 py-1">
      <View className="flex gap-1 items-center">
        <Text className="">{noti.hour}</Text>
        <Text className=" ">{noti.date}</Text>
      </View>
      <View className="flex gap-1">
        <View className="flex flex-row">
            <Text className="font-bold text-[#6750a4] text-[16px] mr-2">{noti.type}:</Text>
            <Text className="font-bold text-[#6750a4] text-[16px]">{noti.name}</Text>
        </View>
        <Text className="cursor-vertical-text overflow-hidden line-clamp-1 ">{noti.description}</Text>
      </View>
    </View>
  )
}

export default Notification