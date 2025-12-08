// backend/routes/tours.js
const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController.js");

router.get("/", toursController.getTours);
router.get("/:id", toursController.getTourById);
router.post("/", toursController.createTour);
router.put("/:id", toursController.updateTour);
router.delete("/:id", toursController.deleteTour);

module.exports = router;
