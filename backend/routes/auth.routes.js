const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers } = require("../controllers/auth.controllers");
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);

module.exports = router;