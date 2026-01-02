const express = require("express");
const { getUsers, getMessages, sendMessage } = require("../controllers/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const { upload } = require("../middleware/upload.middleware");

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);

module.exports = router;
