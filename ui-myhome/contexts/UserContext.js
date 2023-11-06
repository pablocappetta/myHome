import React, { createContext, useContext, useEffect, useState } from "react";

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

  const getUserType = () => {
    if (user.isRealtor) return "realtor";
    return "regular";
  }

  useEffect(() => {
    setIsUserLogged(user.name !== null);
  }, [user]);

  const store = {
    user,
    setUser,
    isUserLogged,
    getUserType,
    setIsUserLogged
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
