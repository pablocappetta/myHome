import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

  const wipeUserData = () => {
    setUser({
      name: null,
      lastName: null,
      email: null,
      profilePicture: null,
      isVerified: null,
      isRealtor: null,
      token: null,
      _id: null,
    });
    setIsUserLogged(false);
    AsyncStorage.removeItem("user");
  };

  useEffect(() => {
    setIsUserLogged(user.name !== null && user.token !== null);
  }, [user]);

  useEffect(() => {
    if (
      isUserLogged &&
      user.name !== null &&
      user.token !== null &&
      AsyncStorage.getItem("user") === null
    ) {
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

  const [notificaciones, setNotificaciones] = useState();
  useEffect(() => {
    console.log(
      "Datos de usuario actualizados:",
      getUserDataFromAsyncStorage()
    );

    fetch(`http://3.144.94.74:8000/api/realtors/${user._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotificaciones(data.notifications);
      })
      .catch((error) => console.error(error));
  }, [user]);

  const store = {
    user,
    setUser,
    isUserLogged,
    getUserType,
    setIsUserLogged,
    getUserDataFromAsyncStorage,
    setUserDataToAsyncStorage,
    wipeUserData,
    notificaciones,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
