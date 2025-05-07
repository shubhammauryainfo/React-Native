const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    isGroupChat: { type: Boolean, default: false },
    chatName: { type: String, trim: true },
    groupImage: { type: String, default: "" }, // Optional group chat image
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Only for group chats
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
