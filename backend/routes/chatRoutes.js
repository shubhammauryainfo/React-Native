const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/create", chatController.createChat);
router.get("/:userId", chatController.getUserChats);
router.get("/between/:userId1/:userId2", chatController.getChatBetweenUsers);
router.put("/rename/:chatId", chatController.renameChat);
router.delete("/delete/:chatId", chatController.deleteChat);

module.exports = router;
