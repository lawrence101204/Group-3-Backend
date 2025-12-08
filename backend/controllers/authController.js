// backend/controllers/authController.js
const db = require("../config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (!result.length) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Simple demo token (no JWT, just educational)
      res.json({ success: true, token: "lavera-admin-token" });
    }
  );
};
