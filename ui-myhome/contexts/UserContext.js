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
  });

  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    setIsUserLogged(user.name !== null);
  }, [user]);

  const store = {
    user,
    setUser,
    isUserLogged,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
