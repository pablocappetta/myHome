import React, { useLayoutEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../../contexts/ThemeContext";

const Signin = ({ navigation }) => {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);

  return (
    <View className="flex items-center bg-[#FFFF] h-[100vh] w-[100vw] pt-10">
      <View className="flex items-center pt-6">
        <Image
          source={
            !theme.dark
              ? require("../../assets/images/logo.png")
              : require("../../assets/images/logo-light.png")
          }
          className="h-[122px] w-[158px]"
        />
        <Text className="font-medium text-[25px]">Ingresar a tu cuenta</Text>
      </View>

      <TouchableOpacity className="flex-row items-center border-[1px] mt-6 border-[#c4c4c4] bg-[#FFFF] rounded-[10px] w-[300px] h-[50px] justify-center ">
        <Image source={require("../../assets/images/google.png")} />
        <Text className="text-[18px]  font-normal text-center">
          Continuar con Google
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center mt-[30px]">
        <View className="border-[1px] border-[#c4c4c4] w-[120px]"></View>
        <Text className="text-[15px] text-[#5D157E] font-semibold text-center px-[20px]">
          O
        </Text>
        <View className="border-[1px] border-[#c4c4c4] w-[120px]"></View>
      </View>

      <View className="gap-[20px] mt-[10px]">
        <Text className="font-medium text-center text-[25px]">
        ¿Sos una inmobiliaria?
        </Text>
        <View className="flex-row border-[1px] items-center px-6 border-[#c4c4c4] bg-[#e7e7e7] rounded-[10px] w-[300px] h-[50px] ">
          <Icon name="mail" size={22} color="#2e2e2e" />
          <TextInput
            placeholder="Mail"
            className="ml-[20px] w-full text-[#2e2e2e]"
          />
        </View>
        <View className="flex-row border-[1px] items-center px-6 border-[#c4c4c4] bg-[#e7e7e7] rounded-[10px] w-[300px] h-[50px]">
          <Icon name="lock" size={22} color="#2e2e2e" />
          <TextInput
            placeholder="Contraseña"
            className="ml-[20px] w-full text-[#2e2e2e]"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyHome")}
          title="Ingresar"
          className="bg-[#694DB6] w-[300px] h-[50px] rounded-[31px] mt-[32px]"
        >
          <Text className="text-[20px] text-[#FFFF] font-medium text-center pt-[10px]">
            Ingresar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-[20px]">
          <Text className="text-[20px] text-[#5D157E] font-normal text-center ">
            Me olvidé mi contraseña
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex items-center mt-[15px]">
        <View className="flex-row">
          <Text className="text-[16px] pr-2">No tenés cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-[16px] text-[#5D157E]">Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signin;
