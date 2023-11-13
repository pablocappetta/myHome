import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    lastName: null,
    email: null,
    profilePicture: null,
    isVerified: null,
    isRealtor: null,
    token: null,
    _id: null,
  });

  const [isUserLogged, setIsUserLogged] = useState(false);

  const setUserDataToAsyncStorage = async (credentials) => {
    console.debug("Guardando datos de login en AsyncStorage");
    const stringifiedCredentials = JSON.stringify(credentials);
    try {
      await AsyncStorage.setItem("user", stringifiedCredentials);
      console.log("Datos de login guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos de login:", error);
    }
  };

  const getUserDataFromAsyncStorage = async () => {
    try {
      const datosString = await AsyncStorage.getItem("user");
      if (datosString !== null) {
        const datosUsuario = JSON.parse(datosString);
        console.log(
          "Datos de usuario recuperados correctamente:",
          datosUsuario
        );
        return datosUsuario;
      } else {
        console.log("No se encontraron datos de usuario en AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error("Error al recuperar datos de usuario:", error);
      return null;
    }
  };

  const getUserType = () => {
    if (user.isRealtor) return "realtor";
    return "regular";
  };

  useEffect(() => {
    setIsUserLogged(user.name !== null);
  }, [user]);

  useEffect(() => {
    if (isUserLogged && getUserDataFromAsyncStorage() === null) {
      setUserDataToAsyncStorage(user);
    }
  }, [isUserLogged]);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUserDataFromAsyncStorage();
      if (userData && !isUserLogged) {
        setUser(userData);
      }
    };
    getUserData();
  }, [AsyncStorage]);

  const store = {
    user,
    setUser,
    isUserLogged,
    getUserType,
    setIsUserLogged,
    getUserDataFromAsyncStorage,
    setUserDataToAsyncStorage,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
