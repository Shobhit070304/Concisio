const express = require("express");
const router = express.Router();
const { register, login, update } = require("../controllers/user-controllers");
const protect = require("../middlewares/user-middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/update", protect, update);

module.exports = router;
