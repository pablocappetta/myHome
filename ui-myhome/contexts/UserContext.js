import React from "react";

const UserContext = React.createContext();

export const useUserContext = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    name: "Pablo",
    lastName: "Cappetta",
    email: "pablo.placeholder@placeholder.com",
    profilePicture: "https://avatars.githubusercontent.com/u/75391203?v=4",
  });

  const store = {
    user,
    setUser,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
