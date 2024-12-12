const express = require("express");
const router = express.Router();
const {
  createCV,
  fetchCVs,
  fetchCV,
  updateCV,
  deleteCV,
} = require("../controllers/cvController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCV);
router.get("/", authMiddleware, fetchCVs);
router.get("/:id", authMiddleware, fetchCV);
router.put("/:id", authMiddleware, updateCV);
router.delete("/:id", authMiddleware, deleteCV);

module.exports = router;
