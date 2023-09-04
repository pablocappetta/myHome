import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Highlight } from '../components/Highlight';
import { Post } from '../components/Post';

const HomeScreen = ({navigation}) => {

  const user = {
    name: 'Juan José',
    email: 'juan.jose@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  }

  const [ notification, setNotification ] = useState(true)

  const [ selected, setSelected ] = useState('alquilar')

  function handleSelection( selection ) {
    setSelected(selection)
  }


  const [alquileres, setAlquileres] = useState({
    destacadas: [
      {
        id: 1,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 2,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 3,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 4,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
    ],
    posts: [
      {
        id: 1,
        tipo: 'Casa',
        ubicacion: 'Belgrano, CABA',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 2,
        tipo: 'Departamento',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 3,
        tipo: 'Casa',
        ubicacion: 'Belgrano, CABA',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
      {
        id: 4,
        tipo: 'Departamento',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      },
    ],
  })

  const [compras, setCompras] = useState({
    destacadas: [
      {
        id: 1,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 2,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 3,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 4,
        tipo: 'Casa',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
    ],
    posts: [
      {
        id: 1,
        tipo: 'Casa',
        ubicacion: 'Belgrano, CABA',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 2,
        tipo: 'Departamento',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 3,
        tipo: 'Casa',
        ubicacion: 'Belgrano, CABA',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
      {
        id: 4,
        tipo: 'Departamento',
        ubicacion: 'Cañuelas, Buenos Aires',
        precio: 'USD$ 400.000',
        imagen: 'https://img.freepik.com/fotos-premium/exterior-casa-o-casa-moderna-comoda-patio-delantero-pequenos-arboles-decorativos-lo-largo-paredes_274679-2389.jpg?w=2000',
      },
    ],
  })
  
  

  return (
    <ScrollView vertical>
    
      <View className='px-4 py-4 flex-row items-center'>
        <Image source={user.avatar ? {uri:user.avatar} : require('../assets/images/user.png')} className='h-[45px] w-[45px] rounded-[100px]'/>
        <Text className='ml-[21px] text-[16px] text-[#A7A7A7]'>Hola <Text className='font-semibold text-[#000000]'>{user.name}</Text></Text>
        <View className='ml-auto'>
          <Icon name={ !notification ? 'bell-outline' : 'bell-badge-outline'}  size={30} color={!notification ? '#A7A7A7' : '#5D157E'} />
        </View>
      </View>

      <View className='items-center justify-center '>
        <View className='border-[1px] border-[#c4c4c47e] w-[300px] flex-row rounded-[100px]'>
          <TouchableOpacity onPress={() => handleSelection('alquilar')} className={`flex-row items-center  bg-[#FFFF] rounded-tl-[100px] rounded-bl-[100px] ${selected == 'alquilar' ? 'border-[1px] rounded-tr-[100px] rounded-br-[100px] border-[#c4c4c4]' : 'bg-[#F6F6F6]'}   w-[150] h-[50px] justify-center `}>
            <Text className={`${selected == 'alquilar' ? 'text-[#5D157E] font-semibold' : 'text-[#BDBDBD] font-medium'}`}>Alquilar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelection('comprar')} className={`flex-row items-center  bg-[#FFFF] rounded-tr-[100px] rounded-br-[100px] ${selected == 'comprar' ? 'border-[1px] rounded-tl-[100px] rounded-bl-[100px] border-[#c4c4c4]' : 'bg-[#F6F6F6]'} w-[150] h-[50px] justify-center `}>
            <Text className={`${selected == 'comprar' ? 'text-[#5D157E] font-semibold' : 'text-[#BDBDBD] font-medium'}`}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='items-center justify-center flex-row  mt-[28px] h-[56px] p-0 '>
        <View className='border-[1px] border-[#c4c4c47e] flex-row h-full items-center rounded-[10px] px-6'>
          <TextInput placeholder={'Buscar'} className=' w-[276px] h-full '/>
          <Icon name='filter-variant' size={25} color={'#464646'}/>
        </View>
      </View>

      <View className='px-6 mt-[21px]'>
        <View className='flex-row items-center justify-between '>
          <Text className='text-[22px] font-normal'>Destacados</Text>
          <TouchableOpacity >
            <Text className='text-[15px] font-normal text-[#5D157E] '>Ver más</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className='mt-[15px]' >
          {
            (selected == 'alquilar' ? alquileres : compras).destacadas.map( propiedad => {
              return (
                <TouchableOpacity key={propiedad.id}  onPress={() => navigation.navigate('Property')}>
                  <Highlight propiedad={propiedad} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>

      <View className='px-6 mt-[21px]'>
        <View className='flex-row items-center justify-between '>
          <Text className='text-[22px] font-normal'>Ultimos Publicados</Text>
          <TouchableOpacity>
            <Text className='text-[15px] font-normal text-[#5D157E] '>Ver más</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-[15px] justify-between flex-wrap flex-row'>
          {
            (selected == 'alquilar' ? alquileres : compras).posts.map( propiedad => {
              return (
                <TouchableOpacity key={propiedad.id} onPress={() => navigation.navigate('Property')}>
                  <Post  propiedad={propiedad} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        

      
    </ScrollView>
  )
}

export default HomeScreen