const Message = require("../models/Message");
const Chat = require("../models/Chat");

// Create a new message
exports.sendMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  if (!chatId || !senderId || !text) {
    return res
      .status(400)
      .json({ message: "chatId, senderId, and text are required." });
  }

  try {
    const message = await Message.create({
      chatId,
      senderId,
      text,
    });

    // Optional: update chat's updatedAt
    await Chat.findByIdAndUpdate(chatId, { updatedAt: new Date() });

    // Populate fields separately
    await message.populate([
      { path: "senderId", select: "-password" },
      { path: "chatId" },
    ]);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages in a chat
exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId })
      .populate("senderId", "-password")
      .populate("chatId")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a message
exports.updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.text = text || message.text;
    await message.save();

    await message.populate([
      { path: "senderId", select: "-password" },
      { path: "chatId" },
    ]);

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
