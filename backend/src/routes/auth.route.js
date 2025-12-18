const express = require("express");
const multer = require("multer");
const { signup, login, logout, updateProfilePic, checkAuth } = require("../controllers/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage() ,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.put("/update-profilePic", protectRoute, upload.single("image"), updateProfilePic);

router.get("/check", protectRoute, checkAuth);

module.exports = router;
