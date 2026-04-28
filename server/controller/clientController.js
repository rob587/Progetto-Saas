const db = require("../db");

// PRENDE TUTTI I CLIENTI
exports.getClients = (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

// prendi utente per id
exports.getClientById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM clients WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(results[0]);
  });
};

// nuovo cliente

exports.createClient = (req, res) => {
  const { name, email, phone } = req.body;

  const sql = "INSERT INTO clients (name, email,phone) VALUES (?, ?, ?)";

  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Client added", id: result.insertId });
  });
};

// AGGIORNA cliente

exports.updateClient = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const sql = "UPDATE clients SET name=?, email=?, phone=? WHERE id=?";

  db.query(sql, [name, email, phone, id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Client updated" });
  });
};

// cancella cliente

exports.deleteClient = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM clients WHERE id=?", [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Client Deleted" });
  });
};
