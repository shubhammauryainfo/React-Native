const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createRoom, getRooms } = require("../controllers/roomController");

// POST route to create a room
router.post("/", auth, createRoom); // Create room protected by auth
// GET route to get all rooms
router.get("/", auth, getRooms);    // Get rooms protected by auth

module.exports = router;
