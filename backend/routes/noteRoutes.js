const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createNote,
  getCustomerNotes,
} = require("../controllers/noteController");

router.post("/:customerId", authMiddleware, createNote);

router.get("/:customerId", authMiddleware, getCustomerNotes);

module.exports = router;
