import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export const authProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(token);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return(
    <authContext.Provider value={user, token, login, logout}>
        {children}
    </authContext.Provider>
  )
};
