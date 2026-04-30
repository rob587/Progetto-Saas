import React from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Navbar, Container, Button, Table, Spinner } from "react-bootstrap";

const DashBoard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return <></>;
  <Navbar bg="dark" variant="dark" className="mb-4">
    <Container fluid>
      <Navbar.Brand href="#home">ClientFlow</Navbar.Brand>
      <Button variant="outline-light" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  </Navbar>;

  <Container className="mt-4">
    <h2 className="mb-4">I Tuoi Clienti</h2>

    {loading ? (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    ) : clients.length === 0 ? (
      <p className="text-muted">Nessun cliente trovato</p>
    ) : (
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Container>;
};

export default DashBoard;
