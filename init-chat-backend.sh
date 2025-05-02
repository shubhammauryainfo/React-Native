#!/bin/bash

# Create project directory
mkdir my-chat-backend
cd my-chat-backend

# Initialize npm project
npm init -y

# Install required dependencies
npm install express socket.io mongoose dotenv body-parser cors

# Create project structure
mkdir routes controllers middleware

# Create server.js file
cat <<EOL > server.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const apiKeyMiddleware = require("./middleware/apiKeyMiddleware"); // Middleware

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(\`User \${socket.id} joined room \${roomId}\`);
  });

  socket.on("sendMessage", ({ roomId, sender, message }) => {
    const timestamp = new Date().toISOString();
    io.to(roomId).emit("receiveMessage", { sender, message, timestamp });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Apply apiKeyMiddleware only to /api/auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", apiKeyMiddleware); // Apply API key middleware only to /api/auth
app.use("/api/auth", authRoutes);

// Room routes (no API key middleware needed here)
const roomRoutes = require("./routes/rooms");
app.use("/api/rooms", roomRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
EOL

# Create .env file
cat <<EOL > .env
MONGO_URI=mongodb://localhost:27017/mychatdb
API_KEY=your-api-key-here
PORT=5000
EOL

# Create middleware/apiKeyMiddleware.js
cat <<EOL > middleware/apiKeyMiddleware.js
const apiKeys = [process.env.API_KEY];

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["auth-key"]; 

  if (!apiKey || !apiKeys.includes(apiKey)) {
    return res.status(403).json({
      warning: "This is REACT-NATIVES BACKEND - you should not be here :)",
    });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = apiKeyMiddleware;
EOL

# Create routes/rooms.js
cat <<EOL > routes/rooms.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createRoom, getRooms } = require("../controllers/roomController");

// POST route to create a room
router.post("/", auth, createRoom); // Create room protected by auth
// GET route to get all rooms
router.get("/", auth, getRooms);    // Get rooms protected by auth

module.exports = router;
EOL

# Create controllers/roomController.js
cat <<EOL > controllers/roomController.js
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
EOL

# Create models/Room.js
cat <<EOL > models/Room.js
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Room", RoomSchema);
EOL

# Install MongoDB if not installed
echo "Ensure MongoDB is installed on your system or running via Docker!"

# Show project structure and indicate completion
echo "Project structure created:"
echo "backend-directory/"
echo "├── controllers/"
echo "├── middleware/"
echo "├── models/"
echo "├── routes/"
echo "├── .env"
echo "├── server.js"
echo "├── package.json"

echo "Backend setup complete! Now, you can start the server with 'node server.js' or 'nodemon server.js'."

# Exit
exit 0
