import React from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

const DashBoard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  return <></>;
};

export default DashBoard;
