const express = require("express");
const { signup, login, logout, updateProfilePic, checkAuth } = require("../controllers/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profilePic", protectRoute, updateProfilePic);

router.get("/check", protectRoute, checkAuth);

module.exports = router;
