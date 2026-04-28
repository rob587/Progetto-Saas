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
