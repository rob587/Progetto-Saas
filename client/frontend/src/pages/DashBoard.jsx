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
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiLogOut } from "react-icons/fi";

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
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveClient = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isEditing) {
        // UPDATE
        await API.put(`/clients/${editingId}`, formData);
        setClients(
          clients.map((client) =>
            client.id === editingId ? { id: editingId, ...formData } : client,
          ),
        );
        setIsEditing(false);
      } else {
        // CREATE
        const res = await API.post("/clients", formData);
        setClients([...clients, { id: res.data.id, ...formData }]);
      }
      setFormData({ name: "", email: "", phone: "" });
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Errore");
    }
  };

  const handleEdit = (client) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
    setEditingId(client.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo cliente?")) {
      try {
        await API.delete(`/clients/${id}`);
        setClients(clients.filter((client) => client.id !== id));
      } catch (err) {
        setError("Errore nell'eliminazione");
      }
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
      <Navbar bg="dark" variant="dark" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="#home">
            <FiUsers style={{ marginRight: "10px" }} />
            ClientFlow
          </Navbar.Brand>
          <Button variant="outline-light" onClick={handleLogout}>
            <FiLogOut style={{ marginRight: "8px" }} />
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-5">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <h2>I Tuoi Clienti</h2>
            <p className="text-muted" style={{ fontSize: "14px" }}>
              Gestisci i tuoi clienti in un unico posto
            </p>
          </div>
          <Button
            variant="success"
            onClick={() => {
              setIsEditing(false);
              setFormData({ name: "", email: "", phone: "" });
              setShowModal(true);
            }}
            className="btn-add-client"
          >
            <FiPlus style={{ marginRight: "8px" }} />
            Aggiungi Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="stats-container" style={{ marginBottom: "40px" }}>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h4>{clients.length}</h4>
              <p>Clienti Totali</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-content">
              <h4>{clients.filter((c) => c.email).length}</h4>
              <p>Con Email</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📞</div>
            <div className="stat-content">
              <h4>{clients.filter((c) => c.phone).length}</h4>
              <p>Con Telefono</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <h4 style={{ marginBottom: "20px", color: "#e2e8f0" }}>
            Elenco Clienti
          </h4>

          {loading ? (
            <div className="text-center" style={{ padding: "40px" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : clients.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#94a3b8",
              }}
            >
              <FiUsers
                style={{ fontSize: "48px", marginBottom: "20px", opacity: 0.5 }}
              />
              <p style={{ fontSize: "16px" }}>Nessun cliente ancora</p>
              <p style={{ fontSize: "14px" }}>
                Clicca il bottone "Aggiungi Cliente" per iniziare
              </p>
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th style={{ textAlign: "center" }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(client)}
                        className="btn-action"
                        style={{ marginRight: "8px" }}
                      >
                        <FiEdit2 /> Modifica
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(client.id)}
                        className="btn-action"
                      >
                        <FiTrash2 /> Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Modifica Cliente" : "Aggiungi Nuovo Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSaveClient}>
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
              {isEditing ? "Aggiorna" : "Aggiungi"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashBoard;
