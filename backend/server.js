const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const toursRoutes = require("./routes/tours");
const inquiryRoutes = require("./routes/inquiries");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("DB CONNECTION ERROR:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// API routes
app.use("/api/tours", toursRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
