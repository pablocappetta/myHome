import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome'

export const Post = ({propiedad}) => {

    const [favorite, setFavorite] = useState(false)

    function handleFav() {
        setFavorite(!favorite)
    }
    
    
  return (
    <View className='mb-[22px] py-[10px]'>
        <Image source={{uri:propiedad.imagen}} className='h-[135px] w-[135px] rounded-[30px] relative' />
        <Text className='text-[17px] text-[#000] mt-[10px] font-bold'>{propiedad.tipo}</Text>
        <View className='flex-row justify-between'>
            <View className=''>
                <Text className='text-[11px] w-[80%] whitespace-normal text-[#000]   font-normal'>{propiedad.ubicacion}</Text>
                <Text className='text-[10px] whitespace-normal text-[#5D157E] font-semibold'>{propiedad.precio}</Text>
            </View>
            <Icon name={favorite ? 'heart' : 'heart-o'} size={30} color={favorite ? '#d37dfc' : '#5D157E'} onPress={()=> handleFav()}/>
        </View>
    </View>
  )
}
