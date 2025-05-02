const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-key"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route to test server
app.use("/api", apiKeyMiddleware);
app.get("/api/hii", (req, res) => {
  res.send("API is running... develop by shubham ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
