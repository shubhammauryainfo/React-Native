const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.post("/send", sendMessage);
router.get("/:chatId", getMessages); // ✅ corrected name
router.put("/edit/:messageId", updateMessage); // ✅ corrected name
router.delete("/delete/:messageId", deleteMessage);

module.exports = router;
