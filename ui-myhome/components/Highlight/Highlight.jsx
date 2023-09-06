import { React, useState } from 'react'
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export const Highlight = ({propiedad}) => {

    const [favorite, setFavorite] = useState(false)

    function handleFav() {
        setFavorite(!favorite)
    }
    
  return (
    <View className='mr-[34px] '>
        <Image source={{uri:propiedad.imagen}} className='h-[376px] w-[250px] rounded-[30px] relative'/>
        <Text className='absolute text-[18px] bottom-20 left-4 text-white font-bold'>{propiedad.tipo}</Text>
        <Text className='absolute text-[14px] bottom-14 left-4 text-white font-normal'>{propiedad.ubicacion}</Text>
        <Text className='absolute text-[15px] bottom-6 left-4 text-white font-semibold'>{propiedad.precio}</Text>
        <View className='absolute bottom bottom-8 right-4'>
            <Icon name={favorite ? 'heart' : 'heart-o'} size={30} color={favorite ? '#d37dfc' : '#fff'} onPress={()=> handleFav()}/>
        </View>
    </View>
  )
}
