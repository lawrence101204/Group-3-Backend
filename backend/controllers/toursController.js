// backend/controllers/toursController.js
const db = require("../config/db");

exports.getTours = (req, res) => {
  db.query("SELECT * FROM tours", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getTourById = (req, res) => {
  db.query("SELECT * FROM tours WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ message: "Tour not found" });
    res.json(result[0]);
  });
};

exports.createTour = (req, res) => {
  const tour = req.body;
  db.query("INSERT INTO tours SET ?", tour, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...tour });
  });
};

exports.updateTour = (req, res) => {
  const tour = req.body;
  db.query("UPDATE tours SET ? WHERE id = ?", [tour, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tour updated" });
  });
};

exports.deleteTour = (req, res) => {
  db.query("DELETE FROM tours WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Tour deleted" });
  });
};
