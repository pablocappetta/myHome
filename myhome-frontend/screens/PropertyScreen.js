import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'
import Icon  from 'react-native-vector-icons/Feather'
import Icon2  from 'react-native-vector-icons/FontAwesome'

export const PropertyScreen = () => {

    const [favorite, setFavorite] = useState(false)

    function handleFav() {
        setFavorite(!favorite)
    }

    const description = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore at nemo voluptate adipisci deleniti, suscipit optio odit iste eveniet accusamus sequi amet cum voluptatibus magni possimus blanditiis ea perferendis molestiae!
    Officia magni distinctio deleniti, repudiandae ratione ad, quod nostrum odit sunt non consectetur! Dolores neque, soluta, minus quaerat harum atque dolor vel omnis beatae consequatur aliquam ut, porro laboriosam enim.
    Quisquam qui, totam, corporis cum officia necessitatibus saepe dolorem iusto, quibusdam quas explicabo nemo nisi molestiae a nihil? Aliquam iste consequatur id ipsam ab quod quasi, aliquid cupiditate commodi fuga.
    Corrupti optio, facilis mollitia cupiditate eius nulla exercitationem sit tenetur molestiae, quos doloribus accusamus? Officiis obcaecati blanditiis officia ex vero. Ab velit sunt tempora natus dolorum, omnis voluptatem delectus corrupti!`


    const [showFullText, setShowFullText] = useState(false);
  
    const toggleReadMore = () => {
      setShowFullText(!showFullText);
    };

    const displayText = showFullText ? description : description.slice(0, 90);
    
    
  
  return (
    <ScrollView vertical className='h-full w-full]'>
      <View className='relative flex-row'>
          <Image source={{uri:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'}} className='h-[405px] w-full relative'/>
          <View className='absolute bottom top-[50px] right-[17px] flex-row gap-[12px] '>
              <Icon2 name={favorite ? 'heart' : 'heart-o'} size={30} color='#fff' onPress={()=> handleFav()}/>
              <Icon name='share' size={30} color='#fff'/>
          </View>
      </View>

      <View className='flex-row items-center gap-[8px] ml-[23px] mt-[24px]'>
          <View className='bg-[#F25F5F] rounded-full h-[9px] w-[9px]'></View>
          <Text className='text-center font-normal text-[15px]'>En venta</Text>
      </View> 

      <View className='mt-[15px] ml-[30px]'>
        <Text className='font-bold text-[16px]'>USD 500.000</Text>
        <Text className='font-normal text-[16px] mt-[4px]'>+ $ 90.000 Expensas</Text>
        <View className='mt-[10px]'>
          <Text className='font-semibold text-[20px]'>Casa Moderna con Pileta</Text>
          <Text className='font-normal text-[14px] mt-[2px]'>Nordelta, Buenos Aires</Text>
        </View>
      </View>

      <View className='w-full items-center justify-center mt-[28px] '>
        <Text className='h-[79px] border-[1px] bg-slate-200 w-full items-center justify-center text-center'>ACA VAN LAS CARACTERISTICAS (metros2 cantidad de habitacione etc)</Text>
      </View>

      <View className='w-full px-[23px] pt-[20px]'>
        <Text className='text-[18px] font-bold pb-[4px]'>Descripción</Text>
        <Text className='font-normal text-[15px]'>{displayText}</Text>
        {description.length > 90 && !showFullText && (
          <TouchableOpacity onPress={toggleReadMore}>
            <Text className='text-[#4285F4] font-normal text-[15px]'>Leer más</Text>
          </TouchableOpacity>
        )}
        {showFullText && (
          <TouchableOpacity onPress={toggleReadMore}>
            <Text className='text-[#4285F4] font-normal text-[15px]'>Leer menos</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <View className='flex-row items-center justify-between px-[40px] mt-[38px]'>
          <Text className='text-[18px] font-bold'>Fotos</Text>
          <TouchableOpacity >
            <Text className='text-[15px] font-normal text-[#5D157E] '>Ver más</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row px-[23px] justify-between mt-[23px]'>
            <TouchableOpacity  >
              <Image source={{uri:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'}} className='h-[100px] w-[100px] rounded-[20px] relative'/>
            </TouchableOpacity>
            <TouchableOpacity  >
              <Image source={{uri:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'}} className='h-[100px] w-[100px] rounded-[20px] relative'/>
            </TouchableOpacity>
            <TouchableOpacity className='relative items-center justify-center'>
              <View className='bg-black  h-[100px] w-[100px] rounded-[20px] absolute z-[9999] opacity-40'></View>
              <Text className='opacity-100 text-white absolute z-[9999] text-[24px] font-bold'>20+</Text>
              <Image source={{uri:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'}} className='h-[100px] w-[100px] rounded-[20px] '/>
            </TouchableOpacity>
        </View>
      </View>

      <View className='px-[23px] mt-[46px] pb-[50px]'>
        <Text className='font-bold text-[18px]'>Ubicación</Text>
          <MapView
            className='h-[214px] mt-[18px]'
            initialRegion={{
              latitude: -34.422662,
              longitude:  -58.576374,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
          />
      </View>

    </ScrollView>
  )
}
