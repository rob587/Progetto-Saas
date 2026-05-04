import React from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Container,
  Button,
  Table,
  Spinner,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const DashBoard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

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

  const handleClient = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/clients", formData);
      setClients([...clients, { id: res.data.id, ...formData }]);
      setFormData({ name: "", email: "", phone: "" });
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Errore nell'aggiunta");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#home">ClientFlow</Navbar.Brand>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>I Tuoi Clienti</h2>
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Aggiungi Cliente
          </Button>
        </div>

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
      </Container>

      {/* Modal per aggiungere cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Nuovo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleClient}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome cliente"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email cliente"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono cliente"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Aggiungi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashBoard;
