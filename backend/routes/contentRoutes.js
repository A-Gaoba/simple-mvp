const express = require("express");
const router = express.Router();
const { generateContent } = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate", authMiddleware, generateContent);

module.exports = router;
