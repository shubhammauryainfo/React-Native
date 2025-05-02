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
    console.log(`User ${socket.id} joined room ${roomId}`);
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
  console.log(`🚀 Server running on port ${PORT}`);
});
