const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  register,
  login,
  update,
  getProfile,
} = require("../controllers/user-controllers");
const protect = require("../middlewares/user-middleware");
const handleValidationErrors = require("../middlewares/validation");

// Validation rules
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateValidation = [
  body("formData.name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("formData.password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, login);
router.post(
  "/update",
  protect,
  updateValidation,
  handleValidationErrors,
  update
);
router.get("/profile", protect, getProfile);

module.exports = router;
