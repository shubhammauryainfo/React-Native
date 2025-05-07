const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

// Create a new chat (group or 1-on-1)

exports.createChat = async (req, res) => {
  const {
    participants,
    isGroupChat = false,
    chatName,
    groupImage,
    admin,
  } = req.body;

  try {
    // Validation
    if (!Array.isArray(participants) || participants.length < 2) {
      return res
        .status(400)
        .json({ message: "At least 2 participants are required." });
    }

    if (isGroupChat) {
      if (!chatName) {
        return res
          .status(400)
          .json({ message: "Group chat must have a name." });
      }

      const groupChat = await Chat.create({
        participants,
        isGroupChat,
        chatName,
        groupImage: groupImage || "",
        admin,
      });

      const populatedGroupChat = await Chat.findById(groupChat._id)
        .populate("participants", "-password")
        .populate("admin", "-password");

      return res.status(201).json(populatedGroupChat);
    }

    // One-on-one chat
    const existingChat = await Chat.findOne({
      participants: { $all: participants, $size: 2 },
      isGroupChat: false,
    }).populate("participants", "-password");

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await Chat.create({ participants });

    const populatedChat = await Chat.findById(newChat._id).populate(
      "participants",
      "-password"
    );

    res.status(201).json(populatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId })
      .populate("participants", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific 1-on-1 chat between two users
exports.getChatBetweenUsers = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const chat = await Chat.findOne({
      participants: { $all: [userId1, userId2], $size: 2 },
      isGroupChat: false,
    }).populate("participants", "-password");

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rename chat (mainly for group chats)
exports.renameChat = async (req, res) => {
  const { chatId } = req.params;
  const { chatName } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    ).populate("participants", "-password");

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete chat (and its messages)
exports.deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findByIdAndDelete(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await Message.deleteMany({ chat: chatId });

    res.status(200).json({ message: "Chat and associated messages deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
