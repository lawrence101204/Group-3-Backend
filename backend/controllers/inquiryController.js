// backend/controllers/inquiryController.js
const db = require("../config/db");

exports.createInquiry = (req, res) => {
  const { name, email, message, package_id } = req.body;

  if (!name || !email || !message || !package_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = { name, email, message, package_id };
  db.query("INSERT INTO inquiries SET ?", data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...data });
  });
};

exports.getInquiries = (req, res) => {
  const q = `
    SELECT i.*, t.name AS package_name, t.price
    FROM inquiries i
    LEFT JOIN tours t ON i.package_id = t.id
    ORDER BY i.created_at DESC
  `;
  db.query(q, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.updateInquiryStatus = (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE inquiries SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Status updated" });
    }
  );
};

exports.deleteInquiry = (req, res) => {
  db.query("DELETE FROM inquiries WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Inquiry deleted" });
  });
};
