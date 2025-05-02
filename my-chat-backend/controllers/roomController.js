const Room = require("../models/Room");

const createRoom = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Room name is required" });
  }

  const room = new Room({ name });
  await room.save();

  return res.status(201).json({ room });
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRoom, getRooms };
