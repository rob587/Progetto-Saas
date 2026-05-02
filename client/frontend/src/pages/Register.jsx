import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("le password non corrispondono");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      setSuccess("Registrazione effettuata con successo");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registrazione fallita");
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="mb-4 text-center">Registrati</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Scegli un username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea una password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ripeti la password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrati
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <p>
              Hai già un account? <Link to="/">Accedi qui</Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
