import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export const authProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
};
