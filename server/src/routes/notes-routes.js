const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const protect = require("../middlewares/user-middleware");
const handleValidationErrors = require("../middlewares/validation");
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  downloadNote,
} = require("../controllers/notes-controller");

// Validation rules
const createNoteValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid note ID format')
];

// Save a new note
router.post("/save", protect, createNoteValidation, handleValidationErrors, createNote);

// Get all notes of the user
router.get("/all", protect, getNotes);
 
// Get note of the user
router.get("/:id", protect, idValidation, handleValidationErrors, getNote);

// Delete a note
router.delete("/delete/:id", protect, idValidation, handleValidationErrors, deleteNote);

// Download a note as PDF
router.get("/download/:id", protect, idValidation, handleValidationErrors, downloadNote);

module.exports = router;
