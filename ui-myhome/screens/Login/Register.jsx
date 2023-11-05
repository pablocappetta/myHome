import React, { useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/Feather'


const Register = ({navigation}) => {


  return (
    <View className='flex items-center bg-[#FFFF] h-[100vh] w-[100vw] pt-10'>
        <View className='flex items-center pt-6'>
            <Image source={require('../../assets/images/logo.png')} className='h-[122px] w-[158px]'/>
            <Text className='font-medium text-[25px]'>Crea tu cuenta</Text>
        </View>

        <View className='gap-[20px] mt-[10px]'>
            <View className='flex-row border-[1px] items-center px-6 border-[#c4c4c4] bg-[#e7e7e7] rounded-[10px] w-[300px] h-[50px] '>
                <Icon name='mail' size={22} color='#2e2e2e'/>
                <TextInput placeholder='Mail' className='ml-[20px] w-full text-[#2e2e2e]' />
            </View>
            <View className='flex-row border-[1px] items-center px-6 border-[#c4c4c4] bg-[#e7e7e7] rounded-[10px] w-[300px] h-[50px] '>
                <Icon name='user' size={22} color='#2e2e2e'/>
                <TextInput placeholder='Nombre' className='ml-[20px] w-full text-[#2e2e2e]' />
            </View>
            <View className='flex-row border-[1px] items-center px-6 border-[#c4c4c4] bg-[#e7e7e7] rounded-[10px] w-[300px] h-[50px]'>
                <Icon name='lock' size={22} color='#2e2e2e'/>
                <TextInput placeholder='Contraseña' className='ml-[20px] w-full text-[#2e2e2e]'/>
            </View>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('MyHome')}  title='Registrarse' className='bg-[#694DB6] w-[300px] h-[50px] rounded-[31px] mt-[32px]'>
                <Text className='text-[20px] text-[#FFFF] font-medium text-center pt-[10px]'>Registrarse</Text>
            </TouchableOpacity>
        </View>

        <View className='flex items-center mt-[15px]'>
            <View className='flex-row'>
                <Text className='text-[16px] pr-2'>Ya tenes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text className='text-[16px] text-[#5D157E] '>Ingresa</Text>
                </TouchableOpacity>
            </View>
        </View>
        

    </View>
  )
}

export default Register