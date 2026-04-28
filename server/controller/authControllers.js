const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRAZIONE

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
      bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json(err);
        }
        const sql =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

        db.query(sql, [username, email, hashedPassword], (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        });
      });
    },
  );
};

// LOGIN

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
      }

      const user = results[0];
    },
  );
};
