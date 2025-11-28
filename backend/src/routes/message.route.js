const express = require("express");
const { getUsers, getMessages, sendMessage } = require("../controllers/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.get("/send/:id", protectRoute, sendMessage);

module.exports = router;
